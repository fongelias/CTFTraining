#!/usr/bin/env node
// https://play.picoctf.org/practice/challenge/64
// caesar decrypt this string: dspttjohuifsvcjdpoabrkttds
// consts
const ALPHABET_LENGTH = 26;
const TEST_STR = "dspttjohuifsvcjdpoabrkttds";
// functions
const evaluateTestResults = (boolArr, errMsg) => {
	const isPassing = boolArr.reduce((p,c) => p && c, true);
	if (!isPassing) {
		throw new Error(errMsg);
	}
}

const shiftStringByN = (string, shift) => {
	const stringArr = string.slice().toLowerCase().split("");
	return stringArr.map((char) => {
		const currCode = char.charCodeAt(0);
		const newCode = currCode + shift > 122 ?
			currCode + shift - ALPHABET_LENGTH :
			currCode + shift;
		const newLetter = String.fromCharCode(newCode);
		return newLetter;
	}).join("");
}

const testShiftStringByN = () => {
	const testCases = [
		shiftStringByN("abc", 1) == "bcd",
		shiftStringByN("cab", 2) == "ecd",
		shiftStringByN("z", 1) == "a",
	];

	evaluateTestResults(testCases, "tests failed for shiftStringByN");
}

const caesarDecrypt = (encryptedString) => {
	// shift each letter and print new strings
	for(let i = 0; i < ALPHABET_LENGTH; i++) {
		const newStr = shiftStringByN(encryptedString, i);
		console.log(newStr);
	}
}

// run tests
testShiftStringByN();
// script
caesarDecrypt(TEST_STR);