// https://play.picoctf.org/practice/challenge/58
// Convert base 16 number to base 10
// get user input
const userArgs = process.argv.slice(2);
const userInput = userArgs[0];
// functions
const evaluateTestResults = (boolArr, errMsg) => {
	const isPassing = boolArr.reduce((p,c) => p && c, true);
	if (!isPassing) {
		throw new Error(errMsg);
	}
}

const validateBase16 = (strInput) => {
  const lowerCaseInput = strInput.toLowerCase();
  const invalidCharacterRegExp = new RegExp(/[^\da-f]/);
  const hasInvalidCharacter = invalidCharacterRegExp.test(lowerCaseInput);
  if (strInput.length === 0 || hasInvalidCharacter) {
    throw new Error('input must be a hexidecimal value');
  }

  return lowerCaseInput;
}

const testValidateBase16 = () => {
	const testResults = [];
	// empty string
	try {
		validateBase16("");
		testResults.push(false);
	} catch (e) {
		testResults.push(true);
	}
	// valid base 16 string
	try {
		validateBase16("0123456789abcdef");
		testResults.push(true);
	} catch (e) {
		testResults.push(false);
	}
	// invalid base 16 string
	try {
		validateBase16("googoogaga");
		testResults.push(false);
	} catch (e) {
		testResults.push(true);
	}

	evaluateTestResults(testResults, "tests failed for validateBase16");
}

const base16ToBase10 = (base16Input) => {
	const base16DigitMap = {
		"0": 0,
		"1": 1,
		"2": 2,
		"3": 3,
		"4": 4,
		"5": 5,
		"6": 6,
		"7": 7,
		"8": 8,
		"9": 9,
		"a": 10,
		"b": 11,
		"c": 12,
		"d": 13,
		"e": 14,
		"f": 15,
	}

	return base16Input.split("")
		.map(val => base16DigitMap[val])
		.reverse()
		.reduce((p,c,i) => p + (c * Math.pow(16, i)), 0);
}

const testBase16ToBase10 = () => {
	const testCases = [
		base16ToBase10("0") == 0,
		base16ToBase10("f") == 15,
		base16ToBase10("ff") == 255,
		base16ToBase10("fff") == 4095,
	];

	evaluateTestResults(testCases, "tests failed for base16ToBase10");
}

// tests (run when there is no user input
if (!userInput) {
  testValidateBase16();
  testBase16ToBase10();
  return;
}
// script
const base16Num = validateBase16(userInput);
const base10Num = base16ToBase10(base16Num);
console.log(base10Num);
