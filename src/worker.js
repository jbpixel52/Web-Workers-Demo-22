import json from "./index.json";
export function Generator(iterations, id) {
  let parsed = Object.values(json);
  let generated = [];
  let ops = 0;
  const randomParsed = () => Math.floor(Math.random() * parsed.length);
  //RULES. =>   prefix + base + sufix
  let baseLength = 7;
  let maxLength = baseLength;
  const workerStartTime = new Date().getTime();
  let workerEndTime;
  let timeDif;
  while (generated.length < iterations) {
    var prefix = parsed[randomParsed()];
    ops = ops + 2;
    prefix = prefix.slice(0, prefix.length / 2);
    ops = ops + prefix.length / 2;
    var base = parsed[randomParsed()];
    ops = ops + 2;
    base = base.slice(base.length / 3, (base.length / 3) * 2);
    ops = ops + base.length / 3;
    var sufix = parsed[randomParsed()];
    ops = ops + 2;
    base = base.slice((base.length / 3) * 2, base.length);
    ops = ops + base.length / 3;
    var tempWord = prefix + base + sufix;
    ops = ops + 3;
    if (tempWord.length > maxLength) {
      //console.log(`${tempWord} too long...`);
      maxLength = baseLength + 1;
      ops = ops + 1;
    } else if (tempWord.length <= maxLength) {
      //push <p> </p> HTML into generated array of words;
      //generated.push(<p>{tempWord}</p>);
      generated.push(<></>);
      ops = ops + 1;
      maxLength = baseLength;
    }
  }

  workerEndTime = new Date().getTime();
  ops = ops + 1;
  timeDif = workerEndTime - workerStartTime;

  console.log(`Worker ${id} finished in ${timeDif} ms.`);
  console.log(`Worker ${id} N OPS: ${Math.ceil(ops)} ⚒️`)
  generated.unshift(
    <div className="m-auto font-bold">
      <p>{`👷‍♂️Worker ${id === 0 ? "serial" : id} ⏲️ ${timeDif}ms.`}</p>
    </div>
  );

  return (
    <div className="m-auto font-bold">
      <p>{`👷‍♂️Worker ${id === 0 ? "serial" : id} ⏲️ ${timeDif}ms.`}</p>
      <p>{`N OPS: ${Math.ceil(ops)} ⚒️`}</p>
    </div>
  );
}
