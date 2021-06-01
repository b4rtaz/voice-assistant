import * as vscode from 'vscode';

import { FileWriter } from './file-writer';

export class VscodeFileWriter implements FileWriter {

	public async writeToFirstWorkspace(fileName: string, content: string): Promise<void> {
		if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length < 1) {
			throw new Error('You need to open a folder or a workspace.');
		}

		const wsUri = vscode.workspace.workspaceFolders[0].uri;
		if (!vscode.workspace.fs.isWritableFileSystem(wsUri.scheme)) {
			throw new Error('The filesystem of your workspace is not writable.');
		}

		const uri = vscode.Uri.joinPath(wsUri, fileName);
		await vscode.workspace.fs.writeFile(uri, Buffer.from(content, 'utf-8'));
	}
}
