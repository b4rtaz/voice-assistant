import * as vscode from 'vscode';

import { WebSocketClient, WebSocketClientStatus } from '../client/web-socket-client';
import { Container } from '../container';
import { DefinitionService } from '../definition/definition-service';
import { SetCommandsMessage } from '../messages';

export async function reloadDefinition(definitionService: DefinitionService, client: WebSocketClient) {
	if (!(await definitionService.tryLoad()) || !definitionService.definition) {
		vscode.window.showErrorMessage(`Cannot reload a definition. Error: ${definitionService.lastError}`);
		return;
	}

	if (client.status === WebSocketClientStatus.connected) {
		const message = {
			name: 'setCommands',
			commands: definitionService.definition.commands.map(s => s.command)
		} as SetCommandsMessage;

		client.send(message);
	}

	vscode.window.showInformationMessage('Commands just reloaded.');
}

export function reloadDefinitionFactory(container: Container) {
	return () => reloadDefinition(
		container.resolve<DefinitionService>('DefinitionService'),
		container.resolve<WebSocketClient>('WebSocketClient'));
}
