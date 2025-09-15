const glob = require("glob").glob;
const pug = require("pug");
const fs = require("fs/promises");
const fse = require("fs");
const gm = require("gray-matter");
const md = require("marked");
const md_headerIds = require("marked-gfm-heading-id").gfmHeadingId;
const path = require("path");
const feed = require("feed");

function get_levels(n, p) {
	let o = {};
	for (const [k, v] of Object.entries(n)) {
		o[k] = {}
		o[k].v = v;
		o[k].p = p;
		if (Object.keys(v[1]).length > 0) o = {...o, ...get_levels(v[1], k)};
	}
	return o;
}

(async () => {
	const start = new Date();
	const _nav = JSON.parse((await fs.readFile("content/nav.json")).toString("utf-8"));
	const nav = get_levels(_nav);
	const template = pug.compileFile("templates/site.pug");

	const content = await glob("content/**/*.md");
	for (let filePath of content) {
		if (path.extname(filePath) !== ".md") continue;
		console.log(filePath);
		const relativePath = filePath.replace(/[^\/]+\//, "");
		const dir = relativePath.match(/^(?:[^\/]+\/)+/);
		if (dir) {
			await fs.mkdir(`public/${dir[0]}`, { recursive: true });
		}
		const file = (await fs.readFile(filePath)).toString("ascii");
		const matter = gm(file);
		md.use(md_headerIds({ prefix: "-" }));
		let out;
		if (matter.data.nowrap) {
			out = md.parse(matter.content);
		} else if (matter.data.template) {
			const data = matter.data.data
				? JSON.parse((await fs.readFile(matter.data.data)).toString("ascii"))
				: {};
			out = pug.compileFile(`templates/${matter.data.template}.pug`)({
				title: matter.data.title,
				gm: matter.data,
				content: md.parse(matter.content),
				data, nav
			});
		} else {
			out = template({
				title: matter.data.title,
				gm: matter.data,
				content: md.parse(matter.content),
				nav
			});
		}
		await fs.writeFile(
			`public/${relativePath.replace(/\.[^\/.]+$/, "")}.html`, // ugh
			out
		);
	}
	// make index page
	const index_list = (items) => {
		let index_content = "<ul class=\"index-list\">";
		for (const [k, item] of Object.entries(items)) {
			index_content += `<li><a href="${k === "." ? item[0] : "/site/" + item[0]}">${k === "." ? "home" : k}</a>${Object.keys(item[1]).length > 0 ? index_list(item[1]) : ""}</li>`;
		}
		index_content += "</ul>";
		return index_content;
	}
	await fs.writeFile("public/sitemap.html", template({
		title: "index",
		gm: {},
		content: index_list(_nav),
		nav
	}));

	const end = new Date();
	console.log(`Done in ${end - start}ms`);
})();

