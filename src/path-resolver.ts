import * as path from 'path';
import * as vscode from 'vscode';

export class PathResolver {

	public constructor(
		private readonly extensionContext: vscode.ExtensionContext) {
	}

	public getExtensionPath(fileName: string): string {
		return this.extensionContext.asAbsolutePath(`${fileName}`);
	}

	public getWorkspacePath(fileName: string): string {
		return path.join(vscode.workspace.rootPath as string, fileName);
	}
}
