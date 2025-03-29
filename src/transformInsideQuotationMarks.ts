import * as vscode from "vscode";

export default function transformInsideQuotationMarks(
  editor: vscode.TextEditor,
  document: vscode.TextDocument,
  pos: vscode.Position,
  symbol: string,
  action: "delete" | "select" = "delete"
) {
  const text = document.getText();
  const offset = document.offsetAt(pos);

  // Find the closest opening character before the cursor
  const beforeText = text.substring(0, offset);
  const openIndex = beforeText.lastIndexOf(symbol);
  if (openIndex === -1) {
    vscode.window.showErrorMessage(`No preceding '${symbol}' found.`);
    return;
  }
  // Find the closest closing character after the cursor
  const afterText = text.substring(offset);
  const closeIndexRelative = afterText.indexOf(symbol);
  if (closeIndexRelative === -1) {
    vscode.window.showErrorMessage(`No following '${symbol}' found.`);
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
