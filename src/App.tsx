/** @jsxImportSource @emotion/react */ // necessary for react17 and create-react-app https://github.com/emotion-js/emotion/issues/2041
import React, { useEffect, useState } from "react";
import { Sprite, Stage } from "@inlet/react-pixi";
import { css } from "@emotion/react/macro";
import "./App.css";

import dingoLines from "./dingolines.png";
import dingoBase from "./dingo-base.png";
import dingoEarLeft from "./dingo-ear-left.png";
import dingoEarRight from "./dingo-ear-right.png";
import dingoMaskLeft0 from "./dingo-mask-left-0.png";
import dingoMaskLeft1 from "./dingo-mask-left-1.png";
import dingoMaskRight from "./dingo-mask-right.png";

import iconBody from "./icon-body.png";
import iconEarLeft from "./icon-ear-left.png";
import iconEarRight from "./icon-ear-right.png";
import iconMaskLeft0 from "./icon-mask-left-0.png";
import iconMaskLeft1 from "./icon-mask-left-1.png";
import iconMaskRight from "./icon-mask-right.png";

const W = 600;
const H = 540;

const colorToHex = {
  red: 0xdca779,
  cream: 0xf6dfa7,
  blue: 0x6a6b87,
  gray: 0xcdcdd7,
};

const DefaultDingoConfig = {
  base: {
    style: 0,
  },
  earLeft: {},
  earRight: {},
  maskLeft: {},
  maskRight: {},
};

const partToImg = {
  base: [dingoBase],
  earLeft: [dingoEarLeft],
  earRight: [dingoEarRight],
  maskLeft: [dingoMaskLeft0, dingoMaskLeft1],
  maskRight: [dingoMaskRight],
};

type DingoColor = keyof typeof colorToHex | null;
type DingoPart = keyof typeof partToImg;
type DingoPartStyle = number;

type DingoConfig = {
  [part in DingoPart]: {
    style?: DingoPartStyle;
    color?: DingoColor;
  };
};

function App() {
  const [dingoConfig, setDingoConfig] = useState<DingoConfig>(
    DefaultDingoConfig
  );
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

      <Configorator
        dingoConfig={dingoConfig}
        view={view}
        setDingoConfig={setDingoConfig}
        setView={setView}
      />
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
        let { color, style } = config[part as DingoPart];
        if (style === null || style === undefined) {
          return null;
        }
        let tint;
        if (color) {
          tint = colorToHex[color];
        }
        if (part === "base") {
          tint = 0xdddddd; // TODO default while trying to set colours
        }

        return (
          <Sprite
            key={`${part}-${color}-${style}`}
            width={W}
            height={H}
            image={partToImg[part as DingoPart][style]}
            // tint={colorToHex[color]}
            tint={tint || 0xaaaaaa} // TODO
          />
        );
      })}
    </React.Fragment>
  );
};

const color = {
  lightblue: "aliceblue",
  gray: "#ccc",
  yellow: "#fff9cd",
  red: "#ff0000",
};

const Configorator = ({
  dingoConfig,
  setView,
  setDingoConfig,
  view,
}: {
  dingoConfig: DingoConfig;
  setView: React.Dispatch<React.SetStateAction<string>>;
  setDingoConfig: React.Dispatch<React.SetStateAction<DingoConfig>>;
  view: string;
}) => {
  return (
    <div
      css={css`
        margin-top: 20px;
        display: flex;
        flex-direction: row;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: stretch;
          padding: 5px 0 10px 10px;
        `}
      >
        <ViewTitle name="body" setView={setView} currentView={view}>
          Body
        </ViewTitle>
        <ViewTitle name="earL" setView={setView} currentView={view}>
          Ear (left)
        </ViewTitle>
        <ViewTitle name="earR" setView={setView} currentView={view}>
          Ear (right)
        </ViewTitle>
        <ViewTitle name="maskL" setView={setView} currentView={view}>
          Mask (left)
        </ViewTitle>
        <ViewTitle name="maskR" setView={setView} currentView={view}>
          Mask (right)
        </ViewTitle>
        <ViewTitle name="eyes" setView={setView} currentView={view}>
          Eyes
        </ViewTitle>
        <ViewTitle name="eyebrows" setView={setView} currentView={view}>
          Eyebrows
        </ViewTitle>
        <ViewTitle name="chest" setView={setView} currentView={view}>
          Chest
        </ViewTitle>
        <ViewTitle name="speckles" setView={setView} currentView={view}>
          Speckles
        </ViewTitle>
      </div>
      <ConfigView
        dingoConfig={dingoConfig}
        view={view}
        setDingoConfig={setDingoConfig}
      />
    </div>
  );
};

