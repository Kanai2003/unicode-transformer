import { fromStyledUnicode } from "./util";

/**
 * Converts a Unicoded styled string to a normal string based on the provided style.
 *
 * @param {string} str - The Unicoded string to be converted.
 * @param {string} [style] - Optional(if you don't profide style then it will try to remove all the styles) - The style to be applied to the string. Possible values: 'BOLD', 'ITALIC', 'UNDERLINE', etc.
 * @returns {string} - Normal string.
 */
export const fromUnicode = (str: string, style?: string): string => {
  const styledStringArr = [];
  for (const char of str) {
    styledStringArr.push(fromStyledUnicode(char, style));
  }

  return styledStringArr.join("");
};
