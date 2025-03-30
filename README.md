# Easy Code Edits

Easy Code Edits is a Visual Studio Code extension that brings Vim‑like text object motions to VS Code. With simple keybindings, you can delete or select text inside various delimiters (parentheses, braces, brackets, quotes, and backticks) without needing to learn Vim.

## Features

- **Vim‑Style Motions:**  
  Executes commands like `di(` (delete inside parentheses), `di{`, `di"`, etc., making code editing fast and efficient for non‑Vim users as well.

- **Flexible Editing:**  
  Choose between deleting content or simply selecting it. For example, you can press `ctrl+'` to delete inside single quotes or `alt+'` to select inside parentheses single quotes.

- **Method Argument Deletion:**  
  Delete a single method argument within a parenthesized argument list with the command `easy-code-edits.deleteMethodArgument`. The extension intelligently removes the correct argument along with any surrounding commas.

- **Clipboard Integration:**  
  When deleting text, the removed content is automatically copied to the system clipboard, allowing easy retrieval if needed.



## Requirements

- Visual Studio Code version 1.75.1 or later.
- No additional dependencies are required.

## Commands & Keybindings

The following commands are available:

- **Delete Inside Parentheses:**  
  Command: `easy-code-edits.deleteInsideParentheses`  
  Keybinding: `ctrl+shift+9` --> i.e. equivalent to `ctrl+(`

- **Delete Inside Braces:**  
  Command: `easy-code-edits.deleteInsideBraces`  
  Keybinding: `ctrl+shift+[` --> i.e. equivalent to `ctrl+{`

- **Delete Inside Square Brackets:**  
  Command: `easy-code-edits.deleteInsideSquareBrackets`  
  Keybinding: `ctrl+[`

- **Delete Inside Double Quotes:**  
  Command: `easy-code-edits.deleteInsideDoubleQuotes`  
  Keybinding: `ctrl+shift+'` --> i.e. equivalent to `ctrl+"`

- **Delete Inside Single Quotes:**  
  Command: `easy-code-edits.deleteInsideSingleQuotes`  
  Keybinding: `ctrl+'`

- **Delete Inside Backticks:**  
  Command: `easy-code-edits.deleteInsideBackticks`  
  Keybinding: `` ctrl+` ``

- **Select Inside Parentheses:**  
  Command: `easy-code-edits.selectInsideParentheses`  
  Keybinding: `alt+shift+9` --> i.e. equivalent to `alt+(`

- **Select Inside Braces:**  
  Command: `easy-code-edits.selectInsideBraces`  
  Keybinding: `alt+shift+[` --> i.e. equivalent to `alt+{`

- **Select Inside Square Brackets:**  
  Command: `easy-code-edits.selectInsideSquareBrackets`  
  Keybinding: `alt+[`

- **Select Inside Double Quotes:**  
  Command: `easy-code-edits.selectInsideDoubleQuotes`  
  Keybinding: `alt+shift+'` --> i.e. equivalent to `alt+"`

- **Select Inside Single Quotes:**  
  Command: `easy-code-edits.selectInsideSingleQuotes`  
  Keybinding: `alt+'`

- **Select Inside Backticks:**  
  Command: `easy-code-edits.selectInsideBackticks`  
  Keybinding: `` alt+` ``

- **Delete Method Argument:**  
  Command: `easy-code-edits.deleteMethodArgument`  
  Keybinding: `ctrl+shift+m`

You can customize these keybindings via VS Code’s Keyboard Shortcuts (`File → Preferences → Keyboard Shortcuts`).

## Known Issues

- Edge-case handling for deeply nested or unbalanced delimiters may need improvement.
- Custom delimiters are not currently supported.


---

**Enjoy Easy Code Edits and happy coding!**
