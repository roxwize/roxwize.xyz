const glob = require("glob").glob;
const pug = require("pug");
const fs = require("fs/promises");
const gm = require("gray-matter");
const md = require("marked").parse;

// Render the main Markdown pages, other stuff comes later
async function renderSrc() {
  console.log("====\tFuuuckkk");
  const src = await glob("./src/**/*.md");
  for (let filePath of src) {
    if (require("path").extname(filePath) !== ".md") continue;
    console.log(`==\t\treading ${filePath}`);
    const relativePath = filePath.replace(/[^\\]+\\/, "");
    const dir = relativePath.match(/^(?:[^\\]+\\)+/);
    if (dir) {
      await fs.mkdir(`./site/${dir[0]}`, { recursive: true });
    }
    const file = (await fs.readFile(filePath)).toString("ascii");
    const matter = gm(file);
    let out;
    if (matter.data.nowrap) {
      out = md(matter.content);
    } else if (matter.data.template) {
      const data = JSON.parse((await fs.readFile(matter.data.data)).toString("ascii"));
      out = pug.compileFile(`./static/html/${matter.data.template}.pug`)({
        title: matter.data.title,
        gm: matter.data,
        content: md(matter.content),
        data: data
      });
    } else {
      out = pug.compileFile("./static/html/site.pug")({
        title: matter.data.title,
        gm: matter.data,
        content: md(matter.content),
      });
    }
    await fs.writeFile(
      `./site/${relativePath.replace(/\.[^\\.]+$/, "")}.html`,
      out
    );
  }
}

async function renderNavbar() {
  // Update navbar
  console.log("====\tUpdating navbar");
  const navbar = JSON.parse((await fs.readFile("_nav.json")).toString("ascii"));
  const out = pug.compileFile("./static/html/nav.pug")({
    n: navbar,
  });
  console.log("==\t\tWriting to _nav.html");
  await fs.writeFile("./site/_nav.html", out);
}

(async () => {
  console.log(
    "GOOD EVENING\nWe are building the website at " + new Date().toISOString()
  );
  await renderSrc();
  await renderNavbar();
  console.log("It is done");
})();
