# Manikya K Uppar: Portfolio

Static site, no dependencies. `index.html` is generated from `content.js` by `node build.js` and is already built and committed.

## Open it locally
Extract the whole zip first, then open `index.html` from the extracted folder. Opening it from inside the zip viewer will show a blank page because the images are not extracted.

## Deploy (your own accounts)
1. Create an empty GitHub repo named `portfolio` (no README), then in this folder run:
   `git remote add origin https://github.com/manikyauppar-gif/portfolio.git` then `git push -u origin main`
2. On vercel.com sign in with GitHub, choose Add New > Project, import `portfolio`, keep all defaults, click Deploy.
3. Your URL is `https://<project>.vercel.app` and stays the same on every future push.

## Update content
- Text, links, skills, projects, certificates: edit `content.js`, run `node build.js`, then `git add . && git commit -m "Update" && git push`.
- Photo: replace `assets/img/profile.jpg`. Resume: replace `assets/Manikya_K_Uppar_Resume.pdf` (same file names keep the links working).
