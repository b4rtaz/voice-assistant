import * as vscode from 'vscode';

import { Container } from '../container';
import { DefinitionService } from '../definition/definition-service';
import { CommandRecognizedMessage } from '../messages';

export function handleCommandRecognized(
	message: CommandRecognizedMessage,
	definitionService: DefinitionService)
{
	if (!vscode.window.activeTextEditor || !vscode.window.state.focused) {
		return;
	}
	const editor = vscode.window.activeTextEditor;
	if (!editor.selection) {
		return;
	}
	const command = definitionService.definition?.commands.find(s => s.command == message.command);
	if (!command) {
		console.warn(`Unknown command: ${message.command}.`);
		return;
	}
	const fileName = editor.document.fileName.toLowerCase();
	if (command.ext && !command.ext.find(ext => fileName.endsWith(ext))) {
		return;
	}

	if (command.snippet !== undefined) {
		editor.insertSnippet(new vscode.SnippetString(command.snippet));
	} else if (command.action) {
		const vscc = extractVscCommand(command.action);
		if (vscc) {
			vscode.commands.executeCommand(vscc);
		} else {
			console.warn(`Not supported action: ${command.action}.`);
		}
	}
}

function extractVscCommand(action: string): string | null {
	if (action.startsWith('vsc-command:')) {
		return action.substring(12);
	}
	switch (action) {
		case 'undo':
			return 'undo';
		case 'copy':
			return 'editor.action.clipboardCopyAction';
		case 'cut':
			return 'editor.action.clipboardCutAction';
		case 'delete':
			return 'deleteLeft';
		case 'paste':
			return 'editor.action.clipboardPasteAction';
	}
	return null;
}

export function handleCommandRecognizedFactory(container: Container) {
	return (message: CommandRecognizedMessage) => handleCommandRecognized(
		message,
		container.resolve<DefinitionService>('DefinitionService'));
}
