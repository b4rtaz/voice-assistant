import { Event, EventEmitter, ProviderResult, TreeDataProvider, TreeItem, TreeItemCollapsibleState } from 'vscode';

import { Container } from '../container';
import { connectionDashboardItemFactory } from './connection-dashboard-item';
import { DashboardItem } from './dashboard-item';
import { definitionDashboardItemFactory } from './definition-dashboard-item';

export class Dashboard implements TreeDataProvider<DashboardItem> {

	private _onDidChangeTreeData: EventEmitter<DashboardItem | undefined | void> = new EventEmitter<DashboardItem | undefined | void>();
	public onDidChangeTreeData?: Event<DashboardItem | null | undefined> | undefined = this._onDidChangeTreeData.event as any;

	public constructor(
		private readonly itemsFactory: () => DashboardItem[]) {
	}

	public getTreeItem(element: DashboardItem): TreeItem | Thenable<TreeItem> {
		return element;
	}

	public getChildren(element?: DashboardItem): ProviderResult<DashboardItem[]> {
		if (element && element.collapsibleState !== TreeItemCollapsibleState.None) {
			return element.getChildren();
		}
		return Promise.resolve(this.itemsFactory());
	}

	public refresh() {
		this._onDidChangeTreeData.fire();
	}
}

export function dashboardFactory(container: Container): Dashboard {
	return new Dashboard(() => {
		return [
			connectionDashboardItemFactory(container),
			definitionDashboardItemFactory(container)
		];
	});
}
