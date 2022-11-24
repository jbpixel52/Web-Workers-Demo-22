import logo from "./logo.svg";
import "./App.css";
import reportWebVitals from "./reportWebVitals";

import React, { useEffect, useState } from "react";
import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";
const createWorker = createWorkerFactory(() => import("./worker"));

function App() {
  const worker1 = useWorker(createWorker);
  const worker2 = useWorker(createWorker);
  const [message1, setMessage1] = React.useState(null);
  const [message2, setMessage2] = React.useState(null);
  const [clicked, setClicked] = React.useState(false);
  const [message1Len, setMessage1Len] = React.useState(1000);
  const [message2Len, setMessage2Len] = React.useState(1000);

  let startTime = new Date().getTime();
  //console.log(`start time: ${startTime}`);
  useEffect(() => {
    //console.log(`message 1 is ${message1}`);
    //console.log(`message 2 is ${message2}`);
    (async () => {
      // Note: in your actual app code, make sure to check if Home
      // is still mounted before setting state asynchronously!
      const webWorkerMessage2 = await worker2
        .Generator(message2Len, 2)
        .then((response) => {
          setMessage2(response);
        });

      const webWorkerMessage1 = await worker1
        .Generator(message1Len, 1)
        .then((response) => {
          setMessage1(response);
          console.log(
            `message 1 duration: ${new Date().getTime() - startTime}`
          );
        });
    })();
  }, [clicked]);

  return (
    <div className="flex min-h-screen px-5 flex-col min-w-screen max-w-screen
    ">
      <h1 className="w-fit m-auto text-black text-5xl p-3 shadow-sm rounded-3xl">
        <b>WEB WORKERS</b> 🤖 say giberish...
      </h1>
      <button
        className="block m-auto w-fit h-fit text-xl rounded-full p-5 font-bold shadow-2xl bg-gradient-to-r from-rose-100 to-teal-100"
        onClick={() => setClicked(!clicked)}
      >
        CLICK ME TO INVENT WORDS!
      </button>
      <div className="m-auto flex flex-row gap-2">
        <input
          className="w-20 rounded-full shadow-xl p-2"
          type="number"
          name="N1"
          id="worker1Length"
          value={message1Len}
          onChange={(e) => setMessage1Len(e.currentTarget.value)}
        />
        <input
          className="w-20 rounded-full shadow-xl p-2"
          type="number"
          name="N2"
          id="worker2Length"
          value={message2Len}
          onChange={(e) => setMessage2Len(e.currentTarget.value)}
        />
      </div>
      <div className="m-auto flex flex-row gap-2">
        <div className="flex flex-wrap max-w-1/2 gap-3 rounded p-2 shadow-2xl bg-gradient-to-r from-rose-100 to-teal-100 ">
          {message1}
        </div>
        <div className="flex flex-wrap max-w-1/2 gap-3 rounded p-2 shadow-2xl bg-gradient-to-r from-rose-100 to-teal-100 ">
          {message2}
        </div>
      </div>
    </div>
  );
}
//reportWebVitals(console.log);

export default App;
