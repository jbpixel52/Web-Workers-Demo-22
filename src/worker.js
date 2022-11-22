import json from "./index.json";
import reportWebVitals from "./reportWebVitals";

export function Generator(iterations, id) {
  let workerStartDate = new Date().getTime();
  let parsed = Object.values(json);
  let generated = [];
  //RULES...
  //  prefix + base + sufix
  //  
  let baseLength = 7;
  let maxLength = baseLength;
  while (generated.length < iterations) {
    var prefix = parsed[Math.floor(Math.random() * parsed.length)];
    prefix = prefix.slice(0, prefix.length / 2);
    var base = parsed[Math.floor(Math.random() * parsed.length)];
    base = base.slice(base.length / 3, (base.length / 3) * 2);
    var sufix = parsed[Math.floor(Math.random() * parsed.length)];
    base = base.slice((base.length / 3) * 2, base.length);

    var tempWord = prefix + base + sufix;
    if (tempWord.length > maxLength) {
      //console.log(`${tempWord} too long...`);
      maxLength = baseLength + 1;
    } else if (tempWord.length <= maxLength) {
      generated.push(<p>{tempWord}</p>);
      maxLength = baseLength;
    }
  }
  //reportWebVitals(console.log);

  return generated;
}
