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

# Function to use provided commit message
use_provided_commit_message() {
  COMMIT_MSG="$ARGUMENTS"
  # Set variables needed for PR title generation
  STAGED_FILES=$(git diff --cached --name-only)
  DIFF_CONTENT=$(git diff --cached --stat)
}

# Function to generate AI-powered commit message
generate_ai_commit_message() {
  # If no staged changes, stage all changes first
  if [ -z "$(git diff --cached --name-only)" ]; then
    echo "Warning: No staged changes detected. Staging all changes..."
    git add .
  fi

  # Generate AI-powered commit message
  STAGED_FILES=$(git diff --cached --name-only)
  DIFF_CONTENT=$(git diff --cached --stat)

  # Check if claude command is available
  if ! command -v claude >/dev/null 2>&1; then
    echo "Warning: claude command not found. Using fallback commit message generation."
    COMMIT_MSG=$(echo "$STAGED_FILES" | head -5 | sed 's/^/- /' | tr '\n' ' ' | sed 's/^/Update: /')
  else
    # Use here-document for safer variable substitution
    COMMIT_MSG=$(claude --prompt "$(cat <<'PROMPT_END'
Create a concise git commit message (max 72 chars) for these changes:

Files changed: $STAGED_FILES
Diff summary: $DIFF_CONTENT

Follow conventional commit format (feat:, fix:, docs:, refactor:, etc.) and be specific about what changed. Generate only the commit message, nothing else.
PROMPT_END
)")

    # Fallback to basic message if AI generation fails
    if [ -z "$COMMIT_MSG" ]; then
      echo "Warning: AI message generation failed or returned empty. Using fallback."
      COMMIT_MSG=$(echo "$STAGED_FILES" | head -5 | sed 's/^/- /' | tr '\n' ' ' | sed 's/^/Update: /')
    fi
  fi
}

# Function to generate PR title
generate_pr_title() {
  if command -v claude >/dev/null 2>&1; then
    PR_TITLE=$(claude --prompt "$(cat <<'PROMPT_END'
Based on these file changes, create a concise PR title (max 60 chars):
Files changed: $STAGED_FILES
Diff summary: $DIFF_CONTENT
Commit message: $COMMIT_MSG

Generate only the title, nothing else.
PROMPT_END
)")
  else
    PR_TITLE=""
  fi

  # Use commit message as fallback if AI generation fails or exceeds length limit
  if [ -z "$PR_TITLE" ] || [ ${#PR_TITLE} -gt 60 ]; then
    PR_TITLE="$COMMIT_MSG"
  fi
}

# Main execution function
main() {
  # Check if current branch is main and abort if so
  CURRENT_BRANCH=$(git branch --show-current)
  if [ "$CURRENT_BRANCH" = "main" ]; then
    echo "Error: Cannot create PR from main branch. Please create a feature branch first."
    exit 1
  fi

  # Generate commit message based on whether arguments are provided
  if [ -n "$ARGUMENTS" ]; then
    use_provided_commit_message
  else
    generate_ai_commit_message
  fi

  # Create commit with error handling
  git commit -m "$COMMIT_MSG"
  if [ $? -ne 0 ]; then
    echo "Error: Failed to create commit."
    exit 1
  fi

  # Push to remote with error handling
  git push -u origin $(git branch --show-current)
  if [ $? -ne 0 ]; then
    echo "Error: Failed to push to remote."
    exit 1
  fi

  # Generate PR title and create pull request
  generate_pr_title

  gh pr create --title "$PR_TITLE" --body "Automated commit: $COMMIT_MSG"
  if [ $? -ne 0 ]; then
    echo "Error: Failed to create pull request."
    exit 1
  fi
}

# Script execution starts here
main "$@"