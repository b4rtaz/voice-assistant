import * as vscode from 'vscode';

import { FileReader } from './file-reader';

export class VscodeFileReader implements FileReader {

	public async tryReadFromAnyWorkspace(fileName: string): Promise<string | null> {
		if (vscode.workspace.workspaceFolders) {
			for (const folder of vscode.workspace.workspaceFolders) {
				const fileUri = vscode.Uri.joinPath(folder.uri, fileName);
				try {
					await vscode.workspace.fs.stat(fileUri);
				} catch (e) {
					continue;
				}
				const bytes = await vscode.workspace.fs.readFile(fileUri);
				return bytes.toString();
			}
		}
		return null;
	}
}
