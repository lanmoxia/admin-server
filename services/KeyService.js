const KeyModel = require('../model/KeyModel');

const storePrivateKey = async (privateKey) => {
  try {
    const keyDocument = new KeyModel({ privateKey });
    await keyDocument.save();
    console.log('Private key has been saved successfully.');
  } catch (error) {
    console.error('Error saving the private key:', error);
  }
};

module.exports = storePrivateKey;
