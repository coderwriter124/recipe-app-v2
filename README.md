# Recipe App v2

Cute full-stack recipe app with search, filters, clickable recipe details, favorites, Google recipe links, extra recipes, and a free local recommendation assistant.

## Windows setup

Run these commands from the **repository root**. The prompt must end with `recipe-app-v2>`:

```cmd
cd /d C:\Users\priya\recipe-app-v2
git pull origin main
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
npm install
npm run dev
```

Open the URL in a browser, not in Command Prompt:

```text
http://localhost:5173
```

To open it from Command Prompt, use:

```cmd
start "" http://localhost:5173
```

Do **not** type `http://localhost:5173` by itself into Command Prompt. Windows interprets `http:` as a command, which causes the `'http:' is not recognized` error.

## If npm still says `Missing script: dev`

Check that the current folder and package file are correct:

```cmd
cd /d C:\Users\priya\recipe-app-v2
findstr "dev" package.json
npm run
```

The `npm run` output should include:

```text
dev
build
start
```

If it does not, refresh the repository copy:

```cmd
cd /d C:\Users\priya\recipe-app-v2
git fetch origin
git reset --hard origin/main
npm install
npm run dev
```

Warning: `git reset --hard` removes uncommitted changes in this folder. Copy any personal files before running it.

Open http://localhost:5173 after the servers start. The API runs at http://localhost:5000.
