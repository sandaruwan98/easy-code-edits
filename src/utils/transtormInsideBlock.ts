import * as vscode from "vscode";

export default function transformInsideBlock(
  editor: vscode.TextEditor,
  document: vscode.TextDocument,
  pos: vscode.Position,
  open: string,
  close: string,
  action: "delete" | "select" = "delete"
) {
  const text = document.getText();
  const offset = document.offsetAt(pos);

  // Find the closest matching opening character before the cursor
  const beforeText = text.substring(0, offset);
  const stackBefore = [];
  let openIndex = -1;
  for (let i = beforeText.length - 1; i >= 0; i--) {
    if (beforeText[i] === close) {
      stackBefore.push(beforeText[i]);
    } else if (beforeText[i] === open) {
      if (stackBefore.length === 0) {
        openIndex = i;
        break;
      } else {
        stackBefore.pop();
      }
    }
  }

  if (openIndex === -1) {
    vscode.window.showErrorMessage(`No preceding '${open}' found.`);
    return;
  }

  // Find the closest matching closing character after the cursor
  const afterText = text.substring(offset);
  const stackAfter = [];
  let closeIndexRelative = -1;
  for (let i = 0; i < afterText.length; i++) {
    if (afterText[i] === open) {
      stackAfter.push(afterText[i]);
    } else if (afterText[i] === close) {
      if (stackAfter.length === 0) {
        closeIndexRelative = i;
        break;
      } else {
        stackAfter.pop();
      }
    }
  }
  if (closeIndexRelative === -1) {
    vscode.window.showErrorMessage(`No following '${close}' found.`);
    return;
  }

  const startPos = document.positionAt(openIndex + 1);
  const endPos = document.positionAt(offset + closeIndexRelative);
  const range = new vscode.Range(startPos, endPos);

  if (action === "delete") {
    const textToCopy = document.getText(range);
    vscode.env.clipboard.writeText(textToCopy).then(() => {
      editor.edit((editBuilder) => {
        editBuilder.delete(range);
      });
    });
  } else if (action === "select") {
    editor.selection = new vscode.Selection(startPos, endPos);
    editor.revealRange(range);
  }
}
