import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import dingoLines from "./dingolines.png";
import dingoBaseRed from "./dingobase_red.png";
import dingoBaseBlue from "./dingobase_blue.png";
import dingoEarsRed from "./dingoears_red.png";

const w = 600;
const h = 540;

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
        context.clearRect(0, 0, w, h);

        if (dingoConfig.base) {
          switch (dingoConfig.base) {
            case "red":
              if (
                readyDingoParts[dingoBaseRed] &&
                readyDingoParts[dingoLines]
              ) {
                context.drawImage(dingoParts.current[dingoBaseRed], 0, 0, w, h);
              }
              break;
            case "blue":
              if (
                readyDingoParts[dingoBaseBlue] &&
                readyDingoParts[dingoLines]
              ) {
                context.drawImage(
                  dingoParts.current[dingoBaseBlue],
                  0,
                  0,
                  w,
                  h
                );
                context.drawImage(dingoParts.current[dingoLines], 0, 0, w, h);
              }
              break;
          }
          switch (dingoConfig.ears) {
            case "red":
              if (readyDingoParts[dingoEarsRed]) {
                context.drawImage(dingoParts.current[dingoEarsRed], 0, 0, w, h);
              }
              break;
          }
        }

        if (readyDingoParts[dingoLines])
          context.drawImage(dingoParts.current[dingoLines], 0, 0, w, h);
        return;
      }
    }
  }, [context, dingoConfig, readyDingoParts]);

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <canvas
        id="canvas"
        ref={canvasRef}
        width={w}
        height={h}
        style={{
          border: "2px solid #000",
          marginTop: 10,
        }}
      ></canvas>
      <form>
        <select
          name="base"
          onChange={handleDingoConfigChange("base", setDingoConfig)}
        >
          <option></option>
          <option>red</option>
          <option>blue</option>
        </select>
        <select
          name="ears"
          onChange={handleDingoConfigChange("ears", setDingoConfig)}
        >
          <option></option>
          <option>red</option>
          <option>blue</option>
        </select>
      </form>
    </div>
  );
}

const handleDingoConfigChange = (
  configKey: keyof DingoConfig,
  setDingoConfig: React.Dispatch<React.SetStateAction<DingoConfig>>
) => (e: React.ChangeEvent<HTMLSelectElement>) => {
  setDingoConfig((prevState) => {
    return { ...prevState, [configKey]: e.target.value };
  });
};

export default App;
