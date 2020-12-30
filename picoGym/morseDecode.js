#!/usr/bin/env node
// https://play.picoctf.org/practice/challenge/21
// consts
const FROM_MORSE_CODE = {
	'.-': "a",
	'-...': "b",
	'-.-.': "c",
	'-..': "d",
	'.': "e",
	'..-.': "f",
	'--.': "g",
	'....': "h",
	'..': "i",
	'.---': "j",
	'-.-': "k",
	'.-..': "l",
	'--': "m",
	'-.': "n",
	'---': "o",
	'.--.': "p",
	'--.-': "q",
	'.-.': "r",
	'...': "s",
	'-': "t",
	'..-': "u",
	'...-': "v",
	'.--': "w",
	'-..-': "x",
	'-.--': "y",
	'--..': "z",
	'.----': "1",
	'..---': "2",
	'...--': "3",
	'....-': "4",
	'.....': "5",
	'-....': "6",
	'--...': "7",
	'---..': "8",
	'----.': "9",
	'-----': "0",
}
// get user input
const userArgs = process.argv.slice(2);
const userMorseCodeString = userArgs[0];
// functions
const evaluateTestResults = (boolArr, errMsg) => {
	const isPassing = boolArr.reduce((p,c) => p && c, true);
	if (!isPassing) {
		throw new Error(errMsg);
	}
}

const validateMorseCode = (possibleMorseCode) => {
	const isDot = (char) => char == ".";
	const isDash = (char) => char == "-";
	const isWhitespace = (char) => char == " ";

	possibleMorseCode.split("").forEach((char) => {
		const isValidCharacter = isDot(char) || isDash(char) || isWhitespace(char);
		if (!isValidCharacter) {
			throw new Error(`invalid character found: ${char}`);
		}
	});

	return possibleMorseCode;
}

const testValidateMorseCode = () => {
	const testResults = [];

	try {
		validateMorseCode("not morse code");
		testResults.push(false);
	} catch (e) {
		testResults.push(true);
	}

	try {
		validateMorseCode(".-- ..-");
		testResults.push(true);
	} catch (e) {
		testResults.push(false);
	}

	evaluateTestResults(testResults, "tests failed for validateMorseCode");
}

const decodeMorseCode = (morseCode) => {
	return morseCode.split(" ")
		.map(charCode => FROM_MORSE_CODE[charCode])
		.join("");
}

const testDecodeMorseCode = () => {
	const testCases = [
		decodeMorseCode("- .... .. ... .. ... -- --- .-. ... . -.-. --- -.. .") == "thisismorsecode",
		decodeMorseCode(".---- ..--- ...-- ....-") == "1234",
	];

	evaluateTestResults(testCases, "tests failed for decodeMorseCode");
}

// tests
if (!userMorseCodeString) {
	testValidateMorseCode();
	return;
}
// script
const validMorseCode = validateMorseCode(userMorseCodeString);
const result = decodeMorseCode(validMorseCode);
console.log(result);
