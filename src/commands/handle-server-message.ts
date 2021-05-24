import { Container } from '../container';
import { CommandRecognizedMessage, Message } from '../messages';
import { handleCommandRecognizedFactory } from './handle-command-recognized';
import { handleCommandsNeededFactory } from './handle-commands-needed';

export function handleServerMessage(
	message: Message,
	handleCommandRecognized: (message: CommandRecognizedMessage) => void,
	handleCommandsNeeded: () => void
) {
	switch (message.name) {
		case 'commandRecognized':
			handleCommandRecognized(message as CommandRecognizedMessage);
			break;

		case 'commandsNeeded':
			handleCommandsNeeded();
			break;
	}
}

export function handleServerMessageFactory(container: Container) {
	return (message: Message) => handleServerMessage(
		message,
		handleCommandRecognizedFactory(container),
		handleCommandsNeededFactory(container));
}
