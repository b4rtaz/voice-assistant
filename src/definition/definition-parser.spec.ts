import * as assert from 'assert';

import { DefinitionParser } from './definition-parser';

describe('DefinitionParser', () => {

	it('read() skips invalid values', () => {
		const def = DefinitionParser.read(`{
			"commands": [
				{ "command": 404, "snippet": "invalid command type" },
				{ "command": "invalid snippet type", "snippet": false },
				{ "command": "no action and no snipet" },
				{ "command": "    ", "snippet": "only spaces" },
				{ "command": "Invalid args", "action": "copy", "args": 2000 },
				{ "command": "correct one", "snippet": "ext is string", "ext": ".jpg" },
				{ "command": "correct two", "snippet": "correct", "ext": [404, "", " ", ".jpg"] },
				{ "command": "correct three", "action": "delete", "args": [1, 2] }
			]
		}`);

		assert.strictEqual(def.commands.length, 3);
		assert.strictEqual(def.commands[0].ext, undefined);
		assert.strictEqual(def.commands[1].ext?.length, 1);
		assert.strictEqual(def.commands[1].ext[0], '.jpg');
		assert.strictEqual(def.commands[2].action, 'delete');
		assert.strictEqual(def.commands[2].args?.length, 2);
	});

	it('read() throws error when definition does not contain any valid command', () => {
		assert.throws(() => {
			DefinitionParser.read(`{
				"commands": [
					{ "command": "x" },
					{ "snippet": "y" }
				]
			}`);
		}, Error, 'The definition file does not contain any command.');
	});
});
