const boldOffset = 0x1d400 - 0x41;
const boldLowerOffset = 0x1d41a - 0x61;
const italicOffset = 0x1d434 - 0x41;
const italicLowerOffset = 0x1d44e - 0x61;
const underlineChar = "\u0332";
const strikeChar = "\u0336";
const circledOffset = 0x24b6 - 0x41;
const circledLowerOffset = 0x24d0 - 0x61;
const fullwidthOffset = 0xff21 - 0x41;
const fullwidthLowerOffset = 0xff41 - 0x61;
const frakturOffset = 0x1d56c - 0x41;
const frakturLowerOffset = 0x1d586 - 0x61;
const scriptOffset = 0x1d49c - 0x41;
const scriptLowerOffset = 0x1d4b6 - 0x61;
const doubleStruckOffset = 0x1d538 - 0x41;
const doubleStruckLowerOffset = 0x1d552 - 0x61;
const parenthesizedOffset = 0x249c - 0x61;
const parenthesizedUpperOffset = 0x1f110 - 0x41;
const squaredOffset = 0x1f130 - 0x41;
const squaredNegOffset = 0x1f170 - 0x41;
const boldItalicOffset = 0x1d468 - 0x41;
const boldItalicLowerOffset = 0x1d482 - 0x61;

export const unicodeStyleRanges = [
  { range: [0x1d400, 0x1d433], style: "BOLD" },
  { range: [0x1d434, 0x1d467], style: "ITALIC" },
  { range: [0x24b6, 0x24e9], style: "CIRCLED" },
  { range: [0xff21, 0xff5a], style: "FULLWIDTH" },
  { range: [0x1d56c, 0x1d59f], style: "FRAKTUR" },
  { range: [0x1d49c, 0x1d4cf], style: "SCRIPT" },
  { range: [0x1d538, 0x1d56b], style: "DOUBLE_STRUCK" },
  { range: [0x1d670, 0x1d6a3], style: "MONOSPACE" },
  { range: [0x1d5a0, 0x1d5d3], style: "SANS" },
  { range: [0x1d5d4, 0x1d607], style: "SANS_BOLD" },
  { range: [0x1d63c, 0x1d66f], style: "SANS_BOLD_ITALIC" },
  { range: [0x1d608, 0x1d63b], style: "SANS_ITALIC" },
  { range: [0x249c, 0x24b5], style: "PARENTHESIZED" },
  { range: [0x1f110, 0x1f129], style: "PARENTHESIZED" },
  { range: [0x1f130, 0x1f169], style: "SQUARED" },
  { range: [0x1f170, 0x1f189], style: "SQUARED_NEG" },
  { range: [0x1d468, 0x1d49b], style: "BOLD_ITALIC" },
];

/**
 * This function identifies unicoded styles present in the provided character.
 *
 * @param {string} char - The Unicoded string.
 * @returns {string[]} - Array of styles present in the Unicoded string.
 */
export const getStyle = (char: string): string => {
  if (char.length === 0 || char.length > 1) return char;
  const code = char.codePointAt(0);
  if (!code) return "Unknown style";

  // Check for specific character-based styles (e.g., underline, strikethrough)
  if (char.includes(underlineChar)) return "UNDERLINE";
  if (char.includes(strikeChar)) return "STRIKETHROUGH";

  // Match the Unicode code point to a style range
  for (const { range, style } of unicodeStyleRanges) {
    if (code >= range[0] && code <= range[1]) return style;
  }

  return "Unknown style";
};

/**
 * Converts a Unicoded character to a normal char based on the provided style.
 *
 * @param {string} char - The Unicoded character to be converted.
 * @param {string} [style] - Optional(if you don't profide style then it will try to remove all the styles) - The style to be applied to the char. Possible values: 'BOLD', 'ITALIC', 'UNDERLINE', etc.
 * @returns {string} - Normal character.
 */
