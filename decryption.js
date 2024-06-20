const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function decryptText() {
  rl.question("\nEncrypted message: ", (encrypted_message) => {
    rl.question("Key: ", (key) => {

      text_requirement = /^[a-zA-Z]+$/;
      length_requirement = key.length = encrypted_message.length;

      if(!encrypted_message.match(text_requirement)) {
        console.log(">> Error: '" + encrypted_message + "' is invalid, please enter an encrypted message with only alphabets.");
      }

      if(!key.match(text_requirement)) {
        console.log(">> Error: '" + key + "' is invalid, please enter a key with only alphabets.");
      }

      if(!length_requirement) {
        console.log(">> Error: Invalid key, please enter a key with the equal or same length as the encrypted message.");
      }

      if(encrypted_message.match(text_requirement) && key.match(text_requirement) && length_requirement) {
        encrypted_message = encrypted_message.toUpperCase();
        key = key.toUpperCase();
        decrypted_message = decryptionAlgorithm(encrypted_message, key);
        console.log("\n>> Result:\n> Encrypted message:", encrypted_message, "\n> Key:", key, "\n> Decrypted message:", decrypted_message);
      }

      decryptText();
    });
  });
}

decryptText();

function decryptionAlgorithm(encrypted_message, key) {
  // Splits each character into an array
  encrypted_message = encrypted_message.split("");
  key = key.split("");

  let decrypted_message = "";

  for (var i = 0; i < encrypted_message.length; i++) {
    // Convert the encrypted message and key letters into ASCII code
    // Subtracts 65 to get the ASCII code of the letter from 0 to 25 because A-Z is 65 to 90
    encrypted_message_letter = encrypted_message[i].charCodeAt() - 65;
    key_letter = key[i].charCodeAt() - 65;

    // Decrypts the letter with the reverse of the provided algorithm
    ascii_code = (encrypted_message_letter - key_letter + 26) % 26;

    // Converts the ASCII code back to a letter and concatenates it to the decrypted message
    decrypted_message += String.fromCharCode(ascii_code + 65);
  }
  return decrypted_message;
}