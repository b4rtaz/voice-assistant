import * as vscode from 'vscode';

import { WebSocketClient, WebSocketClientStatus } from '../client/web-socket-client';
import { Container } from '../container';
import { SetCommandsMessage } from '../messages';
import { DefinitionService } from '../definition/definition-service';

export function reloadDefinition(definitionService: DefinitionService, client: WebSocketClient) {
	if (!definitionService.tryLoad() || !definitionService.definition) {
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
