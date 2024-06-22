/** @type {HTMLImageElement} */
let el_drilly;
/** @type {HTMLAudioElement} */
let el_sound_player;
let hidden = false;

function totally_garnular() {
  if (el_drilly) {
    el_drilly.classList.toggle("drilly-hidden");
    hidden = !hidden;
    return;
  }

  el_drilly = document.createElement("img");
  el_drilly.id = "drilly";
  el_drilly.alt = "DRILLYYYYY!!!!!!!";
  el_drilly.onclick = () => adlib(3);
  document.body.appendChild(el_drilly);

  el_sound_player = document.createElement("audio");
  el_sound_player.hidden = true;
  el_sound_player.addEventListener("ended", () => set_expression("idle"));
  document.body.appendChild(el_sound_player);

  setInterval(() => {
    if (Math.random() < 0.75 || hidden) return;
    adlib();
  }, 8000);

  speak("hello");
}

function adlib(max = 6) {
  const num = Math.floor(Math.random() * max + 1);
  speak(`idle${num}`, num <= 3);
}

function set_expression(expression) {
  el_drilly.src = `../static/img/drilly/${expression}.gif`;
}

function speak(file, giddy) {
  el_sound_player.src = `../static/sound/drilly/${file}.mp3`;
  el_sound_player.load();
  set_expression(giddy ? "happy" : "yapping");
  el_sound_player.play();
}
