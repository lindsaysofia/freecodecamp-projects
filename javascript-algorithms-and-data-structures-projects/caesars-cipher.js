/*
Caesars Cipher

One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.

rot13("SERR CVMMN!") should decode to FREE PIZZA!

Keep in mind next time: (charCodeAt(0) % 26) + 65 .... better than an if check in shiftMatchCode
*/
function rot13(str) {
  let lettersRegex = /[A-Z]/g;
  return str.replace(lettersRegex, match => {
    let matchCode = match.charCodeAt(0);
    let shiftMatchCode = matchCode < 78 ? matchCode + 13 : matchCode - 13;
    return String.fromCharCode(shiftMatchCode);
  });
}