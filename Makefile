PUBLIC_REPO_URL ?= git@github.com:VibeCodingStarter/starter-kit.git

.PHONY: help
help: ## 📋 Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-25s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: install
install: ## 📦 Install dependencies
	@echo "📦 Installing dependencies..."
	@npm install

.PHONY: dev
dev: install ## 🏃 Run the application (auto-starts backend if needed)
	@echo "🔍 Checking backend API..."
	@if ! curl -s http://localhost:8000/health >/dev/null 2>&1; then \
		echo "⚠️ Local backend API not running"; \
		echo "🌐 Checking cloud backend API instead..."; \
		make check-cloud-api; \
	else \
		echo "✅ Backend API is running locally"; \
	fi
	@echo "🧹 Cleaning previous build artifacts..."
	@rm -rf .next
	@echo "🚀 Starting user application in project mode..."
	@npm run dev

.PHONY: check-cloud-api
check-cloud-api: ## 🌐 Check cloud backend API health
	@echo "🌐 Checking cloud backend API..."
	@if curl -fsS https://api.vibecoding.ad/health >/dev/null 2>&1; then \
		echo "✅ Cloud backend API is reachable"; \
	else \
		echo "❌ Unable to reach cloud backend API at https://api.vibecoding.ad/health"; \
		exit 1; \
	fi

.PHONY: verify
verify: install ## ✅ Verify the application setup
	@echo "🔍 Verifying application setup..."
	@rm -rf .next
	@npx tsc --noEmit && \
		npm run lint && \
		(npm audit || npm audit fix) && \
		npm run build
	@rm -rf .next
	@echo "✅ Application setup verified successfully"

.PHONY: git-ensure-clean
git-ensure-clean: ## 🔒 Ensure working tree is clean before publishing
	@status="$$(git status --porcelain)"; \
	if [ -n "$$status" ]; then \
		echo "❌ Working tree has uncommitted changes. Please commit or stash before publishing."; \
		echo "$$status"; \
		exit 1; \
	fi

.PHONY: git-setup-public
git-setup-public: ## 🔗 Setup public repository remote
	@echo "🔗 Adding public remote: $(PUBLIC_REPO_URL)"
	@git remote add public $(PUBLIC_REPO_URL) || echo "ℹ️ Public remote already exists"
	@git fetch public
	@echo "✅ Public remote configured"

.PHONY: git-publish
git-publish: git-ensure-clean ## 📤 Publish current state to public repository (squashed commit)
	@echo "📤 Publishing to public repository..."
	@if ! git remote | grep -q "^public$$"; then \
		echo "❌ Public remote not configured. Run: make git-setup-public PUBLIC_REPO_URL=..."; \
		exit 1; \
	fi
	@echo "🌐 Fetching latest main from origin..."
	@if ! git fetch origin; then \
		echo "❌ Failed to fetch origin/main. Aborting publish."; \
		exit 1; \
	fi
	@echo "📥 Syncing local main with origin/main..."
	@if ! git checkout main >/dev/null 2>&1; then \
		echo "❌ Unable to checkout main branch. Aborting publish."; \
		exit 1; \
	fi
	@if ! git reset --hard origin/main >/dev/null 2>&1; then \
		echo "❌ Failed to align main with origin/main. Aborting publish."; \
		exit 1; \
	fi
	@echo "🔄 Fetching public repository..."
	@if ! git fetch public; then \
		echo "❌ Failed to fetch public remote."; \
		exit 1; \
	fi
	@echo "🧹 Preparing public branch workspace..."
	@if git show-ref --verify --quiet refs/remotes/public/main; then \
		git checkout -B public-main public/main >/dev/null 2>&1; \
	else \
		git checkout -B public-main main >/dev/null 2>&1; \
	fi
	@git reset --hard HEAD >/dev/null 2>&1
	@git clean -fd >/dev/null 2>&1
	@if ! git restore --source=main --staged --worktree .; then \
		echo "❌ Failed to copy repository state from main. Aborting publish."; \
		git checkout main >/dev/null 2>&1; \
		exit 1; \
	fi
	@if git diff --cached --quiet; then \
		echo "ℹ️ No changes to commit. Skipping publish."; \
		git restore --staged --worktree . >/dev/null 2>&1 || true; \
		git checkout main >/dev/null 2>&1; \
	else \
		commit_msg="Public release: $$(date '+%Y-%m-%d %H:%M')"; \
		if ! git commit -m "$$commit_msg"; then \
			echo "❌ Failed to create release commit. Aborting publish."; \
			git checkout main >/dev/null 2>&1; \
			exit 1; \
		fi; \
		echo "🚀 Pushing to public repository..."; \
		if ! git push public public-main:main; then \
			echo "❌ Failed to push to public repository."; \
			git checkout main >/dev/null 2>&1; \
			exit 1; \
		fi; \
		git checkout main >/dev/null 2>&1; \
		echo "✅ Published to public repository"; \
	fi

