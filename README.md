# Spider-Man: The One and Only VR Game

A lightweight A-Frame project with a city sandbox, a full-body Spider-Man-inspired avatar, and movement support for desktop and VR.

## Run locally

Because this project loads scripts in the browser, use any static server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Live URL

- Project Pages URL: `https://rodcast141.github.io/spider-man-the-one-and-only-vr-game/`
- If `https://rodcast141.github.io` shows 404, that is expected unless you also publish a separate **user site** repo named `rodcast141.github.io`.

## Site not found? (Fast fix)

If you see **"There isn't a GitHub Pages site here"**, do this exactly:

1. Open your repo on GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Set **Branch** to **main** and **Folder** to **/(root)**.
5. Click **Save**.
6. Make one tiny commit (for example, edit README and commit) to trigger publish.
7. Wait a couple minutes, then hard-refresh the site URL.

## Fixing GitHub Pages 404

If you see a GitHub 404 page at the project URL, run this checklist in order:

1. Go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Select **Branch: `main`** and **Folder: `/ (root)`**, then save.
4. Make sure the repository is **Public** (private repos may not publish on all plans).
5. Confirm `index.html` exists in the repo root on `main`.
6. Push one new commit (or re-save Pages settings) and wait 1–3 minutes.
7. Open: `https://rodcast141.github.io/spider-man-the-one-and-only-vr-game/`.


## GitHub Pages build note

This repo includes a `.nojekyll` file so GitHub Pages serves the project as plain static files (no Jekyll theme/build step).

## Controls

- **Desktop**: click scene, then use mouse + WASD.
- **VR joystick**: use your controller thumbstick/joystick to move around.
- **Full-body avatar**: look down to see legs/arms, with walking animation while moving.
- **Play music**: toggles ambient city sound.
- **Toggle swing mode**: boosts movement speed for keyboard + joystick.
- **Copy project code**: copies all source files into your clipboard so you can paste manually.
