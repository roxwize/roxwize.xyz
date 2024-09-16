const MW_ENABLED = "rxMwEnabled";
const MW_CUR_STATION = "rxMwCurStation";
const MW_STATIONS = "rxMwStations";

const MW_MAX_DESCRIPTION_LENGTH = 100;

/**
 * This is mw!!
 * @typedef {{ name: string, url: string, description?: string, website?: string, src?: string, isPlaylist: boolean, playing?: boolean, howl? }} Station
 * @typedef {{ type: "button", label: string, prop?: string, onclick?: () => void }[]} Options
 * @type {{ UI: MwUI, Init: () => void, OpenSettings: () => void, Play: (station?: Station) => void, SetEnabled: (enabled: number | string) => void, SetStation: (id: number) => void, ShowPopup: (content: string) => void, Stop: (showStatus?: boolean) => void, curStation: number, playingStation: Station, enabled: boolean, sound, stations: Station[], _addButton: (content: string, id: string, link: string) => HTMLAnchorElement, _addDependency: (url: string, hash?: string) => HTMLScriptElement, _addStationToList: (id: number) => void, _defaultStations: Station[], _howlerImport: HTMLScriptElement, _options: Options, _renderEnabled: () => void, _renderDisabled: () => void, _setStatus: (content: string) => void, _updateStationSelector: () => void }}
 */
const MW = {};
/**
 * @typedef {{ rootElement: HTMLDivElement, settingsDialog: HTMLDivElement, controls: HTMLDivElement, btnPlay: HTMLAnchorElement, btnStop: HTMLAnchorElement, btnSettings: HTMLAnchorElement, statusDisplay: HTMLDivElement, stationSelector: HTMLDivElement, stationName: HTMLSpanElement, stationList: HTMLDivElement }} MwUI
 * @type {MwUI}
 */
MW.UI = {};

MW._addButton = function (content, id, link) {
  const el = document.createElement("a");
  el.id = "mw-btn-" + id;
  el.classList.add("mw-btn");
  el.setAttribute("href", link);
  el.innerHTML = content;
  MW.UI.controls.appendChild(el);
  return el;
};

MW._options = [
  {
    type: "button",
    label: "disable mw",
    onclick: () => MW.SetEnabled(0)
  },
  {
    type: "button",
    label: "show popup",
    onclick: () => MW.ShowPopup("Beware the pingas bird")
  }
];
MW._renderEnabled = function () {
  //! The entire UI is being rebuilt erroneously
  MW.UI.rootElement.innerHTML = "";

  // settings
  MW.UI.settingsDialog = document.createElement("div");
  MW.UI.settingsDialog.id = "mw-settings";
  MW.UI.settingsDialog.classList.add("hidden");
  const types = {
    button: "button"
  };
  for (const option of MW._options) {
    const container = document.createElement("div");
    container.classList.add("mw-settings-item");

    const el = document.createElement(types[option.type]);
    el.innerHTML = option.label;
    if (option.type === "button") el.onclick = option.onclick;

    container.appendChild(el);
    MW.UI.settingsDialog.appendChild(container);
  }
  MW.UI.rootElement.appendChild(MW.UI.settingsDialog);

  // controls
  MW.UI.controls = document.createElement("div");
  MW.UI.controls.id = "mw-controls";

  MW.UI.btnPlay = MW._addButton(
    '<svg viewBox="-60 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m64 96 264 160L64 416z"/></svg>',
    "play",
    "javascript:MW.Play();"
  );

  MW.UI.btnStop = MW._addButton(
    '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M96 448q-14 0-23-9t-9-23V96q0-14 9-23t23-9h320q14 0 23 9t9 23v320q0 14-9 23t-23 9z"/></svg>',
    "stop",
    "javascript:MW.Stop();"
  );
  MW.UI.btnStop.classList.add("hidden");

  MW.UI.btnSettings = MW._addButton(
    '<svg viewBox="-32 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M64 80h48v352H64zm136 0h48v352h-48zm136 0h48v352h-48z"/></svg>',
    "settings",
    "javascript:MW.OpenSettings();"
  );

  MW.UI.rootElement.appendChild(MW.UI.controls);

  // status display
  MW.UI.statusDisplay = document.createElement("div");
  MW.UI.statusDisplay.id = "mw-status";
  MW._setStatus("&nbsp;");

  MW.UI.rootElement.appendChild(MW.UI.statusDisplay);

  // station selection
  MW.UI.stationSelector = document.createElement("div");
  MW.UI.stationSelector.id = "mw-station";
  MW.UI.stationSelector.addEventListener("click", () => {
    MW.UI.stationList.classList.toggle("hidden");
  });
  MW.UI.stationName = document.createElement("span");
  MW.UI.stationSelector.appendChild(MW.UI.stationName);
  MW._updateStationSelector();

  MW.UI.stationList = document.createElement("div");
  MW.UI.stationList.id = "mw-station-list";
  MW.UI.stationList.classList.add("hidden");
  for (const station in MW.stations) MW._addStationToList(station);
  MW.UI.stationSelector.appendChild(MW.UI.stationList);

  MW.UI.rootElement.appendChild(MW.UI.stationSelector);
};

