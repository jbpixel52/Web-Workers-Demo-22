import json from "./index.json";
export function Generator(iterations, id) {
  let parsed = Object.values(json);
  let generated = [];
  const randomParsed = () => Math.floor(Math.random() * parsed.length);
  //RULES. =>   prefix + base + sufix
  let baseLength = 7;
  let maxLength = baseLength;
  while (generated.length < iterations) {
    var prefix = parsed[randomParsed()];
    prefix = prefix.slice(0, prefix.length / 2);
    var base = parsed[randomParsed()];
    base = base.slice(base.length / 3, (base.length / 3) * 2);
    var sufix = parsed[randomParsed()];
    base = base.slice((base.length / 3) * 2, base.length);
    var tempWord = prefix + base + sufix;
    if (tempWord.length > maxLength) {
      //console.log(`${tempWord} too long...`);
      maxLength = baseLength + 1;
    } else if (tempWord.length <= maxLength) {
      //push <p> </p> HTML into generated array of words;
      generated.push(<p>{tempWord}</p>);
      maxLength = baseLength;
    }
  }
  return generated;
}
