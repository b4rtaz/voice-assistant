import * as fs from 'fs';
import * as vscode from 'vscode';

import { Container } from '../container';
import { DEFINITION_FILE_NAME } from '../definition/definition';
import { FileWriter } from '../file-system/file-writer';
import { PathResolver } from '../path-resolver';
import { reloadDefinitionFactory } from './reload-definition';

export async function addExampleJson(
	pathResolver: PathResolver,
	workspaceFileWriter: FileWriter,
	reloadDefinition: () => void)
{
	const sourcePath = pathResolver.getExtensionPath('definitions/typescript.json');
	const content = fs.readFileSync(sourcePath, 'utf-8');

	try {
		await workspaceFileWriter.writeToFirstWorkspace(DEFINITION_FILE_NAME, content);
		vscode.window.showInformationMessage(`${DEFINITION_FILE_NAME} created.`);
		reloadDefinition();
	} catch (e) {
		const error = e.message ? e.message : e;
		vscode.window.showErrorMessage(`An error has occurred: ${error}.`);
	}
}

export function addExampleJsonFactory(container: Container) {
	return () => addExampleJson(
		container.resolve<PathResolver>('PathResolver'),
		container.resolve<FileWriter>('FileWriter'),
		reloadDefinitionFactory(container));
}
