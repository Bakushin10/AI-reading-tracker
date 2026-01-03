---
description: Create a commit with auto-generated message, push to remote, and create a pull request
allowed-tools: Bash
---

Create a git commit, push to remote, and create a pull request.

Steps:
1. first check if the branch is not main. if the branch is main, abort the rest of the operation.
2. Generate commit message based on staged files (or stage all files if none staged)
3. Use custom message if provided: $ARGUMENTS
4. Commit with the message
5. Push to remote branch
6. Create pull request with same title

# Check if current branch is main and abort if so
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" = "main" ]; then
  echo "Error: Cannot create PR from main branch. Please create a feature branch first."
  exit 1
fi

# Generate commit message based on git diff
COMMIT_MSG=$(git diff --cached --name-only | head -5 | sed 's/^/- /' | tr '\n' ' ' | sed 's/^/Update: /')

# If no staged changes, stage all changes and generate message
if [ -z "$COMMIT_MSG" ] || [ "$COMMIT_MSG" = "Update:  " ]; then
  git add .
  COMMIT_MSG=$(git diff --cached --name-only | head -5 | sed 's/^/- /' | tr '\n' ' ' | sed 's/^/Update: /')
fi

# Use provided message if given, otherwise use generated one
if [ -n "$ARGUMENTS" ]; then
  COMMIT_MSG="$ARGUMENTS"
fi

git commit -m "$COMMIT_MSG"
git push -u origin $(git branch --show-current)
gh pr create --title "$COMMIT_MSG" --body "Auto-generated PR"
