import * as assert from 'assert';

import { SimpleEvent } from './simple-event';

describe('SimpleEvent', () => {

	it('works as expected', () => {
		let A = 0;
		let B = 0;

		const ev = new SimpleEvent<number>();
		ev.listen(() => A++);
		ev.listen(v => B += v);

		ev.fire(4);
		ev.fire(6);

		assert.strictEqual(A, 2);
		assert.strictEqual(B, 10);

		ev.dispose();

		ev.fire(100);

		assert.strictEqual(A, 2);
	});
});
