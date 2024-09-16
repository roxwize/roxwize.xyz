const lines = [
  ["teenage", "programming", "scum"], // ARTIFICIAL PROBABILITY INFLATION
  ["teenage", "programming", "scum"],
  ["teenage", "programming", "scum"],
  ["teenage", "programming", "scum"],
  ["teenage", "programming", "scum"],
  ["teenage", "programming", "scum"],
  ["teenage", "programming", "scum"],
  ["teenage", "programming", "scum"],
  ["it's whatever", "you say", "it is"],
  ["in", "split", "infinity"],
  ["this", "must", "be"],
  ["mobius", "double", "reacharound"],
  ["time", "truth", "and hearts"],
  ["my existence", "is a momentary", "lapse of reason"],
  ["before", "you're", "comatose"],
  ["the past", "inside", "the present"],
  ["times", "the", "raker"],
  ["all", "is", "well"],
  ["like an", "apple split", "in two"],
  ["it all", "returns", "to nothing"],
  ["minn besti", "vinur hverju", "sem dynur"],
  ["turn it on", "tune it in", "and stay inert"],
  ["this", "dread", "circumference"],
  ["like", "spinning", "plates"],
  ["same", "as", "above"]
]

const line = lines[Math.floor(Math.random() * lines.length)];
document.getElementById("splashtop").innerHTML = line[0];
document.getElementById("splashbtm").innerHTML = line.slice(1).join("<br>");
