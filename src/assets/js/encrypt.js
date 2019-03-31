var myPassword = "myPassword";

function getEncryptedData(myString) {
    var encrypted = CryptoJS.AES.encrypt(myString, myPassword);
    return encrypted.toString();
}

function getDecryptedData(myEncryptString) {
  var decrypted = CryptoJS.AES.decrypt(myEncryptString, myPassword);
  return decrypted.toString(CryptoJS.enc.Utf8);
}