export const fromStyledUnicode = (char: string, style?: string) => {
  if (char.length === 0 || char.length > 1) return char;
  const code = char.codePointAt(0);
  if (!code) return char;

  if (style) {
    if (style === "BOLD") {
      if (code >= 0x1d400 && code <= 0x1d419) {
        return String.fromCodePoint(code - 0x1d400 + 0x41);
      }
      if (code >= 0x1d41a && code <= 0x1d433) {
        return String.fromCodePoint(code - 0x1d41a + 0x61);
      }
    }

    if (style === "ITALIC") {
      if (code >= 0x1d434 && code <= 0x1d44d) {
        return String.fromCodePoint(code - 0x1d434 + 0x41); // 'A' to 'Z'
      }
      if (code >= 0x1d44e && code <= 0x1d467) {
        return String.fromCodePoint(code - 0x1d44e + 0x61); // 'a' to 'z'
      }
    }
    if (style === "UNDERLINE") {
      if (char.includes(underlineChar)) return char.replace(underlineChar, "");
    }

    if (style === "BOLD_ITALIC") {
      if (code >= 0x1d468 && code <= 0x1d481)
        return String.fromCodePoint(code - boldItalicOffset);
      if (code >= 0x1d482 && code <= 0x1d49b)
        return String.fromCodePoint(code - boldItalicLowerOffset);
    }
    if (style === "BOLD_UNDERLINE") {
      if (code >= 0x1d400 && code <= 0x1d419)
        return String.fromCodePoint(code - boldOffset);
      if (code >= 0x1d41a && code <= 0x1d433)
        return String.fromCodePoint(code - boldLowerOffset);
      if (char.includes(underlineChar)) return char.replace(underlineChar, "");
    }
    if (style === "ITALIC_UNDERLINE") {
      if (code >= 0x1d434 && code <= 0x1d44d)
        return String.fromCodePoint(code - italicOffset);
      if (code >= 0x1d44e && code <= 0x1d467)
        return String.fromCodePoint(code - italicLowerOffset);
      if (char.includes(underlineChar)) return char.replace(underlineChar, "");
    }
    if (style === "BOLD_ITALIC_UNDERLINE") {
      if (code >= 0x1d468 && code <= 0x1d481)
        return String.fromCodePoint(code - boldItalicOffset);
      if (code >= 0x1d482 && code <= 0x1d49b)
        return String.fromCodePoint(code - boldItalicLowerOffset);
      if (char.includes(underlineChar)) return char.replace(underlineChar, "");
    }

    if (style === "STRIKETHROUGH") {
      if (char.includes(strikeChar)) return char.replace(strikeChar, "");
    }

    if (style === "CIRCLED") {
      if (code >= 0x24b6 && code <= 0x24cf)
        return String.fromCodePoint(code - circledOffset);
      if (code >= 0x24d0 && code <= 0x24e9)
        return String.fromCodePoint(code - circledLowerOffset);
    }

    if (style === "FULLWIDTH") {
      if (code >= 0xff21 && code <= 0xff3a)
        return String.fromCodePoint(code - fullwidthOffset);
      if (code >= 0xff41 && code <= 0xff5a)
        return String.fromCodePoint(code - fullwidthLowerOffset);
    }

    if (style === "FRAKTUR") {
      if (code >= 0x1d56c && code <= 0x1d585)
        return String.fromCodePoint(code - frakturOffset);
      if (code >= 0x1d586 && code <= 0x1d59f)
        return String.fromCodePoint(code - frakturLowerOffset);
    }

    if (style === "SCRIPT") {
      if (code >= 0x1d49c && code <= 0x1d4b5)
        return String.fromCodePoint(code - scriptOffset);
      if (code >= 0x1d4b6 && code <= 0x1d4cf)
        return String.fromCodePoint(code - scriptLowerOffset);
    }

    if (style === "DOUBLE_STRUCK") {
      if (code >= 0x1d538 && code <= 0x1d551)
        return String.fromCodePoint(code - doubleStruckOffset);
      if (code >= 0x1d552 && code <= 0x1d56b)
        return String.fromCodePoint(code - doubleStruckLowerOffset);
    }

    if (style === "MONOSPACE") {
      const monospaceOffset = 0x1d670 - 0x41;
      const monospaceLowerOffset = 0x1d68a - 0x61;
      if (code >= 0x1d670 && code <= 0x1d689)
        return String.fromCodePoint(code - monospaceOffset);
      if (code >= 0x1d68a && code <= 0x1d6a3)
        return String.fromCodePoint(code - monospaceLowerOffset);
    }

    if (style === "SANS") {
      const sansOffset = 0x1d5a0 - 0x41;
      const sansLowerOffset = 0x1d5ba - 0x61;
      if (code >= 0x1d5a0 && code <= 0x1d5b9)
        return String.fromCodePoint(code - sansOffset);
      if (code >= 0x1d5ba && code <= 0x1d5d3)
        return String.fromCodePoint(code - sansLowerOffset);
    }

    if (style === "SANS_BOLD") {
      const sansBoldOffset = 0x1d5d4 - 0x41;
      const sansBoldLowerOffset = 0x1d5ee - 0x61;
      if (code >= 0x1d5d4 && code <= 0x1d5ed)
        return String.fromCodePoint(code - sansBoldOffset);
      if (code >= 0x1d5ee && code <= 0x1d607)
        return String.fromCodePoint(code - sansBoldLowerOffset);
    }

    if (style === "SANS_BOLD_ITALIC") {
      const sansBoldItalicOffset = 0x1d63c - 0x41;
      const sansBoldItalicLowerOffset = 0x1d656 - 0x61;
      if (code >= 0x1d63c && code <= 0x1d655)
        return String.fromCodePoint(code - sansBoldItalicOffset);
      if (code >= 0x1d656 && code <= 0x1d66f)
        return String.fromCodePoint(code - sansBoldItalicLowerOffset);
    }

    if (style === "SANS_ITALIC") {
      const sansItalicOffset = 0x1d608 - 0x41;
      const sansItalicLowerOffset = 0x1d622 - 0x61;
      if (code >= 0x1d608 && code <= 0x1d621)
        return String.fromCodePoint(code - sansItalicOffset);
      if (code >= 0x1d622 && code <= 0x1d63b)
        return String.fromCodePoint(code - sansItalicLowerOffset);
    }

    if (style === "PARENTHESIZED") {
      if (code >= 0x1f110 && code <= 0x1f129)
        return String.fromCodePoint(code - parenthesizedUpperOffset);
      if (code >= 0x249c && code <= 0x24b5)
        return String.fromCodePoint(code - parenthesizedOffset);
    }

    if (style === "SQUARED") {
      if (code >= 0x1f130 && code <= 0x1f149)
        return String.fromCodePoint(code - squaredOffset);
    }

    if (style === "SQUARED_NEG") {
      if (code >= 0x1f170 && code <= 0x1f189)
        return String.fromCodePoint(code - squaredNegOffset);
    }

    return char;
  } else {
    // Remove all styles and convert to normal string
    if (code >= 0x1d400 && code <= 0x1d419)
      return String.fromCodePoint(code - boldOffset);
    if (code >= 0x1d41a && code <= 0x1d433)
      return String.fromCodePoint(code - boldLowerOffset);
    if (code >= 0x1d434 && code <= 0x1d44d)
      return String.fromCodePoint(code - italicOffset);
    if (code >= 0x1d44e && code <= 0x1d467)
      return String.fromCodePoint(code - italicLowerOffset);
    if (char.includes(underlineChar)) return char.replace(underlineChar, "");
    if (code >= 0x1d468 && code <= 0x1d481)
      return String.fromCodePoint(code - boldItalicOffset);
    if (code >= 0x1d482 && code <= 0x1d49b)
      return String.fromCodePoint(code - 0x1d482 + 0x61);
    if (char.includes(strikeChar)) return char.replace(strikeChar, "");
    if (code >= 0x24b6 && code <= 0x24cf)
      return String.fromCodePoint(code - circledOffset);
    if (code >= 0x24d0 && code <= 0x24e9)
      return String.fromCodePoint(code - circledLowerOffset);
    if (code >= 0xff21 && code <= 0xff3a)
      return String.fromCodePoint(code - fullwidthOffset);
    if (code >= 0xff41 && code <= 0xff5a)
      return String.fromCodePoint(code - fullwidthLowerOffset);
    if (code >= 0x1d56c && code <= 0x1d585)
      return String.fromCodePoint(code - frakturOffset);
    if (code >= 0x1d586 && code <= 0x1d59f)
      return String.fromCodePoint(code - frakturLowerOffset);
    if (code >= 0x1d49c && code <= 0x1d4b5)
      return String.fromCodePoint(code - scriptOffset);
    if (code >= 0x1d4b6 && code <= 0x1d4cf)
      return String.fromCodePoint(code - scriptLowerOffset);
    if (code >= 0x1d538 && code <= 0x1d551)
      return String.fromCodePoint(code - doubleStruckOffset);
    if (code >= 0x1d552 && code <= 0x1d56b)
      return String.fromCodePoint(code - doubleStruckLowerOffset);
    if (code >= 0x1d670 && code <= 0x1d689)
      return String.fromCodePoint(code - 0x1d670 + 0x41);
    if (code >= 0x1d68a && code <= 0x1d6a3)
      return String.fromCodePoint(code - 0x1d68a + 0x61);
    if (code >= 0x1d5a0 && code <= 0x1d5b9)
      return String.fromCodePoint(code - 0x1d5a0 + 0x41);
    if (code >= 0x1d5ba && code <= 0x1d5d3)
      return String.fromCodePoint(code - 0x1d5ba + 0x61);
    if (code >= 0x1d5d4 && code <= 0x1d5ed)
      return String.fromCodePoint(code - 0x1d5d4 + 0x41);
    if (code >= 0x1d5ee && code <= 0x1d607)
      return String.fromCodePoint(code - 0x1d5ee + 0x61);
    if (code >= 0x1d63c && code <= 0x1d655)
      return String.fromCodePoint(code - 0x1d63c + 0x41);
    if (code >= 0x1d656 && code <= 0x1d66f)
      return String.fromCodePoint(code - 0x1d656 + 0x61);
    if (code >= 0x1d608 && code <= 0x1d621)
      return String.fromCodePoint(code - 0x1d608 + 0x41);
    if (code >= 0x1d622 && code <= 0x1d63b)
      return String.fromCodePoint(code - 0x1d622 + 0x61);
    if (code >= 0x249c && code <= 0x24b5)
      return String.fromCodePoint(code - parenthesizedOffset);
    if (code >= 0x1f110 && code <= 0x1f129)
      return String.fromCodePoint(code - parenthesizedUpperOffset);
    if (code >= 0x1f130 && code <= 0x1f149)
      return String.fromCodePoint(code - squaredOffset);
    // if (code >= 0x1f150 && code <= 0x1f169) return String.fromCodePoint(code - squaredLowerOffset);
    if (code >= 0x1f170 && code <= 0x1f189)
      return String.fromCodePoint(code - squaredNegOffset);

    return char;
  }
};

