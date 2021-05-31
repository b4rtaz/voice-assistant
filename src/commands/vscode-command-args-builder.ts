
const ACTIONS: { [action: string]: string } = {
	'undo': 'undo',
	'copy': 'editor.action.clipboardCopyAction',
	'cut': 'editor.action.clipboardCutAction',
	'delete': 'deleteLeft',
	'paste': 'editor.action.clipboardPasteAction'
};

export type VsCodeCommandArgs = [ command: string, ...rest: any[] ];

export function buildVsCodeCommandArgs(action: string, actionArgs?: any[]): VsCodeCommandArgs | null {
	if (action.startsWith('vsc-command:')) {
		const command = action.substring(12);
		const args: VsCodeCommandArgs = [command];
		if (actionArgs) {
			args.push(...actionArgs);
		}
		return args;
	}

	if (ACTIONS[action]) {
		return [ACTIONS[action]];
	}

	console.warn(`Not supported action: ${action}.`);
	return null;
}
