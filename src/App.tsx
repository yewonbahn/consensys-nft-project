/** @jsxImportSource @emotion/react */ // necessary for react17 and create-react-app https://github.com/emotion-js/emotion/issues/2041
import React, { useEffect, useState } from "react";
import { Sprite, Stage } from "@inlet/react-pixi";
import { css } from "@emotion/react/macro";
import { GithubPicker } from "react-color";
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

const dingoPalette = [
  0xdca779, // red
  0xf6dfa7, // cream
  0x6a6b87, // blue
  0xcdcdd7, // gray
] as const;

const dingoPaletteHex = dingoPalette.map((num) => numberToHex(num));

function numberToHex(number: number) {
  return `#${number.toString(16)}`;
}

function hexToNumber(hex: string): DingoColor {
  if (hex[0] !== "#") {
    throw new Error("hex should start with a #, ding dong");
  }
  const color = parseInt(hex.substring(1), 16);
  if (dingoPalette.includes(color as any)) {
    return color as DingoColor;
  }
  throw new Error("that wasn't a dingo color, ding dong");
}

const DefaultDingoConfig = {
  base: {
    style: 0,
  },
  earLeft: {},
  earRight: {},
  maskLeft: {},
  maskRight: {},
  eyes: {},
  eyebrows: {},
  chest: {},
  speckles: {},
};

const partToImg = {
  base: [dingoBase],
  earLeft: [dingoEarLeft],
  earRight: [dingoEarRight],
  maskLeft: [dingoMaskLeft0, dingoMaskLeft1],
  maskRight: [dingoMaskRight],
  eyes: [],
  eyebrows: [],
  chest: [],
  speckles: [],
};

type DingoColor = typeof dingoPalette[number] | null;
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
  const [view, setView] = useState<string>("base");

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
        return (
          <Sprite
            key={`${part}-${color}-${style}`}
            width={W}
            height={H}
            image={partToImg[part as DingoPart][style]}
            tint={color || 0xaaaaaa}
          />
        );
      })}
    </React.Fragment>
  );
};

const COLOR = {
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
          padding: 10px;
          background: beige;
        `}
      >
        <ViewTitle
          dingoPart="base"
          setView={setView}
          currentView={view}
          setDingoConfig={setDingoConfig}
          dingoConfig={dingoConfig}
        >
          Body
        </ViewTitle>
        <ViewTitle
          dingoPart="earLeft"
          setView={setView}
          currentView={view}
          setDingoConfig={setDingoConfig}
          dingoConfig={dingoConfig}
        >
          Ear (left)
        </ViewTitle>
        <ViewTitle
          dingoPart="earRight"
          setView={setView}
          currentView={view}
          setDingoConfig={setDingoConfig}
          dingoConfig={dingoConfig}
        >
          Ear (right)
        </ViewTitle>
        <ViewTitle
          dingoPart="maskLeft"
          setView={setView}
          currentView={view}
          setDingoConfig={setDingoConfig}
          dingoConfig={dingoConfig}
        >
          Mask (left)
        </ViewTitle>
        <ViewTitle
          dingoPart="maskRight"
          setView={setView}
          currentView={view}
          setDingoConfig={setDingoConfig}
          dingoConfig={dingoConfig}
        >
          Mask (right)
        </ViewTitle>
        <ViewTitle
          dingoPart="eyes"
          setView={setView}
          currentView={view}
          setDingoConfig={setDingoConfig}
          dingoConfig={dingoConfig}
        >
          Eyes
        </ViewTitle>
        <ViewTitle
          dingoPart="eyebrows"
          setView={setView}
          currentView={view}
          setDingoConfig={setDingoConfig}
          dingoConfig={dingoConfig}
        >
          Eyebrows
        </ViewTitle>
        <ViewTitle
          dingoPart="chest"
          setView={setView}
          currentView={view}
          setDingoConfig={setDingoConfig}
          dingoConfig={dingoConfig}
        >
          Chest
        </ViewTitle>
        <ViewTitle
          dingoPart="speckles"
          setView={setView}
          currentView={view}
          setDingoConfig={setDingoConfig}
          dingoConfig={dingoConfig}
        >
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
            outline: 2px solid ${COLOR.gray};
          }

          /* CHECKED STYLES */
          &[type="radio"]:checked + img,
          &[type="radio"]:checked + div {
            outline: 2px solid ${COLOR.red};
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
            color: ${COLOR.gray};
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
    case "base":
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
    case "earLeft":
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
    case "earRight":
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
    case "maskLeft":
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
    case "maskRight":
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
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 10px;
        width: 440px;
        flex: 1 1 auto;

        &:after {
          border-top: 1px solid red;
        }
      `}
    >
      {View}
    </div>
  );
};

