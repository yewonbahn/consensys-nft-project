import dingoBase from "./dingo-base.png";
import dingoEarLeft from "./dingo-ear-left.png";
import dingoEarRight from "./dingo-ear-right.png";
import dingoMaskLeft0 from "./dingo-mask-left-0.png";
import dingoMaskLeft1 from "./dingo-mask-left-1.png";
import dingoMaskRight from "./dingo-mask-right.png";

export const partToImg = {
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

export const dingoPalette = [
  0xdca779, // red
  0xf6dfa7, // cream
  0x6a6b87, // blue
  0xcdcdd7, // gray
] as const;
