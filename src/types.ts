import { dingoPalette, partToImg } from "./const";

export type DingoColor = typeof dingoPalette[number] | null;
export type DingoPart = keyof typeof partToImg;
export type DingoPartStyle = number;

export type DingoConfig = {
  [part in DingoPart]: {
    style?: DingoPartStyle;
    color?: DingoColor;
  };
};
