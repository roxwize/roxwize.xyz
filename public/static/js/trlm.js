const titleHeader = document.getElementById("titleheader");
const linkList = document.getElementById("links");
const vars = {};

function init() {
  // Get page parameters
  const query = window.location.search.substring(1).split("&");
  for (let param of query) {
    const _p = param.split("=");
    vars[_p[0]] = decodeURIComponent(_p[1]);
  }
  // Link trlm.css if interalstyle=1
  if (vars.internalstyle == "1") {
    const _l = document.createElement("link");
    _l.rel = "stylesheet";
    _l.href = "./trlm.css";
    document.head.appendChild(_l);
  }
  // Add user css
  if (vars.extcss) {
    const s = document.createElement("link");
    s.rel = "stylesheet";
    s.href = decodeURIComponent(vars.extcss);
    document.head.appendChild(s);
  }
  if (vars.incss) {
    const s = document.createElement("style");
    s.innerHTML = decodeURIComponent(vars.incss);
    document.head.appendChild(s);
  }
  // Get the link XML
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://roxwize.xyz/ext/trlm/trlm.xml", true);
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      titleHeader.textContent =
        vars.title !== undefined ? vars.title : "More cool sites";
      const doc = xhr.responseXML;
      let links;
      let pl = "category yields";
      if (vars.category) {
        let catsQuery = "";
        const all = vars.category.trim().split(",");
        if (all.length > 1) pl = "categories yield";
        const categories = Array.prototype.slice
          .call(doc.querySelectorAll("category"))
          .map((e) => e.getAttribute("name"));
        for (let category of all) {
          if (!categories.includes(category)) {
            err(`${category} is not a category`);
            return;
          }
          catsQuery += `category[name=${category}] link,`;
        }
        catsQuery = catsQuery.slice(0, -1);
        links = doc.querySelectorAll(catsQuery);
      } else
        links = doc.querySelectorAll("category:not([noinclude=true]) link");
      if (links.length === 0) {
        err(`The ${vars.category} ${pl} no result :(`);
        return;
      }
      links = Array.prototype.slice.call(links);

      // get a random slice
      const maxLinks = parseInt(
        vars.max || (links.length > 8 ? 8 : links.length)
      );
      if (maxLinks > 100 || maxLinks > links.length) {
        err(
          `That's too many links!! (max ${
            maxLinks > links.length ? links.length : "100"
          })`
        );
        return;
      }

      if (links.length > maxLinks * 2) {
        const i = Math.floor(Math.random() * (links.length - maxLinks));
        links = links.slice(i, i + maxLinks);
      }
      //shuffle
      for (let i = links.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i - 1));
        [links[i], links[j]] = [links[j], links[i]];
      }
      buildLinks(links, doc);
    } else {
      err(`HTTP code ${xhr.status} received, check console!!`);
    }
  });
  xhr.send();
}

function placeholderLink(href, label) {
  const o = { href: href, innerHTML: label, title: label };
  o.getAttribute = (a) => o[a];
  return o;
}

function err(e) {
  titleHeader.textContent = e;
  buildLinks(
    [
      placeholderLink("https://todo.sr.ht/~roxwize/roxwize.xyz", "File an issue"),
      placeholderLink("javascript:window.location.reload()", "Reload the page"),
    ],
    null
  ); // WOO polymorphism!!!!
}

function buildLinks(links, doc) {
  let styling = "";
  const addedLinks = [];
  links.forEach((link, i) => {
    const refid = link.getAttribute("id") || link.getAttribute("ref");
    if (refid) {
      if (addedLinks.includes(refid)) return;
      else addedLinks.push(refid);
    }
    if (link.getAttribute("ref"))
      link = doc.querySelector(`link[id="${refid}"]`);
    if (!link) return;
    const l = document.createElement("li");
    l.id = `li-${i}`;
    l.className = "trlmLink"
    l.innerHTML = `<a target="_blank" href="${link.getAttribute("href")}" title="${
      link.getAttribute("title") || link.textContent
    }">${link.innerHTML}</a>`;
    if (link.getAttribute("style") && vars.nostyle !== "1") {
      styling += link.getAttribute("style").replaceAll(/!/g, "#" + l.id);
    }
    linkList.appendChild(l);
  });
  if (vars.nostyle !== "1") {
    const s = document.createElement("style");
    s.innerHTML = styling;
    document.head.appendChild(s);
  }
}

init();
