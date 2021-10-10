// TODO: use immutability wrapper
const clone = data => JSON.parse(JSON.stringify(data));

export class Funkotron<T> {
	private data: T[];
	private methods: Method[];

	constructor(data: T[]) {
		// TODO: check to see if it's array
		// Create deep clone of data for immutability
		this.data = clone(data);
		this.methods = [];
	}

	static create<T>(data: T[]) {
		return new Funkotron<T>(data);
	}

	public forEach(predicate: (value: T, index: number, array: T[]) => void): Funkotron<T> {
		this.methods.push({key: "forEach", args: [predicate]});
		return this;
	}

	public filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S): Funkotron<T> {
		this.methods.push({key: "filter", args: [predicate]});
		return this;
	}

	public map<U>(predicate: (value: T, index: number, array: T[]) => U): Funkotron<T> {
		this.methods.push({key: "map", args: [predicate]});
		return this;
	}

	/*public reduce(predicate: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): Funkotron<T> {
		this.methods.push({key: "reduce", args: [predicate, initialValue]});
		return this;
	}

	public reverse(): Funkotron<T> {
		this.methods.push({key: "reverse"});
		return this;
	}

	public every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S): Funkotron<T> {
		this.methods.push({key: "every", args: [predicate]});
		return this;
	}

	public some(predicate: (value: T, index: number, array: T[]) => unknown): Funkotron<T> {
		this.methods.push({key: "every", args: [predicate]});
		return this;
	}*/

	public done(): T[] {
		return this.data.reduce((acc: any[], item, index) => {
			const len = this.methods.length;
			for (let i = 0; i < len; i++) {
				const method = this.methods[i];
				switch (method.key) {
					case "filter":
						if (!method.args?.[0]?.(item, index, clone(acc))) {
							return acc;
						}
						break;
					case "forEach":
						method.args?.[0]?.(item, index, clone(acc));
						break;
					case "map":
						item = method.args?.[0]?.(item, index, clone(acc));
						break;
				}
			}
			acc.push(item);

			return acc;
		}, []);
	}
}

interface Method {
	key: keyof Omit<Funkotron<any>, "data" | "done" | "methods">
	args?: any[];
}

export default Funkotron.create;
