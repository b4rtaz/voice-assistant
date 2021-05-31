import * as vscode from 'vscode';

import { Container } from '../container';
import { DefinitionService } from '../definition/definition-service';
import { CommandRecognizedMessage } from '../messages';
import { buildVsCodeCommandArgs } from './vscode-command-args-builder';

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
		const args = buildVsCodeCommandArgs(command.action, command.args);
		if (args) {
			vscode.commands.executeCommand.apply(null, args);
		}
	}
}

export function handleCommandRecognizedFactory(container: Container) {
	return (message: CommandRecognizedMessage) => handleCommandRecognized(
		message,
		container.resolve<DefinitionService>('DefinitionService'));
}
