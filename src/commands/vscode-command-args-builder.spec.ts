import * as assert from 'assert';

import { buildVsCodeCommandArgs } from './vscode-command-args-builder';

describe('buildVsCodeCommandArgs()', () => {

	it('returns predefined action', () => {
		const args = buildVsCodeCommandArgs('copy');

		assert.strictEqual(args?.length, 1);
		assert.strictEqual(args[0], 'editor.action.clipboardCopyAction');
	});

	it('predefined actions does not support args', () => {
		const args = buildVsCodeCommandArgs('paste', [
			'ignored argument'
		]);

		assert.strictEqual(args?.length, 1);
		assert.strictEqual(args[0], 'editor.action.clipboardPasteAction');
	});

	it('returns [vsc-command] with args', () => {
		const args = buildVsCodeCommandArgs('vsc-command:some.vscode.command', [
			{ 'alfa': 10 },
			{ 'beta': 20 }
		]);

		assert.strictEqual(args?.length, 3);
		assert.strictEqual(args[0], 'some.vscode.command');
		assert.strictEqual(args[1].alfa, 10);
		assert.strictEqual(args[2].beta, 20);
	});
});
