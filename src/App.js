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
  let startTime = new Date().getTime();
  //console.log(`start time: ${startTime}`);
  useEffect(() => {
    //console.log(`message 1 is ${message1}`);
    //console.log(`message 2 is ${message2}`);
    (async () => {
      // Note: in your actual app code, make sure to check if Home
      // is still mounted before setting state asynchronously!

      const webWorkerMessage1 = await worker1
        .Generator(50, 1)
        .then((response) => {
          setMessage1(response);
          console.log(
            `message 1 duration: ${new Date().getTime() - startTime}`
          );
        });
      const webWorkerMessage2 = await worker2
        .Generator(5, 2)
        .then((response) => {
          setMessage2(response);
        });
    })();
  }, [clicked]);

  return (
    <div className="flex h-screen flex-col max-w-screen bg-gradient-to-tl from-indigo-200 via-red-200 to-yellow-100`">
      <h1 className="w-fit m-auto text-black font-bold text-5xl p-10">
        WEB WORKERS 🤖
      </h1>
      <button
        className="block m-auto w-fit h-fit text-xl rounded-full p-5 btn font-bold shadow-2xl hover:bg-red-300"
        onClick={() => setClicked(!clicked)}
      >
        CLICK ME TO INVENT WORDS!
      </button>
      <div className="m-auto flex flex-row gap-10 p-10">
        <div className="flex flex-wrap max-w-1/2 gap-3 rounded p-2 shadow-xl bg-amber-300">
          {message1}
        </div>
        <div className="flex flex-wrap max-w-1/2 gap-3 rounded p-2 shadow-xl bg-emerald-300">
          {message2}
        </div>
      </div>
    </div>
  );
}
//reportWebVitals(console.log);

export default App;
