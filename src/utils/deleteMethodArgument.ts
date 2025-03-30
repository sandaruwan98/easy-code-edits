import * as vscode from "vscode";

export default function deleteMethodArgument(
  editor: vscode.TextEditor,
  document: vscode.TextDocument,
  pos: vscode.Position
) {
  const text = document.getText();
  const cursorOffset = document.offsetAt(pos);

  // Find the opening parenthesis before the cursor.
  let openParen = -1;
  let stack: string[] = [];
  for (let i = cursorOffset - 1; i >= 0; i--) {
    const ch = text[i];
    if (ch === ')') {
      stack.push(")");
    } else if (ch === '(') {
      if (stack.length === 0) {
        openParen = i;
        break;
      } else {
        stack.pop();
      }
    }
  }
  if (openParen === -1) {
    vscode.window.showErrorMessage("Not inside a method argument.");
    return;
  }

  // Find the closing parenthesis after the cursor.
  stack = [];
  let closeParen = -1;
  for (let i = cursorOffset; i < text.length; i++) {
    const ch = text[i];
    if (ch === '(') {
      stack.push("(");
    } else if (ch === ')') {
      if (stack.length === 0) {
        closeParen = i;
        break;
      } else {
        stack.pop();
      }
    }
  }
  if (closeParen === -1) {
    vscode.window.showErrorMessage("Not inside a method argument.");
    return;
  }

  const argsContent = text.substring(openParen + 1, closeParen);
  const insideOffset = cursorOffset - (openParen + 1);

  // Find boundaries of the current argument.
  let startIndex = 0;
  let endIndex = argsContent.length;
  const commaBefore = argsContent.lastIndexOf(",", insideOffset - 1);
  if (commaBefore !== -1) {
    startIndex = commaBefore + 1;
  }
  const commaAfter = argsContent.indexOf(",", insideOffset);
  if (commaAfter !== -1) {
    endIndex = commaAfter;
  }

  // Trim possible surrounding spaces.
  while (startIndex < argsContent.length && argsContent[startIndex] === " ") {
    startIndex++;
  }
  while (endIndex > 0 && argsContent[endIndex - 1] === " ") {
    endIndex--;
  }

  // Decide deletion range. Remove redundant comma if needed.
  let deleteStartOffset: number;
  let deleteEndOffset: number;
  if (commaBefore !== -1 && commaAfter === -1) {
    // Last argument: remove preceding comma.
    deleteStartOffset = openParen + 1 + commaBefore;
    deleteEndOffset = openParen + 1 + endIndex;
  } else if (commaBefore === -1 && commaAfter !== -1) {
    // First argument: remove the argument plus the following comma.
    deleteStartOffset = openParen + 1 + startIndex;
    deleteEndOffset = openParen + 1 + commaAfter + 1; // +1 to remove comma.
  } else if (commaBefore !== -1 && commaAfter !== -1) {
    // Middle argument: remove preceding comma and the argument.
    deleteStartOffset = openParen + 1 + commaBefore;
    deleteEndOffset = openParen + 1 + commaAfter;
  } else {
    // Single argument: delete it.
    deleteStartOffset = openParen + 1 + startIndex;
    deleteEndOffset = openParen + 1 + endIndex;
  }

  const argStartPos = document.positionAt(deleteStartOffset);
  const argEndPos = document.positionAt(deleteEndOffset);
  const range = new vscode.Range(argStartPos, argEndPos);

  const textToCopy = document.getText(range);
  vscode.env.clipboard.writeText(textToCopy).then(() => {
    editor.edit(editBuilder => {
      editBuilder.delete(range);
    });
  });
}