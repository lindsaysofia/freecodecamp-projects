/*
Roman Numeral Converter

Convert the given number into a roman numeral.

All roman numerals answers should be provided in upper-case.

convertToRoman(3999) should return "MMMCMXCIX"

convertToRoman(44) should return "XLIV"
*/
function convertToRoman(num) {
  let romanNumeralsStrings = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C', 'CD', 'D', 'CM', 'M'];
  let romanNumeralDecimals = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
  let index = 0;
  let conversion = '';
  while (num !== romanNumeralDecimals[index]) {
    if (num < romanNumeralDecimals[index]) {
      num -= romanNumeralDecimals[index - 1];
      conversion = conversion + romanNumeralsStrings[index - 1];
      index = 0;
    } else if (index === romanNumeralDecimals.length - 1) {
      let numberOfThousands = Math.floor(num / romanNumeralDecimals[index]);
      num -= numberOfThousands * 1000;
      conversion = conversion + romanNumeralsStrings[index].repeat(numberOfThousands);
      index = 0;
    } else {
      index++;
    }
  }
  conversion = conversion + romanNumeralsStrings[index];
  return conversion;
 }