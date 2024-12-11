import { toStyledUnicode } from "./util";

/**
 * Converts a normal string to a unicoded styled string based on the provided style.
 *
 * @param {string} str - The Unicoded string to be converted.
 * @param {string} [style] - The style to be applied to the string. Possible values: 'BOLD', 'ITALIC', 'UNDERLINE', "CIRCLED", "FULLWIDTH", "FRAKTUR", "SCRIPT", "DOUBLE_STRUCK", "MONOSPACE", "SANS", "SANS_BOLD", "SANS_BOLD_ITALIC", "SANS_ITALIC", "PARENTHESIZED", "SQUARED", "SQUARED_NEG", "BOLD_ITALIC", "BOLD_ITALIC_UNDERLINE"
 * @returns {string} - Unicoded styled string.
 */

export const toUnicode = (str: string, style: string): string => {
    const styledStringArr = [];
    for (const char of str) {
      styledStringArr.push(toStyledUnicode(char, style));
    }
  
    return styledStringArr.join('');
  };