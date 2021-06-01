import { Container } from '../container';
import { FileReader } from '../file-system/file-reader';
import { SimpleEvent } from '../simple-event';
import { Definition, DEFINITION_FILE_NAME } from './definition';
import { DefinitionParser } from './definition-parser';

export class DefinitionService {

	public readonly statusChanged = new SimpleEvent();

	public status: DefinitionServiceStatus = DefinitionServiceStatus.error;
	public lastError: string | null = null;
	public definition: Definition | null = null;

	public constructor(
		private readonly fileReader: FileReader) {
	}

	public async tryLoad(): Promise<boolean> {
		try {
			const content = await this.fileReader.tryReadFromAnyWorkspace(DEFINITION_FILE_NAME);
			if (!content) {
				throw new Error(`Cannot find ${DEFINITION_FILE_NAME} in a folder or a workspace.`);
			}

			this.definition = DefinitionParser.read(content);
			this.status = DefinitionServiceStatus.loaded;
			this.lastError = null;
			return true;
		}
		catch (e) {
			this.definition = null;
			this.status = DefinitionServiceStatus.error;
			this.lastError = e.message ? e.message : e;
			return false;
		} finally {
			this.statusChanged.fire();
		}
	}

	public dispose() {
		this.statusChanged.dispose();
	}
}

export enum DefinitionServiceStatus {
	loaded,
	error
}

export function definitionServiceFactory(container: Container) {
	return new DefinitionService(
		container.resolve<FileReader>('FileReader'));
}
