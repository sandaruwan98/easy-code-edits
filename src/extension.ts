import * as vscode from "vscode";

function transformInsideBlock(
  editor: vscode.TextEditor,
  document: vscode.TextDocument,
  pos: vscode.Position,
  open: string,
  close: string,
  action: "delete" | "select" = "delete"
) {
  const text = document.getText();
  const offset = document.offsetAt(pos);

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

  // Find the closest closing character after the cursor
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

  // Create positions that exclude the delimiters
  const startPos = document.positionAt(openIndex + 1);
  const endPos = document.positionAt(offset + closeIndexRelative);
  const range = new vscode.Range(startPos, endPos);

  if (action === "delete") {
    const textToCopy = document.getText(range);
    vscode.env.clipboard.writeText(textToCopy).then(() => {
      editor.edit(editBuilder => {
        editBuilder.delete(range);
      });
    });
  } else if (action === "select") {
    editor.selection = new vscode.Selection(startPos, endPos);
    editor.revealRange(range);
  }
}

function transformInsideQuotationMarks(
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
      editor.edit(editBuilder => {
        editBuilder.delete(range);
      });
    });
  } else if (action === "select") {
    editor.selection = new vscode.Selection(startPos, endPos);
    editor.revealRange(range);
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "easy-code-edits" is now active!'
  );

  // Command for deleting inside parentheses - di( style
  const disposableDeleteInParentheses = vscode.commands.registerCommand(
    "easy-code-edits.deleteInsideParentheses",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const document = editor.document;
      const pos = editor.selection.active;
      transformInsideBlock(editor, document, pos, "(", ")", "delete");
    }
  );

  // Command for selecting inside parentheses - vi( style
  const disposableSelectInParentheses = vscode.commands.registerCommand(
    "easy-code-edits.selectInsideParentheses",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const document = editor.document;
      const pos = editor.selection.active;
      transformInsideBlock(editor, document, pos, "(", ")", "select");
    }
  );

  // Command for deleting inside braces - di{ style
  const disposableDeleteInBraces = vscode.commands.registerCommand(
    "easy-code-edits.deleteInsideBraces",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const document = editor.document;
      const pos = editor.selection.active;
      transformInsideBlock(editor, document, pos, "{", "}", "delete");
    }
  );

  // Command for selecting inside braces - vi{ style
  const disposableSelectInBraces = vscode.commands.registerCommand(
    "easy-code-edits.selectInsideBraces",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const document = editor.document;
      const pos = editor.selection.active;
      transformInsideBlock(editor, document, pos, "{", "}", "select");
    }
  );

  // Command for deleting inside square brackets - di[ style
  const disposableDeleteInSquareBrackets = vscode.commands.registerCommand(
    "easy-code-edits.deleteInsideSquareBrackets",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const document = editor.document;
      const pos = editor.selection.active;
      transformInsideBlock(editor, document, pos, "[", "]", "delete");
    }
  );

  // Command for selecting inside square brackets - vi[ style
  const disposableSelectInSquareBrackets = vscode.commands.registerCommand(
    "easy-code-edits.selectInsideSquareBrackets",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const document = editor.document;
      const pos = editor.selection.active;
      transformInsideBlock(editor, document, pos, "[", "]", "select");
    }
  );

  // Command for deleting inside double quotes - di" style
  const disposableDeleteInDoubleQuotes = vscode.commands.registerCommand(
    "easy-code-edits.deleteInsideDoubleQuotes",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const document = editor.document;
      const pos = editor.selection.active;
      transformInsideQuotationMarks(editor, document, pos, '"', "delete");
    }
  );

  // Command for selecting inside double quotes - vi" style
  const disposableSelectInDoubleQuotes = vscode.commands.registerCommand(
    "easy-code-edits.selectInsideDoubleQuotes",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const document = editor.document;
      const pos = editor.selection.active;
      transformInsideQuotationMarks(editor, document, pos, '"', "select");
    }
  );

  // Command for deleting inside single quotes - di' style
  const disposableDeleteInSingleQuotes = vscode.commands.registerCommand(
    "easy-code-edits.deleteInsideSingleQuotes",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const document = editor.document;
      const pos = editor.selection.active;
      transformInsideQuotationMarks(editor, document, pos, "'", "delete");
    }
  );

  // Command for selecting inside single quotes - vi' style
  const disposableSelectInSingleQuotes = vscode.commands.registerCommand(
    "easy-code-edits.selectInsideSingleQuotes",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const document = editor.document;
      const pos = editor.selection.active;
      transformInsideQuotationMarks(editor, document, pos, "'", "select");
    }
  );

  // Command for deleting inside backticks - di` style
  const disposableDeleteInBackticks = vscode.commands.registerCommand(
    "easy-code-edits.deleteInsideBackticks",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const document = editor.document;
      const pos = editor.selection.active;
      transformInsideQuotationMarks(editor, document, pos, "`", "delete");
    }
  );

  // Command for selecting inside backticks - vi` style
  const disposableSelectInBackticks = vscode.commands.registerCommand(
    "easy-code-edits.selectInsideBackticks",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const document = editor.document;
      const pos = editor.selection.active;
      transformInsideQuotationMarks(editor, document, pos, "`", "select");
    }
  );

  context.subscriptions.push(disposableDeleteInParentheses);
  context.subscriptions.push(disposableSelectInParentheses);
  context.subscriptions.push(disposableDeleteInBraces);
  context.subscriptions.push(disposableSelectInBraces);
  context.subscriptions.push(disposableDeleteInSquareBrackets);
  context.subscriptions.push(disposableSelectInSquareBrackets);
  context.subscriptions.push(disposableDeleteInDoubleQuotes);
  context.subscriptions.push(disposableSelectInDoubleQuotes);
  context.subscriptions.push(disposableDeleteInSingleQuotes);
  context.subscriptions.push(disposableSelectInSingleQuotes);
  context.subscriptions.push(disposableDeleteInBackticks);
  context.subscriptions.push(disposableSelectInBackticks);
}

export function deactivate() {}
