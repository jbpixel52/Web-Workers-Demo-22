import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";
const createWorker = createWorkerFactory(() => import("./worker"));

function App() {
  const worker1 = useWorker(createWorker);
  const worker2 = useWorker(createWorker);
  const [message1, setMessage1] = React.useState(null);
  const [message2, setMessage2] = React.useState(null);
  let date = new Date().getTime();
  console.log(`start time: ${date}`);
  useEffect(() => {
    console.log(`message 1 is ${message1}`);
    console.log(`message 2 is ${message2}`);
    (async () => {
      // Note: in your actual app code, make sure to check if Home
      // is still mounted before setting state asynchronously!

      const webWorkerMessage1 = await worker1
        .Generator(1000, 1)
        .then((response) => {
          setMessage1(response);
        });
      const webWorkerMessage2 = await worker2
        .Generator(1000, 2)
        .then((response) => {
          setMessage2(response);
        });
    })();
  }, [worker1, worker2]);

  return (
    <div className="w-screen h-auto flex flex-col bg-cyan-900">
      <h1 className="text-white">WEB WORKERS 🤖</h1>
      <br />
      <p className="font-bold">{message1}</p>
      <p className="flex max-w-1/2 text-red-500 flex-wrap break-all	">
        {message2}
      </p>
    </div>
  );
}

export default App;
