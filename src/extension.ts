import * as vscode from "vscode";
import transformInsideBlock from "./transtormInsideBlock";
import transformInsideQuotationMarks from "./transformInsideQuotationMarks";
import deleteMethodArgument from "./deleteMethodArgument";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "easy-code-edits" is now active!'
  );

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

  const disposableDeleteMethodArgument = vscode.commands.registerCommand(
    "easy-code-edits.deleteMethodArgument",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const document = editor.document;
      const pos = editor.selection.active;
      deleteMethodArgument(editor, document, pos);
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
  context.subscriptions.push(disposableDeleteMethodArgument);
}

export function deactivate() {}
