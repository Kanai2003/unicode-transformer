import { getStyle } from "./util";

/**
 * This function identifies all the styles present in the Unicoded string.
 *
 * @param {string} str - The Unicoded string.
 * @returns {string[]} - Array of styles present in the Unicoded string.
 */

export const identifyUnicode = (text: string): string[] => {
  if (text.length === 0) return ["None"];

  const uniqueStyles = new Set<string>();

  for (const char of text) {
    const style = getStyle(char);
    if (style === "BOLD_ITALIC") {
      uniqueStyles.add("BOLD");
      uniqueStyles.add("ITALIC");
    } else {
      uniqueStyles.add(style);
    }
  }

  return Array.from(uniqueStyles);
};
