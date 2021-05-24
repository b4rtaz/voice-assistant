import * as assert from 'assert';

import { Container } from './container';

describe('Container', () => {

	let container: Container;

	beforeEach(() => {
		container = new Container();
	});

	it('resolve() throws error when dependency is unknown', () => {
		assert.throws(() => {
			container.resolve('zxc');
		}, Error, 'Cannot find an instance by the name zxc.');
	});

	it('container returns passed instance', () => {
		const instance = Math.random();

		container.set('foo', instance);

		const v = container.resolve<number>('foo');

		assert.strictEqual(v, instance);
	});
});
