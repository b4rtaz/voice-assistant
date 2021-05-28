import * as fs from 'fs';
import * as vscode from 'vscode';

import { Container } from '../container';
import { DEFINITION_FILE_NAME } from '../definition/definition';
import { PathResolver } from '../path-resolver';
import { reloadDefinitionFactory } from './reload-definition';

export function addExampleJson(pathResolver: PathResolver, reloadDefinition: () => void) {
	const sourcePath = pathResolver.getExtensionPath('definitions/typescript.json');
	const targetPath = pathResolver.getWorkspacePath(DEFINITION_FILE_NAME);

	const content = fs.readFileSync(sourcePath, 'utf-8');
	fs.writeFileSync(targetPath, content);

	vscode.window.showInformationMessage(`${DEFINITION_FILE_NAME} created.`);
	reloadDefinition();
}

export function addExampleJsonFactory(container: Container) {
	return () => addExampleJson(
		container.resolve<PathResolver>('PathResolver'),
		reloadDefinitionFactory(container));
}
