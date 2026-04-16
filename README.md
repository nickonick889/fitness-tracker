📘 TEAM GIT WORKFLOW GUIDE (MERN PROJECT)
🧠 Core Principles
main = always stable, working code
Each branch = one feature / one task
Always use Pull Requests (PR) before merging
Never code directly in main

🏗️ 1. Branch Naming Convention
Use clear, consistent names:

feature/<feature-name>
fix/<bug-name>
enhancement/<improvement>
Examples:
feature/auth
feature/workout-crud
feature/pet-exp-system
fix/login-error
enhancement/dashboard-ui

🚀 2. Starting a New Task
Step 1 — Update your local main
git checkout main
git pull origin main
Step 2 — Create a new branch
git checkout -b feature/<your-feature>
git push -u origin feature/<your-feature>

💻 3. During Development
Commit regularly:
git add .
git commit -m "clear message of what you did"
git push
Before coding EACH DAY (IMPORTANT)
git checkout main
git pull origin main

git checkout feature/<your-feature>
git merge main

👉 Prevents merge conflicts later

🔍 4. Creating a Pull Request (PR)

When your feature is complete:

Push your branch
Go to GitHub
Click “Compare & pull request”
Set:
Base: main
Compare: your branch
✍️ PR Description Template
## What this PR does
- Add login functionality
- Create user model

## Changes made
- Added auth routes
- Added JWT logic

## Notes
- Needs testing on frontend
👀 5. Code Review Rules

Before merging:

At least 1 teammate reviews
Check:
Code works correctly
No bugs introduced
Clean and readable code

🔁 6. Making Changes After Review

If changes are requested:

git add .
git commit -m "fix review comments"
git push

👉 PR updates automatically

✅ 7. Merging

After approval:

Merge PR into main
Ensure app still runs
🧹 8. Delete Branch After Merge

After successful merge:

Click “Delete branch” on GitHub

Or locally:

git branch -d feature/<your-feature>
🔄 9. After Someone Else Merges

Everyone must sync:

git checkout main
git pull origin main
🔁 10. Starting Next Task

Always create a NEW branch:

git checkout -b feature/<new-feature>

❌ Do NOT reuse old branches

🚨 RULES (STRICT)
❌ NEVER
Push directly to main
Work on outdated branch
Reuse old branches
Ignore merge conflicts
✅ ALWAYS
Pull latest main before coding
Use PR for all merges
Keep branches small and focused
Write clear commit messages
🧠 Quick Daily Workflow
git checkout main
git pull origin main

git checkout feature/<your-feature>
git merge main

Then code → commit → push

🔥 Example Team Setup
main

feature/auth
feature/workout-crud
feature/pet-exp
feature/dashboard

Each person owns one feature branch.

💡 Mental Model
main = official working app
your branch = your task
PR = team review before adding to app
✅ Done

Timeline

Thursday
    - Set up Notion Tasks
    - Set up MongoDB
    - Fetch Public API Exercises Database
    - decide on the components/features and create branch based on it
