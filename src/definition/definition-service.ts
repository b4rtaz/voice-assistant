import * as fs from 'fs';
import { EventEmitter } from 'vscode';

import { Container } from '../container';
import { PathResolver } from '../path-resolver';
import { Definition, DEFINITION_FILE_NAME } from './definition';
import { DefinitionParser } from './definition-parser';

export class DefinitionService {

	private readonly _statusChanged = new EventEmitter<void>();
	public readonly statusChanged = this._statusChanged.event;

	public status: SnippetsDictionaryStatus = SnippetsDictionaryStatus.notFound;
	public lastError: string | null = null;
	public definition: Definition | null = null;

	public constructor(
		private readonly pathResolver: PathResolver) {
	}

	public tryLoad(): boolean {
		const definitionPath = this.pathResolver.getWorkspacePath(DEFINITION_FILE_NAME);

		if (!fs.existsSync(definitionPath)) {
			this.lastError = null;
			this.definition = null;
			this.setStatus(SnippetsDictionaryStatus.notFound);
			return false;
		}
		try {
			const content = fs.readFileSync(definitionPath, 'utf-8');
			this.lastError = null;
			this.definition = DefinitionParser.read(content);
			this.setStatus(SnippetsDictionaryStatus.loaded);
			return true;
		}
		catch (e) {
			this.lastError = e.message ? e.message : e;
			this.definition = null;
			this.setStatus(SnippetsDictionaryStatus.error);
			return false;
		}
	}

	private setStatus(status: SnippetsDictionaryStatus) {
		this.status = status;
		this._statusChanged.fire();
	}
}

export enum SnippetsDictionaryStatus {
	notFound,
	loaded,
	error
}

export function definitionServiceFactory(container: Container) {
	return new DefinitionService(
		container.resolve<PathResolver>('PathResolver'));
}
