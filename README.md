# unicode-transformer
NPM package to convert normal string to styled string and vice versa by unicode transformations.

## Installation

```sh
npm install unicode-transformer
```

## Usage
`toUnicode` : Converts a normal string to a unicoded styled string based on the provided style.
```
import { toUnicode } from 'unicode-transformer';


const styledString = toUnicode('Hello World', 'BOLD');

console.log(styledString);
```

`fromUnicode` : Converts a unicoded styled string to a normal string based on the provided style.
```sh
import { fromUnicode } from 'unicode-transformer';

const boldStringToNormalString = fromUnicode(styledString, 'BOLD');

console.log(boldStringToNormalString);

const normalString = fromUnicode(styledString);

console.log(normalString);

```

`identifyUnicode` : Identifies all the styles present in the unicoded string.
```sh
import { identifyUnicode } from 'unicode-transformer';

const styles = identifyUnicode(styledString);

console.log(styles);
```

`getStyle` : Identifies unicoded styles present in the provided character.

```sh
import { getStyle } from 'unicode-transformer';

const charStyles = getStyle('𝐇');

console.log(charStyles);
```


`fromStyledUnicode` : Converts a unicoded character to a normal character based on the provided style.

```sh
import { fromStyledUnicode } from 'unicode-transformer';

const normalCharFromBold = fromStyledUnicode('𝐇', 'BOLD');

console.log(normalCharFromBold);

const normalChar = fromStyledUnicode('𝐇');

console.log(normalChar);
```

`toStyledUnicode` : Converts a normal character to a unicoded styled string based on the provided style.

```sh
import { toStyledUnicode } from 'unicode-transformer';

const styledChar = toStyledUnicode('H', 'BOLD');

console.log(styledChar);
```

## Available Styles
The following styles can be applied:
- BOLD
- ITALIC
- UNDERLINE
- CIRCLED
- FULLWIDTH
- FRAKTUR
- SCRIPT
- DOUBLE_STRUCK
- MONOSPACE
- SANS
- SANS_BOLD
- SANS_BOLD_ITALIC
- SANS_ITALIC
- PARENTHESIZED
- SQUARED
- SQUARED_NEG
- BOLD_ITALIC
- BOLD_ITALIC_UNDERLINE

## License
This project is licensed under the MIT License.

## Contribution
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository(`https://github.com/Kanai2003/unicode-transformer`).
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (`git commit -m "Add some feature"`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.
Please ensure your code follows the project's coding standards.

Thank you for contributing! 