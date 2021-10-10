import funk from "./index";

describe("Funkotron", () => {
	test("FizzBuzz test", async () => {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const fizzbuzz = require("../test/fizzbuzz.json");
		expect(
			funk(Array.from(new Array(100)))
				.map((_, index) => 100 - index)
				.map(v => v % 5 + v % 3 === 0 ? "fizzbuzz" : v)
				.map(v => v % 3 === 0 ? "fizz" : v)
				.map(v => v % 5 === 0 ? "buzz" : v)
				.done()
		).toEqual(fizzbuzz)
	});
});
