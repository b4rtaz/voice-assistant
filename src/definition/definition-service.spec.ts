import * as assert from 'assert';

import { FileReader } from '../file-system/file-reader';
import { DefinitionService, DefinitionServiceStatus } from './definition-service';

describe('DefinitionService', () => {

	it('tryLoad() when successfully load then set status to loaded', async () => {
		const fileReaderMock: FileReader = {
			tryReadFromAnyWorkspace: async () => {
				return `{ "commands": [ { "command": "put null", "snippet": "null" } ] }`;
			}
		};

		const service = new DefinitionService(fileReaderMock);
		await service.tryLoad();

		assert.strictEqual(service.status, DefinitionServiceStatus.loaded);
		assert.strictEqual(service.definition?.commands.length, 1);
	});

	it('tryLoad() when definition not found then set status to error', async () => {
		const fileReaderMock: FileReader = {
			tryReadFromAnyWorkspace: async () => {
				return null;
			}
		};

		const service = new DefinitionService(fileReaderMock);
		await service.tryLoad();

		assert.strictEqual(service.status, DefinitionServiceStatus.error);
		assert.strictEqual(true, service.lastError?.startsWith('Cannot find voice-assistant.json'));
	});
});
