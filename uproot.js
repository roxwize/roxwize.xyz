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
	const src = await glob("./content/**/*.md");
	for (let filePath of src) {
		if (path.extname(filePath) !== ".md") continue;
		await render(filePath);
	}
}

(async () => {
	const start = new Date();
	await renderSite();
	const end = new Date();
	console.log(`Done in ${end - start}ms`);
})();
