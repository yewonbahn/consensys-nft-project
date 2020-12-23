/** @jsxImportSource @emotion/react */ // necessary for react17 and create-react-app https://github.com/emotion-js/emotion/issues/2041
import React, { useEffect, useState } from "react";
import { Sprite, Stage } from "@inlet/react-pixi";
import { css } from "@emotion/react/macro";
import { CirclePicker } from "react-color";

import { DingoColor, DingoConfig, DingoPart, DingoPartStyle } from "./types";
import { dingoPalette, partToImg } from "./const";
import { hexToNumber, numberToHex } from "./util";

import dingoLines from "./dingolines.png";

import iconBody from "./icon-body.png";
import iconEarLeft from "./icon-ear-left.png";
import iconEarRight from "./icon-ear-right.png";
import iconMaskLeft0 from "./icon-mask-left-0.png";
import iconMaskLeft1 from "./icon-mask-left-1.png";
import iconMaskRight from "./icon-mask-right.png";

const W = 600;
const H = 540;

const dingoPaletteHex = dingoPalette.map((num) => numberToHex(num));

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

function App() {
  const [dingoConfig, setDingoConfig] = useState<DingoConfig>(
    DefaultDingoConfig
  );
  const [view, setView] = useState<DingoPart>("base");

  useEffect(() => {}, [dingoConfig]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <h1>super dingo maker!</h1>
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
  purple: "#4e35aa",
};

const Configorator = ({
  dingoConfig,
  setView,
  setDingoConfig,
  view,
}: {
  dingoConfig: DingoConfig;
  setView: React.Dispatch<React.SetStateAction<DingoPart>>;
  setDingoConfig: React.Dispatch<React.SetStateAction<DingoConfig>>;
  view: DingoPart;
}) => {
  return (
    <div
      css={css`
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        align-items: stretch;
      `}
    >
      <div
        css={css`
          overflow: hidden; // for the rightside connector line
          display: flex;
          flex-direction: column;
          align-items: stretch;
          padding-right: 20px;
          border-right: 1px solid gray;
          margin-right: 5px;
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
            border: 2px solid ${COLOR.gray};
            border-radius: 5px;
          }

          /* CHECKED STYLES */
          &[type="radio"]:checked + img,
          &[type="radio"]:checked + div {
            border: 2px solid ${COLOR.red};
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
            border-radius: 5px;
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
  view: DingoPart;
  setDingoConfig: React.Dispatch<React.SetStateAction<DingoConfig>>;
}) => {
  const dingoPartStyle = dingoConfig[view].style;

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
        border: 1px solid gray;
      `}
    >
      <Header>Style</Header>
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
      {dingoPartStyle !== null && dingoPartStyle !== undefined && (
        <React.Fragment>
          <Header>Color</Header>
          <div
            css={css`
              padding: 10px;
            `}
          >
            <ColorPicker
              color={dingoConfig[view].color}
              setColor={(newColor: DingoColor) => {
                setDingoConfig((prevState) => {
                  const state: DingoConfig = { ...prevState };
                  state[view].color = newColor;
                  return state;
                });
              }}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const Header = (props: any) => {
  return (
    <h3
      css={css`
        overflow: hidden;

        font-weight: normal;
        display: flex;
        align-items: center;
        font-size: 1em;
        text-transform: lowercase;
        font-family: monospace;
        letter-spacing: 0.1em;

        &:after {
          content: "";
          display: inline-block;
          width: 100%;
          margin-right: -100%;
          border-top: 1px dashed gray;
        }
      `}
      {...props}
    >
      <span
        css={css`
          border: 1px solid gray;
          border-left: 0;
          padding: 3px 10px;
        `}
      >
        {props.children}
      </span>
    </h3>
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
  setView: React.Dispatch<React.SetStateAction<DingoPart>>;
  setDingoConfig: React.Dispatch<React.SetStateAction<DingoConfig>>;
}) => {
  const isActive = currentView === dingoPart;
  return (
    <div
      css={css`
        flex: 0 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #615584;
        border: 1px solid ${isActive ? COLOR.purple : "transparent"};

        &:after {
          ${isActive
            ? `
              content:"";
              display: inline-block;
              width: 100%;
              margin-right: -100%;
              border-top: 1px solid gray;
          `
            : null}
        }

        &:hover {
          background-color: #eceaf4;
        }
      `}
    >
      <ResetButton
        css={css`
          display: block;
          text-align: left;
          padding: 5px;
          width: 100%;
          flex: 1 1 auto;
        `}
        onClick={() => {
          setView(dingoPart);
        }}
      >
        {children}
      </ResetButton>
      {/* {dingoConfig[dingoPart].style !== null &&
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
            width: ${ColorPickerSize + ColorPickerMargin * 2}px;
          `}
        />
      )} */}
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

const ColorPicker = ({
  color,
  setColor,
}: {
  color?: DingoColor;
  setColor: (color: DingoColor) => void;
}) => {
  return (
    <CirclePicker
      color={color ? numberToHex(color) : undefined}
      colors={dingoPaletteHex}
      onChange={(colorResult) => {
        setColor(hexToNumber(colorResult.hex));
      }}
    />
  );
};

export default App;
