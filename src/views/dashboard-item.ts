import { TreeItem } from 'vscode';

export abstract class DashboardItem extends TreeItem {
	abstract getChildren(): Promise<DashboardItem[]>;
}