MW._renderDisabled = function () {
  // maybe properly dispose of elements
  MW.UI.rootElement.innerHTML =
    '<span>mw is disabled. [<a href="javascript:MW.SetEnabled(1);">enable</a>] [<a href="javascript:MW.ShowPopup(\'mw is a music player built into the roxwize.xyz website!!<br><br>audio powered by <a href=https://howlerjs.com/>howler.js</a>\');">?</a>]</span>';
};

MW._updateStationSelector = function () {
  MW.UI.stationName.innerHTML = `${
    MW.stations[MW.curStation].name
  }<svg viewBox="0 -6 524 524" xmlns="http://www.w3.org/2000/svg"><path d="m64 191 34-34 164 163 164-163 34 34-198 196z"/></svg>`;
};

MW._setStatus = function (content) {
  MW.UI.statusDisplay.innerHTML =
    content.length > 28 ? content.substring(0, 28) + "&hellip;" : content;
};

MW._addDependency = function (url, hash) {
  const el = document.createElement("script");
  el.src = url;
  el.crossOrigin = "anonymous";
  el.referrerPolicy = "no-referrer";
  el.async = true;
  if (hash) el.integrity = hash;
  document.head.appendChild(el);
  return el;
};

MW._addStationToList = function (id) {
  const station = MW.stations[id];
  const el = document.createElement("div");
  el.classList.add("mw-station-list-item");
  el.innerHTML = `<div>${station.name}</div>${
    station.description
      ? '<div title="' +
        station.description +
        '">' +
        (station.description.length > MW_MAX_DESCRIPTION_LENGTH
          ? station.description.substring(0, MW_MAX_DESCRIPTION_LENGTH) +
            "&hellip;"
          : station.description) +
        "</div>"
      : ""
  }`;
  el.onclick = () => MW.SetStation(id);
  MW.UI.stationList.appendChild(el);
};

MW.SetStation = function (id) {
  MW.curStation = id;
  MW._updateStationSelector();
  localStorage.setItem(MW_CUR_STATION, id);
};
MW.OpenSettings = function () {
  MW.UI.settingsDialog.classList.toggle("hidden");
};

MW.Play = async function (station) {
  station ??= MW.stations[MW.curStation];
  if (!station) {
    console.warn("[mw] Station does not exist");
    return;
  }
  if (station.playing) return;
  MW.Stop(false);
  MW.UI.btnPlay.classList.add("hidden");
  MW.UI.btnStop.classList.remove("hidden");

  if (!station.src && station.isPlaylist) {
    MW._setStatus("fetching playlist");
    const res = await fetch(station.url).catch((err) => {
      console.error(`[mw] failed to get station pls file: ${err}`);
      MW.ShowPopup(
        `Failed to get playlist contents for ${station.name}. Check console for details.`
      );
    });
    const playlist = await res.text();
    if (playlist.startsWith("#EXTM3U")) {
      MW.ShowPopup("TODO: m3u8 playlists");
      return;
    } else if (playlist.startsWith("[playlist]")) {
      const map = {};
      for (const match of playlist.toLowerCase().matchAll(/(\w+)=(.*)\n/g)) {
        map[match[1]] = match[2];
      }
      // TODO: go to next item if first item doesnt load or user is disconnected (and so on)
      // TODO: also set station title from playlist entry maybe
      // FIXME: Also what if File1 doesnt exist??
      station.src = map["file1"];
    } else {
      MW.ShowPopup("Playlist is malformed or uses an unknown format.");
      return;
    }
  }

  console.log("[mw] %s", station.src || station.url);
  MW._setStatus("loading");
  if (station.howl) {
    MW.sound = station.howl;
  } else {
    MW.sound = new Howl({
      src: station.src || station.url,
      html5: true,
      format: ["mp3", "aac"]
    });
  }

  MW.sound.once("load", () => {
    MW._setStatus(`playing ${station.name}`);
    station.playing = true;
    MW.playingStation = station;
    MW.sound.play();
  });
  MW.sound.once("loaderror", (id, code) => {
    console.log("shit", id, code);
  });
};