.PHONY: git-publish-message
git-publish-message: git-ensure-clean ## 📤 Publish with custom message (requires MESSAGE env var)
	@if [ -z "$(MESSAGE)" ]; then \
		echo "❌ MESSAGE not set. Usage: make git-publish-message MESSAGE='Your release message'"; \
		exit 1; \
	fi
	@echo "📤 Publishing to public repository..."
	@if ! git remote | grep -q "^public$$"; then \
		echo "❌ Public remote not configured. Run: make git-setup-public PUBLIC_REPO_URL=..."; \
		exit 1; \
	fi
	@echo "🌐 Fetching latest main from origin..."
	@if ! git fetch origin; then \
		echo "❌ Failed to fetch origin/main. Aborting publish."; \
		exit 1; \
	fi
	@echo "📥 Syncing local main with origin/main..."
	@if ! git checkout main >/dev/null 2>&1; then \
		echo "❌ Unable to checkout main branch. Aborting publish."; \
		exit 1; \
	fi
	@if ! git reset --hard origin/main >/dev/null 2>&1; then \
		echo "❌ Failed to align main with origin/main. Aborting publish."; \
		exit 1; \
	fi
	@echo "🔄 Fetching public repository..."
	@if ! git fetch public; then \
		echo "❌ Failed to fetch public remote."; \
		exit 1; \
	fi
	@echo "🧹 Preparing public branch workspace..."
	@if git show-ref --verify --quiet refs/remotes/public/main; then \
		git checkout -B public-main public/main >/dev/null 2>&1; \
	else \
		git checkout -B public-main main >/dev/null 2>&1; \
	fi
	@git reset --hard HEAD >/dev/null 2>&1
	@git clean -fd >/dev/null 2>&1
	@if ! git restore --source=main --staged --worktree .; then \
		echo "❌ Failed to copy repository state from main. Aborting publish."; \
		git checkout main >/dev/null 2>&1; \
		exit 1; \
	fi
	@if git diff --cached --quiet; then \
		echo "ℹ️ No changes to commit. Skipping publish."; \
		git restore --staged --worktree . >/dev/null 2>&1 || true; \
		git checkout main >/dev/null 2>&1; \
	else \
		commit_msg="$(MESSAGE)"; \
		if ! git commit -m "$$commit_msg"; then \
			echo "❌ Failed to create release commit. Aborting publish."; \
			git checkout main >/dev/null 2>&1; \
			exit 1; \
		fi; \
		echo "🚀 Pushing to public repository..."; \
		if ! git push public public-main:main; then \
			echo "❌ Failed to push to public repository."; \
			git checkout main >/dev/null 2>&1; \
			exit 1; \
		fi; \
		git checkout main >/dev/null 2>&1; \
		echo "✅ Published to public repository"; \
	fi

.PHONY: git-reset-public
git-reset-public: git-ensure-clean ## 🔄 Reset public repository with fresh single commit (destructive!)
	@echo "⚠️  WARNING: This will reset public repository history!"
	@echo "This will create a fresh public repository with only one commit."
	@read -p "Are you sure? Type 'yes' to continue: " confirm; \
	if [ "$$confirm" != "yes" ]; then \
		echo "❌ Aborted"; \
		exit 1; \
	fi
	@if ! git remote | grep -q "^public$$"; then \
		echo "❌ Public remote not configured. Run: make git-setup-public PUBLIC_REPO_URL=..."; \
		exit 1; \
	fi
	@echo "🌐 Fetching latest main from origin..."
	@if ! git fetch origin; then \
		echo "❌ Failed to fetch origin/main. Aborting reset."; \
		exit 1; \
	fi
	@echo "📥 Syncing local main with origin/main..."
	@if ! git checkout main >/dev/null 2>&1; then \
		echo "❌ Unable to checkout main branch. Aborting reset."; \
		exit 1; \
	fi
	@if ! git reset --hard origin/main >/dev/null 2>&1; then \
		echo "❌ Failed to align main with origin/main. Aborting reset."; \
		exit 1; \
	fi
	@echo "🧹 Cleaning up local public-main branch if exists..."
	@git branch -D public-main 2>/dev/null || true
	@echo "📦 Creating single-commit snapshot from main..."
	@tree_sha=$$(git rev-parse main^{tree}); \
		commit_sha=$$(git commit-tree $$tree_sha -m "Initial commit: Dev Kit for AI Starter Kit"); \
		git branch -f public-reset $$commit_sha >/dev/null 2>&1
	@if ! git checkout public-reset >/dev/null 2>&1; then \
		echo "❌ Failed to checkout new public-reset branch."; \
		git branch -D public-reset >/dev/null 2>&1 || true; \
		git checkout main >/dev/null 2>&1; \
		exit 1; \
	fi
	@echo "🚀 Force pushing to public repository..."
	@git push -f public public-reset:main
	@git checkout main
	@git branch -D public-reset
	@echo "✅ Public repository reset complete with single commit"

.PHONY: git-status
git-status: ## 📊 Show status of public/private repositories
	@echo "📊 Repository Status"
	@echo "==================="
	@echo ""
	@echo "🔄 Refreshing remotes..."
	@git fetch origin -q 2>/dev/null || true
	@echo "Private (main):"
	@git log --oneline -5 main
	@echo ""
	@if git remote | grep -q "^public$$"; then \
		echo "Public (public/main):"; \
		git fetch public -q; \
		git log --oneline -5 public/main; \
		echo ""; \
		echo "🔍 Divergence (public/main ↔ main):"; \
		git log --left-right --graph --oneline --decorate public/main...main || true; \
	else \
		echo "Public remote not configured. Run: make git-setup-public PUBLIC_REPO_URL=..."; \
	fi
