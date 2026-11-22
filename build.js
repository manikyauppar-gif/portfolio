// Pre-renders content.js into a static index.html (no dependencies). Run: node build.js
const fs = require("fs");
const C = new Function(fs.readFileSync(__dirname + "/content.js", "utf8") + "; return C;")();
const chips = a => `<ul class="chips">${a.map(s => `<li>${s}</li>`).join("")}</ul>`;
const btn = (u, t) => u ? `<a class="btn sec" href="${u}" target="_blank" rel="noopener">${t}</a>` : "";
const links = (p, more) => `<div class="links">${more ? `<button class="btn pri" data-id="${p.id}">Details</button>` : ""}${btn(p.repo, "GitHub")}${btn(p.live, "Live demo")}${p.pending ? `<span class="mute">${p.pending}</span>` : ""}</div>`;
const thumb = p => p.ph ? `<div class="ph"><b>${p.ph[0]}</b><span>${p.ph[1]}</span></div>`
  : p.imgs.length ? `<img src="assets/img/${p.imgs[0][0]}" alt="${p.imgs[0][1]}" loading="lazy" width="1400" height="660">`
  : `<div class="ph">${p.metric ? `<b>${p.metric[0]}</b><span>${p.metric[1].split(",")[0]}</span>` : `<b>${p.title.split(" ").map(w => w[0]).join("").slice(0, 3)}</b><span>${p.stack.slice(0, 3).join(" · ")}</span>`}</div>`;
const dialog = p => `<dialog id="d-${p.id}" aria-label="${p.title} details"><div class="dg"><button class="btn sec x cl">Close</button><span class="kind">${p.kind}</span><h3 style="font-size:1.8rem">${p.title}</h3>${chips(p.stack)}
${p.metric ? `<div class="met"><b>${p.metric[0]}</b><span>${p.metric[1]}</span></div>` : ""}
<h4>Problem</h4><p>${p.problem}</p><h4>My contribution</h4><p>${p.did}</p><h4>Key features</h4><ul>${p.features.map(f => `<li>${f}</li>`).join("")}</ul>
${p.pipeline ? `<h4>How it works</h4><ol class="pipe">${p.pipeline.map(s => `<li>${s}</li>`).join("")}</ol>` : ""}
${p.history ? `<h4>Model development</h4><p>${p.history}</p>` : ""}<h4>Real-world use</h4><p>${p.use}</p>${p.note ? `<p class="mute"><em>${p.note}</em></p>` : ""}
${p.imgs.length ? `<h4>Screenshots</h4><div class="gal">${p.imgs.map(i => `<a href="assets/img/${i[0]}" target="_blank" rel="noopener"><img src="assets/img/${i[0]}" alt="${i[1]}" loading="lazy"></a>`).join("")}</div>` : ""}
${links(p, false)}</div></dialog>`;
const V = {
  NAME: C.name, HEADLINE: C.headline, INTRO: C.intro, RESUME: C.resume, ABOUT: C.about, LANG: C.languages, EMAIL: C.email, GITHUB: C.github, LINKEDIN: C.linkedin, LOC: C.location, YEAR: new Date().getFullYear(),
  SOC: `<a href="${C.github}" target="_blank" rel="noopener">GitHub</a><a href="${C.linkedin}" target="_blank" rel="noopener">LinkedIn</a><a href="mailto:${C.email}">Email</a>`,
  FOOT: `<a href="${C.github}">GitHub</a> · <a href="${C.linkedin}">LinkedIn</a> · <a href="mailto:${C.email}">Email</a>`,
  EDU: C.education.map(e => `<div class="edu"><b>${e[0]}</b>${e[1]}<br><span class="mute">${e[2]}</span></div>`).join("") + `<p><b>Relevant coursework</b></p>` + chips(C.coursework),
  SKILLS: C.skills.map(g => `<div><h3>${g[0]}</h3>${chips(g[1])}</div>`).join(""),
  FEATURED: C.projects.filter(p => p.featured).map(p => `<article class="feat"><div class="shot">${thumb(p)}</div><div><span class="kind">${p.kind}</span><h3 style="font-size:1.8rem;margin:6px 0 10px">${p.title}</h3><p>${p.short}</p>${chips(p.stack)}${links(p, true)}</div></article>`).join(""),
  ALL: C.projects.map(p => `<article class="card"><div class="shot">${thumb(p)}</div><div class="in"><span class="kind">${p.kind}</span><h3>${p.title}</h3><p class="mute" style="margin:0">${p.short}</p>${links(p, true)}</div></article>`).join(""),
  EXP: C.experience.map(e => `<li><span class="kind">${e[0]}</span><h3>${e[1]}</h3><p class="mute" style="margin:6px 0 0">${e[2]}</p></li>`).join(""),
  CERTS: C.certs.map(c => { const f = C.certFiles[c[4]] || [`cert-${c[4]}.jpg`, `assets/certs/${c[4]}.pdf`]; return `<div class="cert"><img src="assets/img/${f[0]}" alt="Certificate preview: ${c[0]}" loading="lazy"><div><h3>${c[0]}</h3><span>${c[1]}</span><small>${c[2]} · ${c[3]}</small><a href="${f[1]}" target="_blank" rel="noopener">View certificate</a></div></div>`; }).join(""),
  DIALOGS: C.projects.map(dialog).join("\n")
};
let h = fs.readFileSync(__dirname + "/src/template.html", "utf8");
for (const k in V) h = h.split(`{{${k}}}`).join(V[k]);
const left = h.match(/\{\{\w+\}\}/g);
if (left) { console.error("Unfilled tokens:", left); process.exit(1); }
fs.writeFileSync(__dirname + "/index.html", h);
console.log("Built index.html (" + h.length + " bytes)");
