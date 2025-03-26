import { helloWorld } from '../helloWorld';

test('returns "Hello, World!"', () => {
	expect(helloWorld()).toBe('Hello, World!');
});