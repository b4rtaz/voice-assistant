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
				{ "command": "correct one", "snippet": "ext is string", "ext": ".jpg" },
				{ "command": "correct two", "snippet": "correct", "ext": [404, "", " ", ".jpg"] }
			]
		}`);

		assert.strictEqual(def.commands.length, 2);
		assert.strictEqual(def.commands[0].ext, undefined);
		assert.strictEqual(def.commands[1].ext?.length, 1);
		assert.strictEqual(def.commands[1].ext[0], '.jpg');
	});
});
