// https://play.picoctf.org/practice/challenge/86
// Convert the number 42 to base 2

// Extract user input
const userArgs = process.argv.slice(2);
const userInput = parseInt(userArgs[0]);

// functions
const validateUserInput = (stringInput) => {
	// try to parse the input as a number
	const stringInputAsInteger = parseInt(stringInput);
	// is it an integer?
	if (isNaN(stringInputAsInteger)) {
		throw new TypeError('string cannot be parsed as an integer');
	}
	// return valid input as integer
	return stringInputAsInteger;
}

const testValidateUserInput = () => {
	let testResults = [];
	// Test NaN input
	try {
		validateUserInput("some str");
		testResults.push(false);
	} catch (e) {
		testResults.push(true);
	}
	// Test correct input
	try {
		validateUserInput("1");
		testResults.push(true);
	} catch (e) {
		testResults.push(false);
	}

	const isPassing = testResults.reduce((p,c) => p && c, true);
	if (!isPassing) {
		throw new Error('tests failed for validateUserInput');
	}
}

const findHighestFactorOfTwo = (num) => {	
	let factorOfTwo = 0;	
	while(num >= Math.pow(2, factorOfTwo + 1)) {
		factorOfTwo++;
	}

	return factorOfTwo;
}

const testFindHighestFactorOfTwo = () => {
	const testCases = [
		findHighestFactorOfTwo(0) == 0,
		findHighestFactorOfTwo(1) == 0,
		findHighestFactorOfTwo(2) == 1,
		findHighestFactorOfTwo(3) == 1,
		findHighestFactorOfTwo(4) == 2,
		findHighestFactorOfTwo(5) == 2,
		findHighestFactorOfTwo(6) == 2,
		findHighestFactorOfTwo(7) == 2,
		findHighestFactorOfTwo(8) == 3,
		findHighestFactorOfTwo(9) == 3,
	];

	const isPassing = testCases.reduce((p,c) => p && c, true);
	if (!isPassing) {
		throw new Error('tests failed for findHighestFactorOfTwo');
	}
}

const stringOfNZeroes = (numZeroes) => new Array(numZeroes).fill("0").join("");

const testStringOfNZeroes = () => {
	const testCases = [
		stringOfNZeroes(0) == "",
		stringOfNZeroes(1) == "0",
		stringOfNZeroes(2) == "00",
		stringOfNZeroes(3) == "000",
	];

	const isPassing = testCases.reduce((p,c) => p && c, true);
	if (!isPassing) {
		throw new Error('tests failed for stringOfNZeroes');
	}
}

const powerToBaseTwo = (powerOfTwo) => {
	const nZeroes = stringOfNZeroes(powerOfTwo);

	return +("1" + nZeroes);
}

const testPowerToBaseTwo = () => {
	const testCases = [
		powerToBaseTwo(0) == 1,
		powerToBaseTwo(1) == 10,
		powerToBaseTwo(2) == 100,
		powerToBaseTwo(3) == 1000,
		powerToBaseTwo(4) == 10000,
	];

	const isPassing = testCases.reduce((p,c) => p && c, true);
	if (!isPassing) {
		throw new Error('tests failed for testPowerToBaseTwo');
	}
}

const base10ToBase2 = (base10Number) => {
	const factors = [];
	const factorNumber = (numToFactor) => {
		// Degenerate case, numToFactor is 1 or 0
		if (numToFactor < 2) {
			factors.push(numToFactor);
			return;
		}
		// Update Factors
		const highestFactor = findHighestFactorOfTwo(numToFactor);
		factors.push(powerToBaseTwo(highestFactor));
		// Recursion
		const remaining = numToFactor - Math.pow(2, highestFactor);
		factorNumber(remaining);
	}
	factorNumber(base10Number);


	return factors.reduce((p,c) => p + c, 0);
}

const testBase10ToBase2 = () => {
	const testCases = [
		base10ToBase2(0) == 0,
		base10ToBase2(1) == 1,
		base10ToBase2(2) == 10,
		base10ToBase2(3) == 11,
		base10ToBase2(4) == 100,
		base10ToBase2(5) == 101,
		base10ToBase2(6) == 110,
		base10ToBase2(7) == 111,
		base10ToBase2(8) == 1000,
		base10ToBase2(9) == 1001,
	];

	const isPassing = testCases.reduce((p,c) => p && c, true);
	if (!isPassing) {
		throw new Error('tests failed for base10ToBase2');
	}
}

// tests (run when there is no user input)
if (!userInput) {
	testValidateUserInput();
	testFindHighestFactorOfTwo();
	testStringOfNZeroes();
	testPowerToBaseTwo();
	testBase10ToBase2();
	return;
}

// script
const validUserInput = validateUserInput(userInput);
const base2Number = base10ToBase2(validUserInput);
console.log(base2Number);
