
export class SimpleEvent<T = void> {
	private readonly listners: SimpleEventListener<T>[] = [];

	public listen(listener: SimpleEventListener<T>) {
		this.listners.push(listener);
	}

	public fire(value: T) {
		this.listners.forEach(listener => listener(value));
	}

	public dispose() {
		this.listners.length = 0;
	}
}

export type SimpleEventListener<T> = (value: T) => void;
