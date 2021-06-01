import * as vscode from 'vscode';

import { ActivateMessage } from '../messages';
import { WebSocketClient, WebSocketClientStatus } from '../client/web-socket-client';
import { Container } from '../container';
import { DefinitionService, DefinitionServiceStatus } from '../definition/definition-service';

export function activate(client: WebSocketClient, definitionService: DefinitionService) {
	if (!vscode.window.state.focused) {
		return;
	}
	if (client.status !== WebSocketClientStatus.connected) {
		return;
	}
	if (definitionService.status !== DefinitionServiceStatus.loaded) {
		return;
	}

	client.send({
		name: 'activate'
	} as ActivateMessage);
}

export function activateFactory(container: Container) {
	return () => activate(
		container.resolve<WebSocketClient>('WebSocketClient'),
		container.resolve<DefinitionService>('DefinitionService'));
}
