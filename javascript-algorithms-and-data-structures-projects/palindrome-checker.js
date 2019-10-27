/*
Palindrome Checker

Return true if the given string is a palindrome. Otherwise, return false.

A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.

Note
You'll need to remove all non-alphanumeric characters (punctuation, spaces and symbols) and turn everything into the same case (lower or upper case) in order to check for palindromes.

We'll pass strings with varying formats, such as "racecar", "RaceCar", and "race CAR" among others.

We'll also pass strings with special symbols, such as "2A3*3a2", "2A3 3a2", and "2_A3*3#A2".

palindrome("0_0 (: /-\ :) 0-0") should return true.

palindrome("not a palindrome") should return false.

palindrome("five|\_/|four") should return false.

Keep in mind next time: 
- can use /[/W_]/g instead of the regex I used
- can use a for loop and compare the first letter to the last letter, then the second letter to the second to last letter, etc.
- EVEN BETTER SOLUTION: assign a front = 0 and back = str.length - 1 pointer. while (front < back) if the front pointer isn't alphanum, move the pointer to the next character and continue to the next loop. Similarly for the back pointer. If both characters are alphanum, do toLowerCase on the chracters and compare. This solution is great because you only look at each character ONCE and you don't have to look at the entire string to know that it isn't a palindrome.... WOAH!
*/
function palindrome(str) {
  let nonAlphanumericRegex = /[^a-zA-Z0-9]/g;
  let alphanumericString = str.replace(nonAlphanumericRegex, '');
  alphanumericString = alphanumericString.toLowerCase();
  let alphanumericStringArray = alphanumericString.split('');
  alphanumericStringArray.reverse();
  return alphanumericString === alphanumericStringArray.join('');
}