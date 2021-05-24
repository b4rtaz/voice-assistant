import * as path from 'path';
import * as vscode from 'vscode';

export class PathResolver {

	public constructor(
		private readonly extensionContext: vscode.ExtensionContext) {
	}

	public getExtensionMediaPath(fileName: string): string {
		return this.extensionContext.asAbsolutePath(`media/${fileName}`);
	}

	public getWorkspacePath(fileName: string): string {
		return path.join(vscode.workspace.rootPath as string, fileName);
	}
}
