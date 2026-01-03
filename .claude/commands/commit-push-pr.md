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

!commit-push-pr $ARGUMENTS
