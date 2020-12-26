#!/usr/bin/env node
// https://play.picoctf.org/practice/challenge/43
// decrypt UFJKXQZQUNB with key SOLVECRYPTO
// consts
const ALPHABET_LENGTH = 26;
// get user input
const userArgs = process.argv.slice(2);
const userEncodedString = userArgs[0];
const userKey = userArgs[1];
// functions
const evaluateTestResults = (boolArr, errMsg) => {
	const isPassing = boolArr.reduce((p,c) => p && c, true);
	if (!isPassing) {
		throw new Error(errMsg);
	}
}

const removeNonAlphabetCharacters = (string) => {
	const isUpperCaseLetterCode = (code) => (code >= 65 && code <= 90);
	const isLowerCaseLetterCode = (code) => (code >= 97 && code <= 122);
	const isAlphabetCharacter = (letter) => {
		const charCode = letter.charCodeAt(0);
		return isUpperCaseLetterCode(charCode) || isLowerCaseLetterCode(charCode);
	};
	return string.split("")
		.map(letter => isAlphabetCharacter(letter) ? letter : "")
		.join("");
}

const testRemoveNonAlphabetCharacters = () => {
	const testCases = [
		removeNonAlphabetCharacters("string with whitespace") == "stringwithwhitespace",
		removeNonAlphabetCharacters("stringWithNumbers123") == "stringWithNumbers",
		removeNonAlphabetCharacters("stringWithSpecialCharacters!@#") == "stringWithSpecialCharacters",
	];

	evaluateTestResults(testCases, "tests failed for removeNonAlphabetCharacters");
}

const cleanVigenereInput = (uncleanEncodedString, uncleanKey) => {
	// clean input
	const capitalizedEncodedString = uncleanEncodedString.toUpperCase();
	const capitalizedKey = uncleanKey.toUpperCase();
	const cleanEncodedString = removeNonAlphabetCharacters(capitalizedEncodedString);
	const cleanKey = removeNonAlphabetCharacters(capitalizedKey);

	return [cleanEncodedString, cleanKey];
}

const testCleanVigenereInput = () => {
	const testSingleInput = (testStr) => {
		// Allowed range of charCode in 65-90
		const charCodeInAllowedRange = (code) => (code >= 65 || code <= 90);

		let i = 0;
		// loop through input
		while(i < testStr.length) {
			// get char code
			const charCode = testStr.charCodeAt(i);
			// test char code
			if (!charCodeInAllowedRange(charCode)) {
				// return false for failing test
				return false;
			}
			i++;
		}
		// return true for passing test
		return true;
	}
	// Gather all string results into a single array
	const testCases = [
		...cleanVigenereInput("string with whitespace", "key with whitespace"),
		...cleanVigenereInput("stringWithNumbers123", "keyWithNumbers123"),
		...cleanVigenereInput("stringWithSpecialCharacters$!@", "keyWithSpecialCharacters%^&"),
	];

	// Evaluate individual test cases
	const testResults = testCases.map(testSingleInput);

	evaluateTestResults(testResults, "tests failed for cleanVigenereInput");
}

const repeatStringForLength = (string, length) => {
	const strArr = new Array(length).fill("");
	return strArr.map((val, i) => {
		return string[i % string.length];
	}).join("");
}

const testRepeatStringForLength = () => {
	const testCases = [
		repeatStringForLength("testString", 1) == "t",
		repeatStringForLength("testString", 10) == "testString",
		repeatStringForLength("testString", 11) == "testStringt",
		repeatStringForLength("testString", 15) == "testStringtestS",
	];

	evaluateTestResults(testCases, "tests failed for repeatStringForLength");
}

const positionInAlphabet = (letter) => {
	const charCode = letter.toUpperCase().charCodeAt(0);
	return charCode - 65;
}

const testPositionInAlphabet = () => {
	const testCases = [
		positionInAlphabet("a") == 0,
		positionInAlphabet("B") == 1,
		positionInAlphabet("c") == 2,
		positionInAlphabet("D") == 3,
	];

	evaluateTestResults(testCases, "tests failed for positionInAlphabet");
}

const letterFromPosition = (position) => {
	// a starts at 0. This returns an uppercase letter
	return String.fromCharCode(position + 65);
}

const testLetterFromPosition = () => {
	const testCases = [
		letterFromPosition(0) == "A",
		letterFromPosition(1) == "B",
		letterFromPosition(2) == "C",
		letterFromPosition(3) == "D",
	];

	evaluateTestResults(testCases, "tests failed for letterFromPosition");
}

const vigenereDecrypt = (encodedString, key) => {
	const matchingKey = repeatStringForLength(key, encodedString.length);
	// iterate over each letter
	const vigenereDecryptChar = (char, keyChar) => {
		const charPosition = positionInAlphabet(char);
		const keyCharPosition = positionInAlphabet(keyChar);
		const posDifference = charPosition - keyCharPosition;
		const newCharPosition = posDifference >= 0 ? posDifference : ALPHABET_LENGTH + posDifference;
		return letterFromPosition(newCharPosition);
	}

	return encodedString.split("").map((char, i) => {
		return vigenereDecryptChar(char, matchingKey[i]);
	}).join("");
}

const testVigenereDecrypt = () => {
	const testCases = [
		vigenereDecrypt("UFJKXQZQUNB", "SOLVECRYPTO") == "CRYPTOISFUN"
	];

	evaluateTestResults(testCases, "tests failed for vigenereDecrypt");
}
// run tests
if(!userEncodedString || !userKey) {
	testRemoveNonAlphabetCharacters();
	testCleanVigenereInput();
	testRepeatStringForLength();
	testPositionInAlphabet();
	testLetterFromPosition();
	testVigenereDecrypt();
	return;
}
// script
const cleanedVigenereInput = cleanVigenereInput(userEncodedString, userKey);
const decodedString = vigenereDecrypt(...cleanedVigenereInput);
console.log(decodedString);