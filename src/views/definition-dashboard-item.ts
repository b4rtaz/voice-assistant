import { TreeItemCollapsibleState } from 'vscode';

import { Container } from '../container';
import { CommandDefinition, DEFINITION_FILE_NAME } from '../definition/definition';
import { DefinitionService, SnippetsDictionaryStatus } from '../definition/definition-service';
import { PathResolver } from '../path-resolver';
import { DashboardItem } from './dashboard-item';

export class DefinitionDashboardItem extends DashboardItem {

	public constructor(
		private readonly definitionService: DefinitionService,
		private readonly pathResolver: PathResolver) {
		super(createLabel(definitionService), TreeItemCollapsibleState.Expanded);

		switch (definitionService.status) {
			case SnippetsDictionaryStatus.notFound:
				this.iconPath = pathResolver.getExtensionPath('media/icon-failed.svg');
				this.description = `${DEFINITION_FILE_NAME} file not found in the workspace.`;
				this.contextValue = 'noDefinition';
				break;

			case SnippetsDictionaryStatus.loaded:
				this.iconPath = pathResolver.getExtensionPath('media/icon-success.svg');
				this.description = '';
				this.contextValue = 'definition';
				break;

			case SnippetsDictionaryStatus.error:
				this.iconPath = pathResolver.getExtensionPath('media/icon-failed.svg');
				this.description = `Error: ${definitionService.lastError}`;
				this.contextValue = 'noDefinition';
				break;
		}
	}

	public async getChildren(): Promise<DashboardItem[]> {
		return this.definitionService.definition
			? this.definitionService.definition.commands.map(s => new CommandDashboardItem(s, this.pathResolver))
			: [];
	}
}

function createLabel(ds: DefinitionService): string {
	return ds.status === SnippetsDictionaryStatus.loaded
		? `${ds.definition?.commands.length} commands`
		: 'Commands';
}

export class CommandDashboardItem extends DashboardItem {

	public constructor(
		snippet: CommandDefinition,
		pathResolver: PathResolver) {
		super(snippet.command, TreeItemCollapsibleState.None);

		this.tooltip = (snippet.snippet  !== undefined) ? `"${snippet.snippet}"` : snippet.action;
		this.description = snippet.ext
			? snippet.ext.join(', ')
			: '';
		this.iconPath = {
			dark: pathResolver.getExtensionPath('icon-mic-white.svg'),
			light: pathResolver.getExtensionPath('icon-mic-black.svg')
		};
	}

	public getChildren(): Promise<DashboardItem[]> {
		return Promise.resolve([]);
	}
}

export function definitionDashboardItemFactory(container: Container): DefinitionDashboardItem {
	return new DefinitionDashboardItem(
		container.resolve<DefinitionService>('DefinitionService'),
		container.resolve<PathResolver>('PathResolver'));
}
