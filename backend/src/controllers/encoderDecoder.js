// Function to encode a string using a custom algorithm that changes the string length
function encode(input, step) {
    return input.split('').map(char => {
        if (/[a-zA-Z]/.test(char)) {
            const base = char === char.toUpperCase() ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            const shiftedChar1 = String.fromCharCode(((char.charCodeAt(0) - base + step) % 26) + base); // First shift
            const shiftedChar2 = String.fromCharCode(((shiftedChar1.charCodeAt(0) - base + step) % 26) + base); // Second shift
            return `${shiftedChar1}${shiftedChar2}`; // Encode with both shifted characters
        }
        return char; // Non-alphabetic characters remain unchanged
    }).join('');
}

// Function to decode a string encoded with the custom algorithm
function decode(input, step) {
    const decoded = [];
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (/[a-zA-Z]/.test(char)) {
            const base = char === char.toUpperCase() ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            const originalChar = String.fromCharCode(((char.charCodeAt(0) - base - step + 26) % 26) + base); // Reverse first shift
            decoded.push(originalChar); // Add the original character
            i++; // Skip the second shifted character
        } else {
            decoded.push(char); // Non-alphabetic characters remain unchanged
        }
    }
    return decoded.join('');
}

const originalText = "fero";
const encodedText = encode(originalText, 10);
const decodedText = decode(encodedText, 10);

console.log("Original:", originalText);
console.log("Encoded:", encodedText);
console.log("Decoded:", decodedText);
