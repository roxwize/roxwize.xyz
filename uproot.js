const glob = require("glob").glob;
const pug = require("pug");
const fs = require("fs/promises");
const fse = require("fs");
const gm = require("gray-matter");
const md = require("marked");
const md_headerIds = require("marked-gfm-heading-id").gfmHeadingId;
const path = require("path");
const feed = require("feed");

/**
 * read a markdown file, write it into /public/
 * @param {string} filePath
 */
const render = async (filePath) => {
  // This is use case agnostic probably. But it's not really used at the moment so it might be a waste of space.
  console.log(`==\t\treading ${filePath}`);
  const relativePath = filePath.replace(/[^\/]+\//, "");
  const dir = relativePath.match(/^(?:[^\/]+\/)+/);
  if (dir) {
    await fs.mkdir(`./public/${dir[0]}`, { recursive: true });
  }
  const file = (await fs.readFile(filePath)).toString("ascii");
  const matter = gm(file);
  md.use(md_headerIds({ prefix: "rh-" }));
  let out;
  if (matter.data.nowrap) {
    out = md.parse(matter.content);
  } else if (matter.data.template) {
    const data = matter.data.data
      ? JSON.parse((await fs.readFile(matter.data.data)).toString("ascii"))
      : {};
    out = pug.compileFile(`./templates/${matter.data.template}.pug`)({
      title: matter.data.title,
      gm: matter.data,
      content: md.parse(matter.content),
      data: data
    });
  } else {
    out = pug.compileFile("./templates/site.pug")({
      title: matter.data.title,
      gm: matter.data,
      content: md.parse(matter.content)
    });
  }
  await fs.writeFile(
    `./public/${relativePath.replace(/\.[^\/.]+$/, "")}.html`, // ugh
    out
  );
};

/**
 * render the main Markdown pages, other stuff comes later
 */
async function renderSite() {
  console.log("====\tFuuuckkk");
  const src = await glob("./src/**/*.md");
  for (let filePath of src) {
    if (path.extname(filePath) !== ".md") continue;
    await render(filePath);
  }
}

/**
 * compile _nav.html from _nav.json
 * @param {{}[]} themes for rendering the theme selector
 */
async function renderNavbar(themes) {
  // Update navbar
  console.log("====\tUpdating navbar");
  const navbar = JSON.parse((await fs.readFile("_nav.json")).toString("ascii"));
  const out = pug.compileFile("./templates/nav.pug")({
    n: navbar,
    t: themes
  });
  console.log("==\t\tWriting to _nav.html");
  await fs.writeFile("./public/site/_nav.html", out);
}

async function getBlogPosts() {
  // Get blog posts, write to json and rss
  console.log("====\tGetting the blog posts");

  const postFeed = new feed.Feed({
    title: "roxwize's thoughts repository",
    description:
      "Where Little Roxwize rants about whatever is interesting him at the time.",
    id: "https://roxwize.xyz/diary/",
    link: "https://roxwize.xyz/diary/",
    language: "en",
    image: "https://roxwize.xyz/static/img/logo.png",
    favicon: "https://roxwize.xyz/favicon.ico",
    copyright: "Licensed under CC BY 4.0",
    generator: "uproot.js",
    feedLinks: {
      rss: "https://roxwize.xyz/diary/feed.rss"
    },
    author: {
      name: "roxwize",
      email: "rae@roxwize.xyz",
      link: "https://roxwize.xyz/"
    }
  });

  const src = await glob("./src/diary/*.md");
  const a = [];
  for (let filePath of src) {
    if (filePath === "src/diary/index.md") continue;
    const file = (await fs.readFile(filePath)).toString("ascii");
    const matter = gm(file);
    const data = matter.data;
    a.push({
      ...data,
      path: filePath
    });
    postFeed.addItem({
      title: data.title,
      id: `https://roxwize.xyz/diary/${data.title}.html`,
      link: `https://roxwize.xyz/diary/${data.title}.html`,
      description: data.summary,
      content: md.parse(matter.content),
      date: new Date(data.date)
    });
  }
  postFeed.options.updated = new Date(a[0].updateddate);
  console.log("==\t\t" + JSON.stringify(a));

  if (!fse.existsSync("public/diary")) {
    await fs.mkdir("public/diary");
  }
  await fs.writeFile("./public/diary/feed.rss", postFeed.rss2());
  await fs.writeFile("./src/posts.json", JSON.stringify(a));
}

/**
 * get all the palettes defined in _themes.json, write them to a file
 * @returns {Promise<{}[]>}
 */
async function getPalettes() {
  console.log("====\twriting theme data to css");
  const themes = JSON.parse(
    await fs.readFile("_themes.json", { encoding: "ascii" })
  );

  // make themes directory if it doesnt exist already
  if (!fse.existsSync("public/static/css/theme")) {
    await fs.mkdir("public/static/css/theme");
  }

  for (let theme of themes) {
    const styles = { "*": [], ["a:not(.nu)"]: [] };
    // palette
    for (let [k, v] of Object.entries(theme.palette)) {
      styles["*"].push(`--${k}:${v}`);
    }
    if (theme.type === "dark") {
      styles[".decsinc-logo"] = ["filter: invert();"]
    } else {
      styles[".release"] = ["color: var(--bg);"]
    }
    // extra options
    styles["a:not(.nu)"].push(
      `text-decoration:${theme.style?.link_underline ? "underline" : "none"}`
    );
    if (theme.style?.link_hover_underline === "use_animation") {
      styles["a:not(.nu)"].push("position:relative");
      styles["a:not(.nu)::after"] = [
        'content:""',
        "position:absolute",
        "left:0",
        "width:0%",
        "bottom:1%",
        "height:7%",
        "border-radius:4px",
        "background-color:var(--a)",
        "transition:200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      ];
      styles["a:not(.nu):hover::after"] = ["width:100%"];
    }

    styles[".overlay-container"] = [
      theme.style?.overlay_use_bg ? "color:var(--bg)" : "color:var(--fg)"
    ];
    styles["#theme-credits > div"] = styles[".overlay-container"];

    styles["body"] = [`background-image: url(/static/img/${theme.style?.bg_image_primary})`];
    styles["#sidebar"] = [`background-image: url(/static/img/${theme.style?.bg_image_secondary})`];

    // stringify styles
    let css = `/* ${theme.name} */`;
    for (let [el, style] of Object.entries(styles))
      css += `${el}{${style.join(";") + ";"}}`;
    await fs.writeFile(`public/static/css/theme/t_${theme.name}.css`, css);
    console.log(`==\t\t/public/static/css/theme/t_${theme.name}.css`);
  }
  return themes;
}

(async () => {
  const start = new Date();
  if (!fse.existsSync("public/site")) {
    await fs.mkdir("public/site");
  }
  const themes = await getPalettes();
  await getBlogPosts();
  await renderSite();
  await renderNavbar(themes);
  const end = new Date();
  console.log(`Done in ${end - start}ms`);
})();
