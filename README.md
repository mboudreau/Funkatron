# Funkotron

Javascript Performant Functional Programming Experiment in Typescript

![JUST WHY?](https://media.makeameme.org/created/just-why-why-5c8f18.jpg)

I'm glad you asked.  This started when I was interviewing potential candidates for our development team.

As any interview, I would ask questions about their experience, their passions, education, etc, and then move on to do a simple and fairly well-known in-person coding test: [FizzBuzz](https://wiki.c2.com/?FizzBuzzTest).  I like using this test as it's simple enough that any developer should be able to do it on the spot in any language the developer is most comfortable with.  It's a great way to gauge the interviewees creative process, if they can read/understand the problem fully, then ask questions about why they chose to do it one way vs another and bring up any potential issues and how they would solve those.

The test gives a simple problem which follows:

 * Iterate from numbers 100 to 1
 * For numbers that are divisible by 3, print "Fizz"
 * For numbers that are divisible by 5, print "Buzz"
 * For numbers that are divisible by 3 and 5, print "FizzBuzz"
 * For any other number, simply print the number

That's it. Like any problem, there's a lot of different interpretations, perspectives and possible solutions which gives a keen insight on what type of developer they are.  This experiment started once I met one particular developer that was so keen on functional programming that he solved the issue like so:

```
console.log(
    Array.from(new Array(100))                      
        .map((v, index) => index)                   
        .reverse()                                  
        .map(v => v%5 + v%3 === 0 ? 'fizzbuzz': v)  
        .map(v => v%3 === 0 ? 'fizz': v)            
        .map(v => v%5 === 0 ? 'buzz': v)            
        .join('\n')                                 
)
```

It worked and in my opinion is an easily understandable and succinct solution, however, it's horribly inefficient since there are essentially 7 different loops:

```
console.log(
    Array.from(new Array(100))                      // Loop 1 - Create array
        .map((v, index) => index)                   // Loop 2 - Set index as value
        .reverse()                                  // Loop 3 - Reverse index order from 100 to 1
        .map(v => v%5 + v%3 === 0 ? 'fizzbuzz': v)  // Loop 4 - Check divisibility for both 3 and 5
        .map(v => v%3 === 0 ? 'fizz': v)            // Loop 5 - Check divisibility for 3
        .map(v => v%5 === 0 ? 'buzz': v)            // Loop 6 - Check divisibility for 5
        .join('\n')                                 // Loop 7 - Combine all items with newline separator for print
)
```

It got me thinking, functional programming is super readable but often times not practical since a single for loop will be much more performant or you can use a single map which makes it less readable.

OR

I can just create a small library that takes all of these beautiful functional methods and makes them performant by not looping through every item every time, but going item by item for every functional method essentially making it a single loop.

Clearly, I've gone mad.

## Usage

There are 2 ways to use this library, either by importing it:

```
import funk from "funkotron";

const array = [1, 2, 3, 4];
const result = funk(Array.from(new Array(100)))
				.map((_, index) => 100 - index)
				.map(v => v % 5 + v % 3 === 0 ? "fizzbuzz" : v)
				.map(v => v % 3 === 0 ? "fizz" : v)
				.map(v => v % 5 === 0 ? "buzz" : v)
				.done()
```

Or by setting the `Array.prototype` globally:

```
import "funkotron/prototype";
const result = Array.from(new Array(100))
				.funk()
				.map((_, index) => 100 - index)
				.map(v => v % 5 + v % 3 === 0 ? "fizzbuzz" : v)
				.map(v => v % 3 === 0 ? "fizz" : v)
				.map(v => v % 5 === 0 ? "buzz" : v)
				.done()
```

## Disclaimer

This is not production ready code and would need a much better way to do things.  This was simply an experiment on how to potentially make functional programming much faster.  It is not a complete library and only supports 3 functions (map, forEach and filter) and there needs lots of typing improvements to make it easier to work with in Typescript.

Use at your own peril.