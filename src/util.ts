import { DingoColor } from "./types";
import { dingoPalette } from "./const";

export function numberToHex(number: number) {
  return `#${number.toString(16)}`;
}

export function hexToNumber(hex: string): DingoColor {
  if (hex[0] !== "#") {
    throw new Error("hex should start with a #, ding dong");
  }
  const color = parseInt(hex.substring(1), 16);
  if (dingoPalette.includes(color as any)) {
    return color as DingoColor;
  }
  throw new Error("that wasn't a dingo color, ding dong");
}