const Option = ({
  img,
  dingoPart,
  dingoPartStyle,
  dingoConfig,
  setDingoConfig,
}: {
  img?: string;
  dingoPart: DingoPart;
  dingoPartStyle: DingoPartStyle | null;
  dingoConfig: DingoConfig;
  setDingoConfig: React.Dispatch<React.SetStateAction<DingoConfig>>;
}) => {
  return (
    <label
      css={css`
        margin: 5px;
      `}
    >
      <input
        css={css`
          /* HIDE RADIO */
          &[type="radio"] {
            position: absolute;
            opacity: 0;
            width: 0;
            height: 0;
          }

          /* IMAGE STYLES */
          &[type="radio"] + img,
          &[type="radio"] + div {
            cursor: pointer;
            filter: brightness(60%);
            outline: 2px solid ${color.gray};
          }

          /* CHECKED STYLES */
          &[type="radio"]:checked + img,
          &[type="radio"]:checked + div {
            outline: 2px solid ${color.red};
          }
        `}
        key={`${dingoPart}-${dingoPartStyle}`}
        type="radio"
        name={dingoPart}
        value={dingoPartStyle || "none"}
        defaultChecked={dingoConfig[dingoPart].style === dingoPartStyle}
        onChange={(e) => {
          setDingoConfig((prevState) => {
            const state: DingoConfig = { ...prevState };
            if (dingoPartStyle !== null) {
              state[dingoPart].style = dingoPartStyle;
            } else {
              state[dingoPart].style = undefined;
            }
            return state;
          });
        }}
      />
      {img ? (
        <img width={100} height={100} alt={dingoPart} src={img} />
      ) : (
        <div
          css={css`
            width: 100px;
            height: 100px;
            color: ${color.gray};
          `}
        >
          none
        </div>
      )}
    </label>
  );
};

// CSS filter generator to convert from black to target hex color
// https://codepen.io/sosuke/pen/Pjoqqp
const ConfigView = ({
  dingoConfig,
  view,
  setDingoConfig,
}: {
  dingoConfig: DingoConfig;
  view: string;
  setDingoConfig: React.Dispatch<React.SetStateAction<DingoConfig>>;
}) => {
  let View;
  switch (view) {
    case "body":
      View = (
        <React.Fragment>
          <Option
            dingoPart="base"
            dingoPartStyle={0}
            dingoConfig={dingoConfig}
            img={iconBody}
            setDingoConfig={setDingoConfig}
          />
        </React.Fragment>
      );
      break;
    case "earL":
      View = (
        <React.Fragment>
          <Option
            dingoConfig={dingoConfig}
            dingoPart="earLeft"
            dingoPartStyle={null}
            setDingoConfig={setDingoConfig}
          />
          <Option
            dingoConfig={dingoConfig}
            dingoPart="earLeft"
            dingoPartStyle={0}
            img={iconEarLeft}
            setDingoConfig={setDingoConfig}
          />
        </React.Fragment>
      );
      break;
    case "earR":
      View = (
        <React.Fragment>
          <Option
            dingoConfig={dingoConfig}
            dingoPart="earRight"
            dingoPartStyle={null}
            setDingoConfig={setDingoConfig}
          />
          <Option
            dingoConfig={dingoConfig}
            dingoPart="earRight"
            dingoPartStyle={0}
            img={iconEarRight}
            setDingoConfig={setDingoConfig}
          />
        </React.Fragment>
      );
      break;
    case "maskL":
      View = (
        <React.Fragment>
          <Option
            dingoConfig={dingoConfig}
            dingoPart="maskLeft"
            dingoPartStyle={null}
            setDingoConfig={setDingoConfig}
          />
          <Option
            dingoConfig={dingoConfig}
            dingoPart="maskLeft"
            dingoPartStyle={0}
            img={iconMaskLeft0}
            setDingoConfig={setDingoConfig}
          />
          <Option
            dingoConfig={dingoConfig}
            dingoPart="maskLeft"
            dingoPartStyle={1}
            img={iconMaskLeft1}
            setDingoConfig={setDingoConfig}
          />
        </React.Fragment>
      );
      break;
    case "maskR":
      View = (
        <React.Fragment>
          <Option
            dingoConfig={dingoConfig}
            dingoPart="maskRight"
            dingoPartStyle={null}
            setDingoConfig={setDingoConfig}
          />
          <Option
            dingoConfig={dingoConfig}
            dingoPart="maskRight"
            dingoPartStyle={0}
            img={iconMaskRight}
            setDingoConfig={setDingoConfig}
          />
        </React.Fragment>
      );
      break;

    default:
      View = <div>coming soon</div>;
  }
  return (
    <div
      css={css`
        border-left: 3px solid ${color.gray};
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 10px;
        width: 440px;
        flex: 1 1 auto;
      `}
    >
      {View}
    </div>
  );
};

const ViewTitle = ({
  children,
  currentView,
  name,
  setView,
}: {
  children: string;
  currentView: string;
  name: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const isActive = currentView === name;
  return (
    <ResetButton
      css={css`
        display: block;
        border-bottom: 2px solid #c6d9ea;
        text-align: left;
        padding: 10px 20px 0 5px;
        background: ${isActive ? color.yellow : "transparent"};

        &:hover {
          background: ${color.lightblue};
        }
      `}
      onClick={() => {
        setView(name);
      }}
    >
      {children}
    </ResetButton>
  );
};

const ResetButton = (props: any) => (
  <button
    css={css`
      /* RESET START */
      border: none;
      margin: 0;
      padding: 0;
      width: auto;
      overflow: visible;

      background: transparent;

      /* inherit font & color from ancestor */
      color: inherit;
      font: inherit;

      /* Normalize "line-height". Cannot be changed from "normal" in Firefox 4+. */
      line-height: normal;

      /* Corrects font smoothing for webkit */
      -webkit-font-smoothing: inherit;
      -moz-osx-font-smoothing: inherit;

      /* Corrects inability to style clickable "input" types in iOS */
      -webkit-appearance: none;

      /* RESET END */
    `}
    {...props}
  />
);

export default App;
