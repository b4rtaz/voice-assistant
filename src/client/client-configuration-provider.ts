import * as vscode from 'vscode';

import { WebSocketClientConfiguration, WebSocketClientConfigurationProvider } from './web-socket-client';

export class ClientConfigurationProvider implements WebSocketClientConfigurationProvider {

	public getConfiguration(): WebSocketClientConfiguration {
		const configuration = vscode.workspace.getConfiguration();
		return {
			host: configuration.get<string>('voiceSnippets.serverHost') as string,
			port: configuration.get<number>('voiceSnippets.serverPort') as number
		};
	}
}
