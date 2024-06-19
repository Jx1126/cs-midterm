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

}

function encryptionAlgorithm(message, key) {
  // Making the key the same length as the message
  key = key.slice(0, message.length);

  // Converts the message into uppercase and splits each character into an array
  message = message.toUpperCase();
  message = message.split("");

  // Converts the key into uppercase and splits each character into an array
  key = key.toUpperCase();
  key = key.split("");

  let encrypted_message = "";

  for (var i = 0; i < message.length; i++) { 
    // Convert the message and key letters into ASCII code
    // By subtracting 65, we can convert the ASCII code into a number between 0-25
    message_letter = message[i].charCodeAt() - 65;
    key_letter = key[i].charCodeAt() - 65;

    // Encrypts the letter
    ascii_code = (message_letter + key_letter) % 26;

    // Converts the ASCII code back to a letter and concatenates it to the encrypted message
    encrypted_message += String.fromCharCode(ascii_code + 65);
  }
  return encrypted_message;
}

function decryptionAlgorithm() {

}