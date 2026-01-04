---
description: Create a commit with auto-generated message, push to remote, and create a pull request
allowed-tools: Bash
---

Create a git commit, push to remote, and create a pull request.

Steps:
1. Check if the branch is not main. If the branch is main, abort the rest of the operation.
2. Generate commit message based on staged files (or stage all files with `git add .` if none staged, with warning)
3. Use custom message if provided via $ARGUMENTS
4. Commit with the message (with error handling)
5. Push to remote branch (with error handling)
6. Create pull request with dynamic title and body based on commit message

# Check if current branch is main and abort if so
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" = "main" ]; then
  echo "Error: Cannot create PR from main branch. Please create a feature branch first."
  exit 1
fi

# Use provided message if given, otherwise generate AI-powered commit message
if [ -n "$ARGUMENTS" ]; then
  COMMIT_MSG="$ARGUMENTS"
else
  # If no staged changes, stage all changes first
  if [ -z "$(git diff --cached --name-only)" ]; then
    echo "Warning: No staged changes detected. Staging all changes..."
    git add .
  fi

  # Generate AI-powered commit message
  STAGED_FILES=$(git diff --cached --name-only)
  DIFF_CONTENT=$(git diff --cached --stat)
  DIFF_SAMPLE=$(git diff --cached | head -20)

  COMMIT_MSG=$(claude --prompt "Create a concise git commit message (max 72 chars) for these changes:

Files changed: $STAGED_FILES
Diff summary: $DIFF_CONTENT

Sample diff:
$DIFF_SAMPLE

Follow conventional commit format (feat:, fix:, docs:, refactor:, etc.) and be specific about what changed. Generate only the commit message, nothing else.")

  # Fallback to basic message if AI generation fails
  if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG=$(echo "$STAGED_FILES" | head -5 | sed 's/^/- /' | tr '\n' ' ' | sed 's/^/Update: /')
  fi
fi

# Ensure variables are set for PR title generation if not using AI commit message
if [ -n "$ARGUMENTS" ]; then
  STAGED_FILES=$(git diff --cached --name-only)
  DIFF_CONTENT=$(git diff --cached --stat)
fi

# Error handling to prevent cascading failures
git commit -m "$COMMIT_MSG"
if [ $? -ne 0 ]; then
  echo "Error: Failed to create commit."
  exit 1
fi

git push -u origin $(git branch --show-current)
if [ $? -ne 0 ]; then
  echo "Error: Failed to push to remote."
  exit 1
fi

# Generate AI-powered PR title and body

# Create AI-generated PR title using Claude
PR_TITLE=$(claude --prompt "Based on these file changes, create a concise PR title (max 60 chars):
Files changed: $STAGED_FILES
Diff summary: $DIFF_CONTENT
Commit message: $COMMIT_MSG

Generate only the title, nothing else.")

# Use commit message as fallback if AI generation fails or exceeds length limit
if [ -z "$PR_TITLE" ] || [ ${#PR_TITLE} -gt 60 ]; then
  PR_TITLE="$COMMIT_MSG"
fi

gh pr create --title "$PR_TITLE" --body "Automated commit: $COMMIT_MSG"
if [ $? -ne 0 ]; then
  echo "Error: Failed to create pull request."
  exit 1
fi