const ViewTitle = ({
  children,
  currentView,
  dingoConfig,
  dingoPart,
  setView,
  setDingoConfig,
}: {
  children: string;
  currentView: string;
  dingoConfig: DingoConfig;
  dingoPart: DingoPart;
  setView: React.Dispatch<React.SetStateAction<string>>;
  setDingoConfig: React.Dispatch<React.SetStateAction<DingoConfig>>;
}) => {
  const isActive = currentView === dingoPart;
  return (
    <div
      css={css`
        flex: 1 1 auto;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid ${isActive ? COLOR.red : "transparent"};
      `}
    >
      <ResetButton
        css={css`
          display: block;
          text-align: left;
          padding: 5px 20px 5px 5px;
          flex: 1 1 auto;

          &:hover {
            background: ${COLOR.lightblue};
          }
          &:after {
            width: 100px;
            border-top: 1px solid blue;
          }
        `}
        onClick={() => {
          setView(dingoPart);
        }}
      >
        {children}
      </ResetButton>
      {dingoConfig[dingoPart].style !== null &&
      dingoConfig[dingoPart].style !== undefined ? (
        <ColorPicker
          color={dingoConfig[dingoPart].color || null}
          setColor={(newColor: DingoColor) => {
            setDingoConfig((prevState) => {
              const state: DingoConfig = { ...prevState };
              state[dingoPart].color = newColor;
              return state;
            });
          }}
        />
      ) : (
        <div
          css={css`
            width: ${ColorPickerSize}px;
          `}
        />
      )}
    </div>
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

const ColorPickerSize = 12;

const ColorPicker = ({
  color,
  setColor,
}: {
  color: DingoColor;
  setColor: (color: DingoColor) => void;
}) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);

  return (
    <div>
      <div
        css={css`
          padding: 3px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
          display: inline-block;
          cursor: pointer;
        `}
        onClick={() => {
          setShowPicker((prevState) => !prevState);
        }}
      >
        <div
          css={css`
            width: ${ColorPickerSize}px;
            height: ${ColorPickerSize}px;
            border-radius: 50%;
            background: ${color ? numberToHex(color) : "white"};
          `}
        ></div>
        {showPicker ? (
          <div
            css={css`
              position: absolute;
              z-index: 2;
            `}
            onClick={(e) => {
              e.stopPropagation();
              setShowPicker(false);
            }}
          >
            <div
              css={css`
                position: fixed;
                top: 0px;
                right: 0px;
                bottom: 0px;
                left: 0px;
              `}
            />
            <GithubPicker
              colors={dingoPaletteHex}
              onChange={(colorResult) => {
                setColor(hexToNumber(colorResult.hex));
                setShowPicker(false);
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

// const thing = () => (
//   <div>
//     <div
//       css={css`padding: 5px;
//           background: #fff;
//           borderRadius: 1px;
//           boxShadow: 0 0 0 1px rgba(0,0,0,.1);
//           display: inline-block;
//           cursor: pointer;`}
//       onClick={() => setShowPicker(true)}
//     >
//       <div css={css`width: '36px';
//           height: '14px';
//           borderRadius: '2px';
//           background: ${color ? color : "white"};`}
//       </div>
//     {showPicker ? (
//       <div css={css`
//               position: absolute;
//               zindex: 2;
//             `}>
//         <div
//               css={css`
//                 position: fixed;
//                 top: 0px;
//                 right: 0px;
//                 bottom: 0px;
//                 left: 0px;
//               `} onClick={() => setShowPicker(false)} />
//         <GithubPicker   onChange={(colorResult) => {
//                   setColor(hexToNumber(colorResult.hex));
//                   setShowPicker(false);
//                 }} />
//       </div>
//     ) : null}
//   </div>
// );

export default App;
