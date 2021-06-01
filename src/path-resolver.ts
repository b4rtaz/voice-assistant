import * as vscode from 'vscode';

export class PathResolver {

	public constructor(
		private readonly extensionContext: vscode.ExtensionContext) {
	}

	public getExtensionPath(fileName: string): string {
		return this.extensionContext.asAbsolutePath(fileName);
	}
}
