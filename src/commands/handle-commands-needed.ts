import { WebSocketClient } from '../client/web-socket-client';
import { Container } from '../container';
import { SetCommandsMessage } from '../messages';
import { DefinitionService, DefinitionServiceStatus } from '../definition/definition-service';

export function handleCommandsNeeded(
	definitionService: DefinitionService,
	client: WebSocketClient)
{
	if (definitionService.status !== DefinitionServiceStatus.loaded || !definitionService.definition) {
		return;
	}

	const message = {
		name: 'setCommands',
		commands: definitionService.definition.commands.map(s => s.command)
	} as SetCommandsMessage;

	client.send(message);
}

export function handleCommandsNeededFactory(container: Container) {
	return () => handleCommandsNeeded(
		container.resolve<DefinitionService>('DefinitionService'),
		container.resolve<WebSocketClient>('WebSocketClient'));
}
