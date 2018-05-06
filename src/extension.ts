'use strict';
import * as vscode from 'vscode';
import * as cb from 'clipboardy';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.escapeBracket', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;     // no oen text editor
        }

        // get selected text
        let selection = editor.selection;
        let text = editor.document.getText(selection);
        if (text.length == 0) {
            vscode.window.showInformationMessage('Please select HTML code to escape bracket.');
            return;
        }

        // escape bracket
        text = text.replace(/</g, '&lt;');
        text = text.replace(/>/g, '&gt;');

        // copy to clipboard
        cb.writeSync(text);
        vscode.window.showInformationMessage('Copy escaped text to clipboard!');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}