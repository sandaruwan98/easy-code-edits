
// function deleteInsideBlock(editor: vscode.TextEditor, document: vscode.TextDocument, pos: vscode.Position, open: string, close: string) {
//     const text = document.getText();
//     const offset = document.offsetAt(pos);

//     // Find the closest opening character before the cursor
//     const beforeText = text.substring(0, offset);
//     const openIndex = beforeText.lastIndexOf(open);
//     if (openIndex === -1) {
//         vscode.window.showErrorMessage(`No preceding '${open}' found.`);
//         return;
//     }
// // 
//     // Find the closest closing character after the cursor
//     const afterText = text.substring(offset);
//     const closeIndexRelative = afterText.indexOf(close);
//     if (closeIndexRelative === -1) {
//         vscode.window.showErrorMessage(`No following '${close}' found.`);
//         return;
//     }

//     // Create positions that exclude the delimiters
//     const startPos = document.positionAt(openIndex + 1);
//     const endPos = document.positionAt(offset + closeIndexRelative);
//     const range = new vscode.Range(startPos, endPos);

//     // Execute the deletion inside an edit
//     editor.edit(editBuilder => {
//         editBuilder.delete(range);
//     });
// }