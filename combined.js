const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


function main() {
  rl.question("\n[ Computer Security Midterm Part B: Cryptography ]\n----------------------------\nOption 1: Encrypt a message.\nOption 2: Decrypt an encrypted message.\n\nYour input: ", (input) => {
    switch (input) {
      case "1":
        encryptText();
        break;
      case "2":
        decryptText();
        break;
      default:
        console.log("Invalid option, please enter 1 or 2.");
        main();
        break;
    }
  });
}

main();

function encryptText() {
  rl.question("\nMessage: ", (message) => {
    rl.question("Key: ", (key) => {

      text_requirement = /^[a-zA-Z]+$/;
      length_requirement = key.length >= message.length;

      if(!message.match(text_requirement)) {
        console.log(">> Error: '" + message + "' is invalid, please enter a message with only alphabets.");
      }

      if(!key.match(text_requirement)) {
        console.log(">> Error: '" + key + "' is invalid, please enter a key with only alphabets.");
      }

      if(!length_requirement) {
        console.log(">> Error: Invalid key, please enter a key with the equal or same length as the message.");
      }

      if(message.match(text_requirement) && key.match(text_requirement) && length_requirement) {
        encrypted_message = encryptionAlgorithm(message, key);
        console.log("\n>> Result:\n> Plain text:", message, "\n> Key:", key, "\n> Encrypted message:", encrypted_message);
      }

      main();
    });
  });
}

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
        decrypted_message = decryptionAlgorithm(encrypted_message, key);
        console.log("\n>> Result:\n> Encrypted message:", encrypted_message, "\n> Key:", key, "\n> Decrypted message:", decrypted_message);
      }

      main();
    });
  });
}

function encryptionAlgorithm(message, key) {
  // Making the key the same length as the message
  key = key.slice(0, message.length);

  // Converts the message and key into uppercase and splits each character into an array
  message = message.toUpperCase();
  message = message.split("");
  key = key.toUpperCase();
  key = key.split("");

  let encrypted_message = "";

  for (var i = 0; i < message.length; i++) { 
    // Convert the message and key letters into ASCII code
    // Subtracts 65 to get the ASCII code of the letter from 0 to 25 because A-Z is 65 to 90
    message_letter = message[i].charCodeAt() - 65;
    key_letter = key[i].charCodeAt() - 65;

    // Encrypts the letter with the provided algorithm
    ascii_code = (message_letter + key_letter) % 26;

    // Converts the ASCII code back to a letter and concatenates it to the encrypted message
    encrypted_message += String.fromCharCode(ascii_code + 65);
  }
  return encrypted_message;
}

function decryptionAlgorithm(encrypted_message, key) {
  // Converts the encrypted message and key into uppercase and splits each character into an array
  encrypted_message = encrypted_message.toUpperCase();
  encrypted_message = encrypted_message.split("");
  key = key.toUpperCase();
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