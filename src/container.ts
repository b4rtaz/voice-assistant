
export class Container {

	private instances: { [name: string]: any } = {};

	public set<T>(name: string, instance: T): T {
		if (this.instances[name]) {
			throw new Error(`The name ${name} is used.`);
		}
		this.instances[name] = instance;
		return instance;
	}

	public resolve<T>(name: string): T {
		const instance = this.instances[name];
		if (!instance) {
			throw new Error(`Cannot find an instance by the name ${name}.`);
		}
		return instance as T;
	}
}
