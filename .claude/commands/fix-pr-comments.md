---
description: Fetch PR comments from current branch's PR and apply fixes based on the comments
allowed-tools: Bash, Read, Edit, MultiEdit, Grep, Glob
---

Fetch PR comments from current branch's PR and apply fixes based on the comments.

Steps:
1. Get current branch name
2. Find the PR associated with this branch
3. Fetch all comments from the PR
4. Analyze comments and identify actionable feedback
5. Apply fixes to the codebase based on the comments

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)

# Find PR number for current branch
PR_NUMBER=$(gh pr list --head "$CURRENT_BRANCH" --json number --jq '.[0].number')

if [ -z "$PR_NUMBER" ]; then
  echo "Error: No PR found for branch '$CURRENT_BRANCH'"
  exit 1
fi

echo "Found PR #$PR_NUMBER for branch '$CURRENT_BRANCH'"

# Fetch PR comments
echo "Fetching comments from PR #$PR_NUMBER..."
gh pr view "$PR_NUMBER" --json comments --jq '.comments[] | "Comment by \(.author.login):\n\(.body)\n---"'

echo ""
echo "Analyzing comments and applying fixes..."
echo "Note: Claude will now review the comments and apply appropriate fixes to the codebase."