/**
 * Converts a normal string to a unicoded styled string based on the provided style.
 *
 * @param {string} str - The Unicoded string to be converted.
 * @param {string} [style] - The style to be applied to the string. Possible values: 'BOLD', 'ITALIC', 'UNDERLINE', "CIRCLED", "FULLWIDTH", "FRAKTUR", "SCRIPT", "DOUBLE_STRUCK", "MONOSPACE", "SANS", "SANS_BOLD", "SANS_BOLD_ITALIC", "SANS_ITALIC", "PARENTHESIZED", "SQUARED", "SQUARED_NEG", "BOLD_ITALIC", "BOLD_ITALIC_UNDERLINE"
 * @returns {string} - Unicoded styled string.
 */
export const toStyledUnicode = (char: string, style: string) => {
  if (char.length === 0 || char.length > 1) return char;
  const code = char.codePointAt(0);
  if (!code) return char;

  if (style === "BOLD") {
    if (char >= "A" && char <= "Z")
      return String.fromCodePoint(code + boldOffset);
    if (char >= "a" && char <= "z")
      return String.fromCodePoint(code + boldLowerOffset);
    return char;
  }

  if (style === "ITALIC") {
    if (char >= "A" && char <= "Z")
      return String.fromCodePoint(code + italicOffset);
    if (char >= "a" && char <= "z")
      return String.fromCodePoint(code + italicLowerOffset);
    return char;
  }

  if (style === "UNDERLINE") {
    return char + underlineChar;
  }

  if (style === "BOLD_ITALIC") {
    if (char >= "A" && char <= "Z")
      return String.fromCodePoint(code + boldItalicOffset);
    if (char >= "a" && char <= "z")
      return String.fromCodePoint(code + boldItalicLowerOffset);
    return char;
  }

  if (style === "BOLD_UNDERLINE") {
    if (char >= "A" && char <= "Z")
      return String.fromCodePoint(code + boldOffset) + underlineChar;
    if (char >= "a" && char <= "z")
      return String.fromCodePoint(code + boldLowerOffset) + underlineChar;
    return char + underlineChar;
  }

  if (style === "ITALIC_UNDERLINE") {
    if (char >= "A" && char <= "Z")
      return String.fromCodePoint(code + italicOffset) + underlineChar;
    if (char >= "a" && char <= "z")
      return String.fromCodePoint(code + italicLowerOffset) + underlineChar;
    return char + underlineChar;
  }

  if (style === "BOLD_ITALIC_UNDERLINE") {
    if (char >= "A" && char <= "Z")
      return String.fromCodePoint(code + boldItalicOffset) + underlineChar;
    if (char >= "a" && char <= "z")
      return String.fromCodePoint(code + boldItalicLowerOffset) + underlineChar;
    return char + underlineChar;
  }

  if (style === "STRIKETHROUGH") {
    return char + strikeChar;
  }

  if (style === "CIRCLED") {
    if (char >= "A" && char <= "Z")
      return String.fromCodePoint(code + circledOffset);
    if (char >= "a" && char <= "z")
      return String.fromCodePoint(code + circledLowerOffset);
    return char;
  }

  if (style === "FULLWIDTH") {
    if (char >= "A" && char <= "Z")
      return String.fromCodePoint(code + fullwidthOffset);
    if (char >= "a" && char <= "z")
      return String.fromCodePoint(code + fullwidthLowerOffset);
    return char;
  }

  if (style === "FRAKTUR") {
    if (char >= "A" && char <= "Z")
      return String.fromCodePoint(code + frakturOffset);
    if (char >= "a" && char <= "z")
      return String.fromCodePoint(code + frakturLowerOffset);
    return char;
  }

  if (style === "SCRIPT") {
    if (char >= "A" && char <= "Z")
      return String.fromCodePoint(code + scriptOffset);
    if (char >= "a" && char <= "z")
      return String.fromCodePoint(code + scriptLowerOffset);
    return char;
  }

  if (style === "DOUBLE_STRUCK") {
    if (char >= "A" && char <= "Z")
      return String.fromCodePoint(code + doubleStruckOffset);
    if (char >= "a" && char <= "z")
      return String.fromCodePoint(code + doubleStruckLowerOffset);
    return char;
  }

  if (style === "MONOSPACE") {
    const monospaceOffset = 0x1d670 - 0x41;
    const monospaceLowerOffset = 0x1d68a - 0x61;
    if (char >= "A" && char <= "Z")
      return String.fromCodePoint(code + monospaceOffset);
    if (char >= "a" && char <= "z")
      return String.fromCodePoint(code + monospaceLowerOffset);
    return char;
  }

  if (style === "SANS") {
    const sansOffset = 0x1d5a0 - 0x41;
    const sansLowerOffset = 0x1d5ba - 0x61;
    if (char >= "A" && char <= "Z")
      return String.fromCodePoint(code + sansOffset);
    if (char >= "a" && char <= "z")
      return String.fromCodePoint(code + sansLowerOffset);
    return char;
  }

  if (style === "SANS_BOLD") {
    const sansBoldOffset = 0x1d5d4 - 0x41;
    const sansBoldLowerOffset = 0x1d5ee - 0x61;
    if (char >= "A" && char <= "Z")
      return String.fromCodePoint(code + sansBoldOffset);
    if (char >= "a" && char <= "z")
      return String.fromCodePoint(code + sansBoldLowerOffset);
    return char;
  }

  if (style === "SANS_BOLD_ITALIC") {
    const sansBoldItalicOffset = 0x1d63c - 0x41;
    const sansBoldItalicLowerOffset = 0x1d656 - 0x61;
    if (char >= "A" && char <= "Z")
      return String.fromCodePoint(code + sansBoldItalicOffset);
    if (char >= "a" && char <= "z")
      return String.fromCodePoint(code + sansBoldItalicLowerOffset);
    return char;
  }

  if (style === "SANS_ITALIC") {
    const sansItalicOffset = 0x1d608 - 0x41;
    const sansItalicLowerOffset = 0x1d622 - 0x61;
    if (char >= "A" && char <= "Z")
      return String.fromCodePoint(code + sansItalicOffset);
    if (char >= "a" && char <= "z")
      return String.fromCodePoint(code + sansItalicLowerOffset);
    return char;
  }

  if (style === "PARENTHESIZED") {
    if (char >= "A" && char <= "Z")
      return String.fromCodePoint(code + parenthesizedUpperOffset);
    if (char >= "a" && char <= "z")
      return String.fromCodePoint(code + parenthesizedOffset);
    return char;
  }

  if (style === "SQUARED") {
    if (char >= "a" && char <= "z") char = char.toUpperCase();
    if (char >= "A" && char <= "Z")
      return String.fromCodePoint(char.charCodeAt(0) + squaredOffset);
    return char;
  }

  if (style === "SQUARED_NEG") {
    const squaredNegOffset = 0x1f170 - 0x41;
    if (char >= "a" && char <= "z") char = char.toUpperCase();
    if (char >= "A" && char <= "Z")
      return String.fromCodePoint(char.charCodeAt(0) + squaredNegOffset);
    return char;
  }

  return char;
};
