#!/usr/bin/env node
// https://play.picoctf.org/practice/challenge/68
// Translate these numbers (in the format of picoCTF{xxx}):
// 16 9 3 15 3 20 6 { 20 8 5 14 21 13 2 5 18 19 13 1 19 15 14 }
// Consts
// const encodedString = "16 9 3 15 3 20 6 { 20 8 5 14 21 13 2 5 18 19 13 1 19 15 14 }"
// get user input
const userArgs = process.argv.slice(2);
const userInput = userArgs[0];
// Functions
const evaluateTestResults = (boolArr, errMsg) => {
	const isPassing = boolArr.reduce((p,c) => p && c, true);
	if (!isPassing) {
		throw new Error(errMsg);
	}
}

const positionInAlphabetToLetter = (position) => {
	// using http://www.asciitable.com/
	// "a" starts at charcode 97
	return String.fromCharCode(position  + 64);
}

const testPositionInAlphabetToLetter = () => {
	const testCases = [
		positionInAlphabetToLetter(1) == "A",
		positionInAlphabetToLetter(2) == "B",
		positionInAlphabetToLetter(3) == "C",
		positionInAlphabetToLetter(4) == "D",
		positionInAlphabetToLetter(5) == "E",
	];

	evaluateTestResults(testCases, "tests failed for positionInAlphabetToLetter");
}

const decodeString = (str, delim) => {
	const numArr = str.split(delim);
	return numArr.map(val => {
		const castedVal = parseInt(val);
		return castedVal ? positionInAlphabetToLetter(castedVal) : val;
	}).join("");
}
// Tests
if(!userInput) {
	testPositionInAlphabetToLetter();
	return;
}
// Script
const decodedString = decodeString(userInput, " ");
console.log(decodedString);
