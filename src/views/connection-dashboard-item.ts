import { TreeItemCollapsibleState } from 'vscode';

import { WebSocketClient, WebSocketClientStatus } from '../client/web-socket-client';
import { Container } from '../container';
import { PathResolver } from '../path-resolver';
import { DashboardItem } from './dashboard-item';

export class ConnectionDashboardItem extends DashboardItem {

	public constructor(client: WebSocketClient, pathResolver: PathResolver) {
		super(createLabel(client), TreeItemCollapsibleState.None);

		switch (client.status) {
			case WebSocketClientStatus.connecting:
				this.iconPath = pathResolver.getExtensionPath('media/icon-failed.svg');
				this.description = 'Connecting...';
				break;

			case WebSocketClientStatus.connected:
				this.iconPath = pathResolver.getExtensionPath('media/icon-success.svg');
				this.description = '';
				break;

			case WebSocketClientStatus.disconnected:
				this.iconPath = pathResolver.getExtensionPath('media/icon-failed.svg');
				this.description = client.lastError
					? `Error: ${client.lastError}`
					: '';
				break;
		}
	}

	public contextValue = 'connection';

	public getChildren(): Promise<DashboardItem[]> {
		return Promise.resolve([]);
	}
}

function createLabel(client: WebSocketClient): string {
	return client.status === WebSocketClientStatus.connected
		? 'Connected'
		: 'Not connected';
}

export function connectionDashboardItemFactory(container: Container): ConnectionDashboardItem {
	return new ConnectionDashboardItem(
		container.resolve<WebSocketClient>('WebSocketClient'),
		container.resolve<PathResolver>('PathResolver'));
}
