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
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello VS Code111');
	});

	const editor = vscode.window.activeTextEditor;
	const code = `const read = ()=>{
		let str;

		while((str = readline()) != null){
			let len = str.length/2;
			let res = 0;
			for(let i = len - 1; i > 0; i--){
				let children = [];
				for(let j = i; j < str.length; j++){
					if(children.includes(str.slice(j - i, j + 1))){ 
						res = i;
						break;
					}
					else children.push(str.slice(j - i, j + 1))
				}
			}
			search(next, str);
		}
	}`;

	const art = parse(code);
	console.log(art);

	if (editor) {
		editor.edit((editBuilder) => {
			editBuilder.insert(new vscode.Position(0, 0), 'Hello World!');
			editBuilder.delete(new vscode.Range(0, 0, 1, 0));
		});
	}

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
