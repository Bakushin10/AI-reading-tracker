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

# Fetch PR comments (general comments)
echo "Fetching general comments from PR #$PR_NUMBER..."
gh pr view "$PR_NUMBER" --json comments --jq '.comments[] | "Comment by \(.author.login):\n\(.body)\n---"'

echo ""
echo "Fetching file review comments from PR #$PR_NUMBER..."
# Get repository info for API calls
REPO_OWNER=$(gh repo view --json owner --jq '.owner.login')
REPO_NAME=$(gh repo view --json name --jq '.name')

# Fetch file review comments via GitHub API (these contain CodeRabbit's actionable feedback)
gh api "repos/$REPO_OWNER/$REPO_NAME/pulls/$PR_NUMBER/comments" --jq '.[] | "File Review Comment by \(.user.login) on \(.path):\n\(.body)\n---"'

echo ""
echo "Analyzing comments and applying fixes..."
echo "Note: Claude will now review both general comments and file review comments to apply appropriate fixes to the codebase."