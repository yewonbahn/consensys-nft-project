/** @jsxImportSource @emotion/react */ // necessary for react17 and create-react-app https://github.com/emotion-js/emotion/issues/2041
import React, { useEffect, useState } from "react";
import { Sprite, Stage } from "@inlet/react-pixi";
import { css } from "@emotion/react/macro";
import "./App.css";
import dingoLines from "./dingolines.png";
import dingoBase from "./dingo-base.png";
import dingoEarLeft from "./dingo-ear-left.png";
import dingoEarRight from "./dingo-ear-right.png";
import dingoMaskRight from "./dingo-mask-right.png";

const W = 600;
const H = 540;

const colorToHex = {
  red: 0xdca779,
  cream: 0xf6dfa7,
  blue: 0x6a6b87,
  gray: 0xcdcdd7,
};

const DefaultDingoConfig = {
  base: null,
  earLeft: null,
  earRight: null,
  maskRight: null,
};

const partToImg = {
  base: dingoBase,
  earLeft: dingoEarLeft,
  earRight: dingoEarRight,
  maskRight: dingoMaskRight,
};

type DingoColor = keyof typeof colorToHex | null;
type DingoPart = keyof typeof partToImg;

type DingoConfig = {
  [part in DingoPart]: DingoColor;
};

// const config = {
//   earLeft: "red",
//   earRight: "",
//   base: "red",
// };

function App() {
  const [dingoConfig, setDingoConfig] = useState<DingoConfig>(
    DefaultDingoConfig
  );
  const [tint, setTint] = useState<number>(0x27e10e);
  const [view, setView] = useState<string>("body");

  useEffect(() => {}, [dingoConfig]);

  return (
    <div
      css={css`
        margin: auto;
      `}
    >
      <Stage
        width={W}
        height={H}
        style={{
          border: "1px solid #000",
          marginTop: 10,
        }}
        options={{
          backgroundColor: 0xf6f5f9,
          antialias: true,
          autoDensity: true,
        }}
      >
        <DingoDrawing config={dingoConfig} />
        <Sprite width={W} height={H} image={dingoLines} />
      </Stage>

      <Configorator view={view} setView={setView} />

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
                const state: DingoConfig = { ...prevState };
                state.base = null;
                return state;
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
                const state: DingoConfig = { ...prevState };
                state.base = "red";
                return state;
              })
            }
          ></input>
          <label htmlFor="basered">red</label>
        </li>
        <li>
          <input
            type="radio"
            name="base"
            value="cream"
            id="basecream"
            onChange={(e) =>
              setDingoConfig((prevState) => {
                const state: DingoConfig = { ...prevState };
                state.base = "cream";
                return state;
              })
            }
          ></input>
          <label htmlFor="basecream">cream</label>
        </li>
        <li>
          <input
            type="radio"
            name="base"
            value="blue"
            id="baseblue"
            onChange={(e) =>
              setDingoConfig((prevState) => {
                const state: DingoConfig = { ...prevState };
                state.base = "blue";
                return state;
              })
            }
          ></input>
          <label htmlFor="baseblue">blue</label>
        </li>
        <li>
          <input
            type="radio"
            name="base"
            value="gray"
            id="basegray"
            onChange={(e) =>
              setDingoConfig((prevState) => {
                const state: DingoConfig = { ...prevState };
                state.base = "gray";
                return state;
              })
            }
          ></input>
          <label htmlFor="basegray">gray</label>
        </li>
        <h3>dingo ears</h3>
        <Checkbox
          dingoConfig={dingoConfig}
          setDingoConfig={setDingoConfig}
          color="red"
          part="earLeft"
        >
          left ear
        </Checkbox>
        <Checkbox
          dingoConfig={dingoConfig}
          setDingoConfig={setDingoConfig}
          color="red"
          part="earRight"
        >
          right ear
        </Checkbox>
        <Checkbox
          dingoConfig={dingoConfig}
          setDingoConfig={setDingoConfig}
          color="red"
          part="maskRight"
        >
          right mask
        </Checkbox>
        <Checkbox
          dingoConfig={dingoConfig}
          setDingoConfig={setDingoConfig}
          color="blue"
          part="earLeft"
        >
          left ear
        </Checkbox>
        <Checkbox
          dingoConfig={dingoConfig}
          setDingoConfig={setDingoConfig}
          color="blue"
          part="earRight"
        >
          right ear
        </Checkbox>
        <Checkbox
          dingoConfig={dingoConfig}
          setDingoConfig={setDingoConfig}
          color="blue"
          part="maskRight"
        >
          right mask
        </Checkbox>
        <h3>dingo tint</h3>
        <input
          value={tint.toString(16)}
          onChange={(e) => setTint(parseInt(e.target.value, 16))}
        />
      </form>
    </div>
  );
}

type DingoDrawingProps = {
  config: DingoConfig;
};

const DingoDrawing = ({ config }: DingoDrawingProps) => {
  return (
    <React.Fragment>
      {Object.keys(config).map((part) => {
        const dingoColor = config[part as DingoPart];
        return dingoColor === null ? null : (
          <Sprite
            key={`${part}-${dingoColor}`}
            width={W}
            height={H}
            image={partToImg[part as DingoPart]}
            tint={colorToHex[dingoColor]}
          />
        );
      })}
    </React.Fragment>
  );
};

const Checkbox = ({
  dingoConfig,
  part,
  color,
  setDingoConfig,
  children,
}: {
  dingoConfig: DingoConfig;
  part: DingoPart;
  color: DingoColor;
  setDingoConfig: React.Dispatch<React.SetStateAction<DingoConfig>>;
  children: string;
}) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          value={color ? color : "none"}
          checked={dingoConfig[part] === color}
          onChange={(e) =>
            setDingoConfig((prevState) => {
              const state: DingoConfig = { ...prevState };
              state[part] = e.target.checked ? color : null;
              return state;
            })
          }
        />
        [{color}] {children}
      </label>
    </div>
  );
};

const Configorator = ({
  setView,
  view,
}: {
  setView: React.Dispatch<React.SetStateAction<string>>;
  view: string;
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
      `}
    >
      <div>
        <ViewTitle name="body" setView={setView}>
          Body
        </ViewTitle>
        <ViewTitle name="earL" setView={setView}>
          Ear L
        </ViewTitle>
        <ViewTitle name="earR" setView={setView}>
          Ear R
        </ViewTitle>
        <ViewTitle name="maskL" setView={setView}>
          Mask L
        </ViewTitle>
        <ViewTitle name="maskR" setView={setView}>
          Mask R
        </ViewTitle>
        <ViewTitle name="mottle" setView={setView}>
          Mottle
        </ViewTitle>
      </div>
      <ConfigView view={view} />
    </div>
  );
};

const ConfigView = ({ view }: { view: string }) => {
  return <p>{view}</p>;
};

const ViewTitle = ({
  children,
  name,
  setView,
}: {
  children: string;
  name: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <button
      onClick={() => {
        setView(name);
      }}
    >
      {children}
    </button>
  );
};

export default App;
