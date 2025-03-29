import * as assert from "assert";
import * as vscode from "vscode";

suite("Easy Code Edits Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("deleteInsideParentheses should remove content inside outer parentheses", async () => {
    const initialText = "(test1(test2)test3)";
    const doc = await vscode.workspace.openTextDocument({ content: initialText });
    const editor = await vscode.window.showTextDocument(doc);

    // Place the cursor somewhere inside.
    const pos = doc.positionAt(3);
    editor.selection = new vscode.Selection(pos, pos);

    await vscode.commands.executeCommand("easy-code-edits.deleteInsideParentheses");
    await new Promise(resolve => setTimeout(resolve, 500));

    const resultText = doc.getText();
    assert.strictEqual(resultText, "()");
  });

  test("selectInsideParentheses should select the whole content inside the matching outer parentheses", async () => {
    const initialText = "(hello(world)!)";
    const doc = await vscode.workspace.openTextDocument({ content: initialText });
    const editor = await vscode.window.showTextDocument(doc);

    const pos = doc.positionAt(2);
    editor.selection = new vscode.Selection(pos, pos);

    await vscode.commands.executeCommand("easy-code-edits.selectInsideParentheses");
    await new Promise(resolve => setTimeout(resolve, 500));

    const selection = editor.selection;
    const selectedText = doc.getText(selection);
    assert.strictEqual(selectedText, "hello(world)!");
  });
});
