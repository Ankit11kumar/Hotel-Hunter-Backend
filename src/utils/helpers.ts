import { ALLOWED_ORIGINS } from "./constants";

export const isISubstring = (str: string, subStr: string): boolean => {
  return str.toLowerCase().includes(subStr.toLowerCase());
};

export const corsOptions = {
  origin: function (
    origin: string,
    callback: (arg0?: Error | null, arg1?: boolean) => void
  ) {
    if (ALLOWED_ORIGINS.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export const findMatchingIndices = (str:string, substr:string) => {
  let startIndex = 0;
  let indices = [];

  while (startIndex < str.length && startIndex !== -1) {
    const index = str.toLowerCase().indexOf(substr.toLowerCase(), startIndex);
    if (index !== -1) {
      const endIndex = index + substr.length - 1;
      indices.push({ length: endIndex - index + 1, offset: index });
      startIndex = endIndex + 1;
    } else {
      break;
    }
  }
  return indices;
};