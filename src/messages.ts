
export interface Message {
	name: string;
}

export interface ActivateMessage extends Message {
	name: 'activate';
}

export interface CommandRecognizedMessage extends Message {
	name: 'commandRecognized';
	command: string;
}

export interface CommandsNeededMessage extends Message {
	name: 'commandsNeeded';
}

export interface SetCommandsMessage extends Message {
	name: 'setCommands';
	commands: string[];
}
