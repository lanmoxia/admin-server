const crypto = require('crypto');
// 解密函数
const decryptPassword = (encryptedPassword, privateKey) => {
  return new Promise((resolve, reject) => {
    try {
      const buffer = Buffer.from(encryptedPassword, 'base64');
      console.log('D_psd',buffer)
      const decrypted = crypto.privateDecrypt(
        {
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        buffer
      );
      resolve(decrypted.toString('utf8'));
    } catch (error) {
      console.log('D_error',error)
      reject(error);
    }
  });
};

module.exports = decryptPassword;