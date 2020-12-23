import { useState } from "react";
import { css } from "@emotion/react/macro";
import { GithubPicker } from "react-color";

import { DingoColor } from "./types";
import { numberToHex, hexToNumber } from "./util";

const ColorPickerSize = 12;
const ColorPickerMargin = 3;

export const PopupColorPicker = ({
  color,
  colors,
  setColor,
}: {
  color: DingoColor;
  colors: string[];
  setColor: (color: DingoColor) => void;
}) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);

  return (
    <div>
      <div
        css={css`
          padding: ${ColorPickerMargin}px;
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
              colors={colors}
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
