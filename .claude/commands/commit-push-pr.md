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

# Generate commit message based on git diff
COMMIT_MSG=$(git diff --cached --name-only | head -5 | sed 's/^/- /' | tr '\n' ' ' | sed 's/^/Update: /')

# If no staged changes, stage all changes and generate message
# Warning message and check for messages without dashes to detect empty content
if [ -z "$COMMIT_MSG" ] || [ "$COMMIT_MSG" = "Update: " ] || ! echo "$COMMIT_MSG" | grep -q -- "-"; then
  echo "Warning: No staged changes detected. Staging all changes..."
  git add .
  COMMIT_MSG=$(git diff --cached --name-only | head -5 | sed 's/^/- /' | tr '\n' ' ' | sed 's/^/Update: /')
fi

# Use provided message if given, otherwise use generated one
if [ -n "$ARGUMENTS" ]; then
  COMMIT_MSG="$ARGUMENTS"
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

# Make PR body dynamic instead of hardcoded "Auto-generated PR"
gh pr create --title "$COMMIT_MSG" --body "Automated commit: $COMMIT_MSG"
