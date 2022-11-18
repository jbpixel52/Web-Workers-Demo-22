import { worker } from "jshint/src/vars";
import json from "./index.json";
export function Generator(iterations, id) {
  let workerStartDate = new Date().getTime();
  let parsed = Object.values(json);
  let generated = [];
  //RULES...
  //  prefix + base + sufix
  //

  let maxLength = 5;
  for (let index = 0; index < iterations; index++) {
    var prefix = parsed[Math.floor(Math.random() * parsed.length)];
    var base = parsed[Math.floor(Math.random() * parsed.length)];
    var sufix = parsed[Math.floor(Math.random() * parsed.length)];
    var tempWord = prefix + base + sufix;
    if (tempWord.length < maxLength) {
      generated.push(`${tempWord}`);
    } else {
      maxLength = maxLength + 1;
    }
  }

  console.log(
    `duration of generator${id}: ${new Date().getTime() - workerStartDate}`
  );
  console.log(generated);
  return generated;
}
