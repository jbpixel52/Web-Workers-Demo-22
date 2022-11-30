import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";
const createWorker = createWorkerFactory(() => import("./worker"));
function App() {
  let [Clicks, setClicks] = React.useState(0);
  const worker1 = useWorker(createWorker);
  const worker2 = useWorker(createWorker);
  const worker3 = useWorker(createWorker);
  const worker4 = useWorker(createWorker);
  const [clicked, setClicked] = React.useState(false);
  const [message1, setMessage1] = React.useState(null);
  const [message2, setMessage2] = React.useState(null);
  const [message3, setMessage3] = React.useState(null);
  const [message4, setMessage4] = React.useState(null);
  const [wordsN, setWordsN] = React.useState(20);

  const [finished, setFinished] = React.useState(false);

  const [startTime, setStartTime] = React.useState(new Date().getTime());
  const [execTime, setExecTime] = React.useState(0);

  const [serialState, setEnableSerial] = React.useState(false);
  const serialWorker = useWorker(createWorker);
  const [serialMessage, setSerialMessage] = React.useState(null);

  useEffect(() => {
    setStartTime(new Date().getTime());

    (async () => {
      const webWorkerMessage1 = await worker1
        .Generator(wordsN / 2, 1)
        .then((response) => {
          setMessage1(response);
        });
      const webWorkerMessage2 = await worker2
        .Generator(wordsN / 2, 2)
        .then((response) => {
          setMessage2(response);
        });

      const webWorkerMessage3 = await worker3
        .Generator(wordsN / 2, 3)
        .then((response) => {
          setMessage3(response);
        });

      const webWorkerMessage4 = await worker4
        .Generator(wordsN / 2, 4)
        .then((response) => {
          setMessage4(response);
        });

      if (serialState) {
        const serialWebWorker = await serialWorker
          .Generator(wordsN, 0)
          .then((response) => {
            setSerialMessage(response);
          });
      }
    })();

    setClicks(Clicks + 1);
    setFinished(!finished);
    setExecTime(new Date().getTime() - startTime);
  }, [clicked]);

  const handleClick = () => {
    setClicks(Clicks + 1);
    setClicked(!clicked);
  };

  useEffect(() => {}, [message1]);

  return (
    <div
      className="flex min-h-screen px-5 flex-col min-w-screen max-w-screen
    "
    >
      <h1 className="w-fit m-auto text-black text-5xl p-3 shadow-sm rounded-3xl">
        <b>WEB WORKERS</b> 🤖 say giberish...
      </h1>
      <button
        className="block m-auto w-fit h-fit text-xl rounded-full p-5 font-bold shadow-2xl bg-white outline-dashed"
        onClick={() => handleClick()}
      >
        CLICK ME TO INVENT WORDS!
      </button>

      <div className="m-auto flex flex-row gap-2 p-2">
        <p className="font-bold m-auto">Number of Words to generate:</p>
        <input
          className="w-20 rounded-xl font-bold outline-dashed bg-transparent shadow-xl p-2"
          type="number"
          name="N1"
          id="worker1Length"
          value={wordsN}
          onChange={(e) => setWordsN(e.currentTarget.value)}
        />
        <span className="m-auto flex flex-row gap-2 p-2 font-bold">
          Enable Serial Worker
          <input
            type={"checkbox"}
            className="rounded-full fle w-10 h-10 bg-transparent"
            onChange={() => {
              setEnableSerial(!serialState);
            }}
          />
        </span>
      </div>

      <div className="m-auto flex flex-row gap-10 underline italic">
        <p>{`Main Thread Exec. Time: `}<b>{`${execTime} ms` }</b></p>
      </div>
      <div className="m-auto flex flex-row gap-2 flex-wrap items-center m-auto">
        <div className="flex flex-wrap max-w-1/2 gap-3 rounded p-2 shadow-2xl bg-gradient-to-r from-rose-100 to-teal-100 ">
          {message1}
        </div>
        <div className="flex flex-wrap max-w-1/2 gap-3 rounded p-2 shadow-2xl bg-gradient-to-r from-rose-100 to-teal-100 ">
          {message2}
        </div>

        <div className="flex flex-wrap max-w-1/2 gap-3 rounded p-2 shadow-2xl bg-gradient-to-r from-rose-100 to-teal-100 ">
          {message3}
        </div>

        <div className="flex flex-wrap max-w-1/2 gap-3 rounded p-2 shadow-2xl bg-gradient-to-r from-rose-100 to-teal-100 ">
          {message4}
        </div>

        {serialState ? (
          <div className="flex flex-wrap max-w-1/2 gap-3 rounded p-2 shadow-2xl bg-gradient-to-l from-rose-500 to-teal-500 ">
            {serialMessage}
          </div>
        ) : (
          <></>
        )}
      </div>
      <a  className="m-auto" href="https://github.com/jbpixel52/Web-Workers-Demo-22">Source for this project.</a>
    </div>
  );
}
//reportWebVitals(console.log);

export default App;
