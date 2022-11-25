import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";
const createWorker = createWorkerFactory(() => import("./worker"));
function App() {
  const worker1 = useWorker(createWorker);
  const worker2 = useWorker(createWorker);

  let [Clicks, setClicks] = React.useState(0);
  let [startTime, setStartTime] = React.useState(new Date().getTime());

  const [clicked, setClicked] = React.useState(false);

  const [message1, setMessage1] = React.useState(null);
  const [message2, setMessage2] = React.useState(null);

  const [message1Len, setMessage1Len] = React.useState(2000);
  const [message2Len, setMessage2Len] = React.useState(2000);

  let [message1Average, setMessage1Average] = React.useState(0.1);
  let [message2Average, setMessage2Average] = React.useState(0.1);

  useEffect(() => {
    (async () => {
      // Note: in your actual app code, make sure to check if Home
      // is still mounted before setting state asynchronously!

      const webWorkerMessage1 = await worker1
        .Generator(message1Len, 1)
        .then((response) => {
          setMessage1(response);
          console.log(
            `message 1 duration: ${new Date().getTime() - startTime}`
          );
          setMessage1Average((new Date().getTime() - startTime));
        });
      const webWorkerMessage2 = await worker2
        .Generator(message2Len, 2)
        .then((response) => {
          setMessage2(response);
          console.log(`message 2 duration ${new Date().getTime() - startTime}`);
          setMessage2Average((new Date().getTime() - startTime));
        });
    })();

    setClicks(Clicks + 1);
  }, [clicked]);

  // useEffect(() => {
  //   setMessage1Average((message1Average + startTime) / Clicks);
  //   console.log(`message1average ${message1Average}`);
  // }, []);

  // useEffect(() => {
  //   setMessage1Average((message2Average + (new Date().getTime()-startTime)) / Clicks);
  //   console.log(`message2average ${message2Average}`);
  // }, []);

  const handleClick = () => {
    setClicks(Clicks + 1);
    setStartTime(new Date().getTime());
    setClicked(!clicked);
  };

  return (
    <div
      className="flex min-h-screen px-5 flex-col min-w-screen max-w-screen
    "
    >
      <h1 className="w-fit m-auto text-black text-5xl p-3 shadow-sm rounded-3xl">
        <b>WEB WORKERS</b> 🤖 say giberish...
      </h1>
      <button
        className="block m-auto w-fit h-fit text-xl rounded-full p-5 font-bold shadow-2xl bg-gradient-to-r from-rose-100 to-teal-100"
        onClick={() => handleClick()}
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

      <div className="m-auto flex flex-row gap-10">
        <p>{`Worker 1👽 average duration: ${message1Average} ms`}</p>
        <p>{`Worker 2😊 average duration: ${message2Average} ms`}</p>
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
