/*
 * @Author: TuWenxuan
 * @Date: 2024-06-12 14:51:48
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-06-14 10:43:54
 * @FilePath: /helloworld/src/extension.ts
 * @Description: 
 * 
 */
/*
 * @Author: TuWenxuan
 * @Date: 2024-06-12 14:51:48
 * @LastEditors: TuWenxuan
 * @LastEditTime: 2024-06-13 14:19:18
 * @FilePath: /helloworld/src/extension.ts
 * @Description: 
 * 
 */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { FuncNode, getFuncNode } from './functionNode.js';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello VS Code111');

		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			return;
		};

		const code = editor.document.getText();
		const index = editor.document.offsetAt(editor.selection.active);

		const funcNode: FuncNode | undefined = getFuncNode(code, index);

		if (!funcNode) {
			return;
		}

		editor.edit((editBuilder) => {
			editBuilder.delete(new vscode.Range(funcNode.start.line - 1, funcNode.start.column, funcNode.end.line - 1, funcNode.end.column));
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
