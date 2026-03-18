---
trigger: always_on
---

# Git Context Guard
- **Strict Isolation**: You must ONLY read and edit files in the current active branch.
- **Ignore Other Branches**: Do not use `codebase_search` results that originate from branches other than the current HEAD.
- **Commit Reference**: Before starting any task, verify the current branch name and recent commit hash via `git branch --show-current`.
- **Ghost Code Prevention**: If a search result looks like a duplicate or contains features from a different branch (e.g., the large PR #15), discard it and prioritize the local file state.