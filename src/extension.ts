import * as vscode from 'vscode';

import { ClientConfigurationProvider } from './client/client-configuration-provider';
import { webSocketClientFactory } from './client/web-socket-client';
import { activateFactory } from './commands/activate';
import { addExampleJsonFactory } from './commands/add-example-json';
import { handleServerMessageFactory } from './commands/handle-server-message';
import { refreshDashboardFactory } from './commands/reload-dashboard';
import { reloadDefinitionFactory } from './commands/reload-definition';
import { Container } from './container';
import { definitionServiceFactory } from './definition/definition-service';
import { PathResolver } from './path-resolver';
import { dashboardFactory } from './views/dashboard';

export function activate(context: vscode.ExtensionContext) {
	const container = new Container();

	container.set('PathResolver', new PathResolver(context));
	container.set('ClientConfigurationProvider', new ClientConfigurationProvider());

	const dictionary = container.set('DefinitionService', definitionServiceFactory(container));
	const client = container.set('WebSocketClient', webSocketClientFactory(container));
	context.subscriptions.push(client);

	const dashboard = container.set('Dashboard', dashboardFactory(container));

	vscode.window.onDidChangeWindowState(activateFactory(container), context.subscriptions);
	vscode.window.registerTreeDataProvider('dashboard', dashboard);

	vscode.commands.registerCommand('voiceAssistant.reloadDefinition', reloadDefinitionFactory(container));
	vscode.commands.registerCommand('voiceAssistant.addExampleJson', addExampleJsonFactory(container));

	client.statusChanged(refreshDashboardFactory(container), null, context.subscriptions);
	client.statusChanged(activateFactory(container), null, context.subscriptions);
	client.messageReceived(handleServerMessageFactory(container), null, context.subscriptions);

	dictionary.statusChanged(refreshDashboardFactory(container), null, context.subscriptions);
	dictionary.statusChanged(activateFactory(container), null, context.subscriptions);

	client.connect();
	dictionary.tryLoad();
}

export function deactivate() {
	// nothing...
}