MW.Stop = function (showStatus = true) {
  if (!MW.sound) return;
  MW.sound.stop();
  if (MW.playingStation) MW.playingStation.playing = false;
  MW.playingStation = undefined;
  MW.UI.btnPlay.classList.remove("hidden");
  MW.UI.btnStop.classList.add("hidden");
  if (showStatus) MW.UI.statusDisplay.innerHTML = "stopped";
};

MW.ShowPopup = function (content) {
  const popupEl = document.createElement("div");
  popupEl.classList.add("mw-popup");
  popupEl.innerHTML = content;
  popupEl
    .animate([{ left: "-100%" }, { left: "0" }], {
      duration: 1000,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)"
    })
    .addEventListener("finish", () => {
      setTimeout(() => {
        popupEl
          .animate([{ left: "0" }, { left: "-100%" }], {
            duration: 1000,
            easing: "cubic-bezier(0.64, 0, 0.78, 0)"
          })
          .addEventListener("finish", () => popupEl.remove());
      }, 1000 + popupEl.textContent.length * 30);
    });
  document.body.appendChild(popupEl);
};

MW.SetEnabled = function (enabled) {
  MW.enabled = enabled && enabled !== "0";
  localStorage.setItem(MW_ENABLED, enabled);
  if (MW.enabled) {
    if (MW._howlerImport) {
      MW._renderEnabled();
      return;
    }
    MW.UI.rootElement.innerHTML = "loading...";
    MW._howlerImport = MW._addDependency(
      "https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.4/howler.min.js",
      "sha512-xi/RZRIF/S0hJ+yJJYuZ5yk6/8pCiRlEXZzoguSMl+vk2i3m6UjUO/WcZ11blRL/O+rnj94JRGwt/CHbc9+6EA=="
    );
    MW._howlerImport.addEventListener("load", () => {
      MW._renderEnabled();
    });
  } else {
    MW.Stop();
    MW._renderDisabled();
  }
};

MW._defaultStations = [
  {
    name: "Drone Zone",
    url: "https://somafm.com/dronezone256.pls",
    description:
      "Droning atmospheric space music and ambient textures with minimal beats. Music on Drone Zone is all about sonic textures and environments. Youll hear music by artists such as Pete Namlook, Steve Roach, Harold Budd, Brian Eno, Stars of the Lid, Dilate and the KLF.",
    website: "https://somafm.com/dronezone/",
    isPlaylist: true
  },
  {
    name: "Groove Salad",
    url: "https://somafm.com/groovesalad256.pls",
    description:
      "Downtempo and chillout electronica featuring artists such as Kruder & Dorfmeister, Fila Brazillia, dZihan and Kamien, Afterlife, Zero Seven, Nightmares On Wax, Shantel, Groove Armada and artists on Pork Recordings, Waveform Records and Cafe del Mar recordings.",
    website: "https://somafm.com/groovesalad/",
    isPlaylist: true
  },
  {
    name: "cliqhop idm",
    url: "https://somafm.com/cliqhop256.pls",
    description:
      "Experimental techno, also known as Intelligent dance music (IDM). This is music composed digitally, creating sounds from bits rather than with bits and the instrument of choice of most IDM artists is a laptop computer. Typical artists include: Telefon Tel Aviv, Boards Of Canada, Autechre, Aphex Twin, Mu-ziq, Black Dog, Cex, Ulrich Schnauss, and Album Leaf.",
    website: "https://somafm.com/cliqhop/",
    isPlaylist: true
  },
  {
    name: "Nectarine Demoscene Radio",
    url: "http://necta.burn.net:8000/nectarine",
    website: "https://www.scenestream.net/demovibes/"
  }
];
MW.Init = function () {
  console.log("[mw] Starting mw");

  const s = localStorage.getItem(MW_STATIONS);
  if (s) {
    try {
      MW.stations = JSON.parse(s);
    } catch (err) {
      MW.ShowPopup(
        "The station configuration is invalid. Reverting to default."
      );
      MW.stations = MW._defaultStations;
    }
  } else {
    MW.stations = MW._defaultStations;
    localStorage.setItem(MW_STATIONS, JSON.stringify(MW.stations));
  }

  const cur = localStorage.getItem(MW_CUR_STATION);
  if (cur) {
    MW.curStation = parseInt(cur, 10);
    if (isNaN(MW.curStation)) MW.curStation = 0;
  } else {
    MW.curStation = 0;
    localStorage.setItem(MW_CUR_STATION, "0");
  }

  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.type = "text/css";
  style.href = "/static/css/mw.css";
  document.head.appendChild(style);

  MW.UI.rootElement = document.createElement("div");
  MW.UI.rootElement.id = "mw-root";
  document.body.appendChild(MW.UI.rootElement);
  MW.SetEnabled(localStorage.getItem(MW_ENABLED));
};

document.addEventListener("DOMContentLoaded", MW.Init);
