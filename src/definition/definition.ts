
export const DEFINITION_FILE_NAME = 'voice-assistant.json';

export interface Definition {
	commands: CommandDefinition[];
}

export interface CommandDefinition {
	ext?: string[];
	command: string;
	snippet?: string;
	action?: string;
	args?: any[];
}
