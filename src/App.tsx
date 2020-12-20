import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import dingoLines from "./dingolines.png";
import dingoBaseRed from "./dingobase_red.png";
import dingoBaseBlue from "./dingobase_blue.png";
import dingoEarsRed from "./dingoears_red.png";
import dingoEarLeftRed from "./dingo-ear-left-red.png";
import dingoEarRightRed from "./dingo-ear-right-red.png";

const W = 600;
const H = 540;

type DingoConfig = {
  [key: string]: string;
};

function App() {
  // using canvas in ts-react:
  // https://medium.com/better-programming/add-an-html-canvas-into-your-react-app-176dab099a79
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [dingoConfig, setDingoConfig] = useState<DingoConfig>({});

  const dingoParts = useRef<{
    [key: string]: HTMLImageElement;
  }>({
    [dingoLines]: new Image(),
    [dingoBaseRed]: new Image(),
    [dingoBaseBlue]: new Image(),
    [dingoEarsRed]: new Image(),
    [dingoEarLeftRed]: new Image(),
    [dingoEarRightRed]: new Image(),
  });

  const [readyDingoParts, setReadyDingoParts] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    for (const partSrc in dingoParts.current) {
      const image = dingoParts.current[partSrc];
      image.src = partSrc;
      image.onload = () => {
        setReadyDingoParts((prevState) => ({ ...prevState, [partSrc]: true }));
      };
      dingoParts.current[partSrc] = image;
    }
  }, [dingoParts, setReadyDingoParts]);

  useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d");
      if (renderCtx) {
        setContext(renderCtx);
      }

      if (context) {
        context.clearRect(0, 0, W, H);

        switch (dingoConfig.base) {
          case "red":
            if (readyDingoParts[dingoBaseRed] && readyDingoParts[dingoLines]) {
              context.drawImage(dingoParts.current[dingoBaseRed], 0, 0, W, H);
            }
            break;
          case "blue":
            if (readyDingoParts[dingoBaseBlue] && readyDingoParts[dingoLines]) {
              context.drawImage(dingoParts.current[dingoBaseBlue], 0, 0, W, H);
            }
            break;
        }
        switch (dingoConfig.earLeft) {
          case "red":
            if (readyDingoParts[dingoEarLeftRed]) {
              context.drawImage(
                dingoParts.current[dingoEarLeftRed],
                0,
                0,
                W,
                H
              );
            }
            break;
        }
        switch (dingoConfig.earRight) {
          case "red":
            if (readyDingoParts[dingoEarRightRed]) {
              context.drawImage(
                dingoParts.current[dingoEarRightRed],
                0,
                0,
                W,
                H
              );
            }
            break;
        }

        if (readyDingoParts[dingoLines])
          context.drawImage(dingoParts.current[dingoLines], 0, 0, W, H);
        return;
      }
    }
  }, [context, dingoConfig, readyDingoParts]);

  return (
    <div
      style={{
        margin: "auto",
      }}
    >
      <canvas
        id="canvas"
        ref={canvasRef}
        width={W}
        height={H}
        style={{
          border: "2px solid #000",
          marginTop: 10,
        }}
      ></canvas>
      <form>
        <h3>body color</h3>
        <li>
          <input
            type="radio"
            name="base"
            value="none"
            id="basenone"
            defaultChecked
            onChange={(e) =>
              setDingoConfig((prevState) => {
                return { ...prevState, base: e.target.value };
              })
            }
          ></input>
          <label htmlFor="basenone">none</label>
        </li>
        <li>
          <input
            type="radio"
            name="base"
            value="red"
            id="basered"
            onChange={(e) =>
              setDingoConfig((prevState) => {
                return { ...prevState, base: e.target.value };
              })
            }
          ></input>
          <label htmlFor="basered">red</label>
        </li>
        <li>
          <input
            type="radio"
            name="base"
            value="blue"
            id="baseblue"
            onChange={(e) =>
              setDingoConfig((prevState) => {
                return { ...prevState, base: e.target.value };
              })
            }
          ></input>
          <label htmlFor="baseblue">blue</label>
        </li>
        <h3>dingo ears</h3>
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              value="red"
              checked={dingoConfig.earLeft === "red"}
              onChange={(e) =>
                setDingoConfig((prevState) => {
                  return {
                    ...prevState,
                    earLeft: e.target.checked ? "red" : "",
                  };
                })
              }
            />
            left ear (red)
          </label>
        </div>
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              value="red"
              checked={dingoConfig.earRight === "red"}
              onChange={(e) =>
                setDingoConfig((prevState) => {
                  return {
                    ...prevState,
                    earRight: e.target.checked ? "red" : "",
                  };
                })
              }
            />
            left ear (red)
          </label>
        </div>
      </form>
    </div>
  );
}

// const handleDingoConfigChange = (
//   configKey: keyof DingoConfig,
//   setDingoConfig: React.Dispatch<React.SetStateAction<DingoConfig>>
// ) => (e: React.ChangeEvent<HTMLSelectElement>) => {
//   setDingoConfig((prevState) => {
//     return { ...prevState, [configKey]: e.target.value };
//   });
// };

export default App;
