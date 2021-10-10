import {Funkotron} from './index';

declare global {
	interface Array<T> {
		funk(): Funkotron<T>;
	}
}

Array.prototype.funk = function <T>() {
	return Funkotron.create<T>(this);
}
