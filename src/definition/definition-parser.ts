import { Definition } from './definition';

export class DefinitionParser {

	public static read(content: string): Definition {
		const json = JSON.parse(content) as Definition;
		const result: Definition = { commands: [] };

		if (json.commands && Array.isArray(json.commands)) {
			for (const snippet of json.commands) {
				if (typeof snippet.command !== 'string') {
					continue;
				}
				if (typeof snippet.snippet !== 'string' && typeof snippet.action !== 'string') {
					continue;
				}

				const command = snippet.command.trim().toLowerCase();
				if (!command) {
					continue;
				}

				result.commands.push({
					command,
					snippet: snippet.snippet,
					action: snippet.action,
					ext: DefinitionParser.readExt(snippet.ext)
				});
			}
		}
		return result;
	}

	private static readExt(ext: any): string[] | undefined {
		if (ext && Array.isArray(ext)) {
			const result: string[] = [];
			for (const e of ext) {
				if (typeof e !== 'string') {
					continue;
				}
				const value = e.trim().toLowerCase();
				if (!value) {
					continue;
				}
				result.push(value);
			}
			if (result.length > 0) {
				return result;
			}
		}
		return undefined;
	}
}
