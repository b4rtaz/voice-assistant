import { TextDecoder } from 'util';
import * as WebSocket from 'ws';

import { Container } from '../container';
import { Message } from '../messages';
import { SimpleEvent } from '../simple-event';
import { ClientConfigurationProvider } from './client-configuration-provider';

export class WebSocketClient {

	public readonly statusChanged = new SimpleEvent();
	public readonly messageReceived = new SimpleEvent<Message>();

	public status: WebSocketClientStatus = WebSocketClientStatus.disconnected;
	public lastError: string | null = null;

	private socket: WebSocket | null = null;
	private reconnectTo: any | null = null;
	private isDisposed = false;

	public constructor(
		private configurationProvider: WebSocketClientConfigurationProvider) {
	}

	public connect() {
		this.tryConnect();
	}

	public send(message: Message) {
		if (this.socket) {
			const payload = JSON.stringify(message);
			this.socket.send(payload);
		}
	}

	public dispose() {
		this.isDisposed = true;
		if (this.reconnectTo) {
			clearTimeout(this.reconnectTo);
		}
		if (this.socket) {
			this.socket.close();
		}
		this.statusChanged.dispose();
		this.messageReceived.dispose();
	}

	private tryConnect() {
		if (this.socket) {
			throw new Error('The client is already connected.');
		}

		const config = this.configurationProvider.getConfiguration();

		this.updateStatus(WebSocketClientStatus.connecting);

		this.lastError = null;
		this.socket = new WebSocket(`ws://${config.host}:${config.port}`);
		this.socket.onopen = () => {
			this.updateStatus(WebSocketClientStatus.connected);
		};
		this.socket.onerror = (e) => {
			this.lastError = e.message;
		};
		this.socket.onclose = () => {
			this.updateStatus(WebSocketClientStatus.disconnected);
			this.socket = null;

			if (!this.isDisposed) {
				this.reconnectTo = setTimeout(() => {
					this.reconnectTo = null;
					this.tryConnect();
				}, 3000);
			}
		};
		this.socket.onmessage = (event: WebSocket.MessageEvent) => {
			const payload = new TextDecoder('utf-8').decode(event.data as Buffer);
			const message = JSON.parse(payload);
			this.messageReceived.fire(message as Message);
		};
	}

	private updateStatus(newStatus: WebSocketClientStatus) {
		this.status = newStatus;
		this.statusChanged.fire();
	}
}

export interface WebSocketClientConfiguration {
	host: string;
	port: number;
}

export interface WebSocketClientConfigurationProvider {
	getConfiguration(): WebSocketClientConfiguration;
}

export enum WebSocketClientStatus {
	disconnected,
	connecting,
	connected
}

export function webSocketClientFactory(container: Container) {
	return new WebSocketClient(
		container.resolve<ClientConfigurationProvider>('ClientConfigurationProvider'));
}
