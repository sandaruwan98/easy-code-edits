// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Utility function that deletes text inside a block defined by an open and close character,
// using balanced matching logic.
function deleteInsideBlock(editor: vscode.TextEditor, document: vscode.TextDocument, pos: vscode.Position, open: string, close: string) {
    const text = document.getText();
    const offset = document.offsetAt(pos);
    let candidate: { open: number; close: number } | undefined = undefined;
    const stack: number[] = [];

    // Scan the text to match open and closing characters.
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === open) {
            stack.push(i);
        } else if (char === close) {
            if (stack.length > 0) {
                const openIndex = stack.pop()!;
                if (openIndex < offset && i > offset) {
                    // Choose the innermost block by checking for a later open character.
                    if (!candidate || openIndex > candidate.open) {
                        candidate = { open: openIndex, close: i };
                    }
                }
            }
        }
    }

    if (!candidate) {
        vscode.window.showErrorMessage(`No matching block found for '${open}' and '${close}'.`);
        return;
    }

    // Exclude the delimiters.
    const startPos = document.positionAt(candidate.open + 1);
    const endPos = document.positionAt(candidate.close);
    const range = new vscode.Range(startPos, endPos);

    editor.edit(editBuilder => {
        editBuilder.delete(range);
    });
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "easy-code-edits" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposableHello = vscode.commands.registerCommand('easy-code-edits.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Easy Code Edits!');
	});
	context.subscriptions.push(disposableHello);

	// Command for deleting inside parentheses (di() style)
	const disposableDeleteInParentheses = vscode.commands.registerCommand('easy-code-edits.deleteInsideParentheses', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
		const document = editor.document;
		const pos = editor.selection.active;
		
		deleteInsideBlock(editor, document, pos, '(', ')');
	});
	context.subscriptions.push(disposableDeleteInParentheses);
}

// This method is called when your extension is deactivated
export function deactivate() {}
