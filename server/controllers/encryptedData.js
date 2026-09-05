import CryptoJS from "crypto-js";

const SECRET_KEY ="my-secret-key-123";

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};