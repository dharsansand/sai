import CryptoJS from "crypto-js";

const SECRET_KEY = "my-secret-key-123";

export const decryptData = (response) => {
  try {
    const encryptedString = response?.data || response;

    // Decrypt AES string
    const bytes = CryptoJS.AES.decrypt(encryptedString, SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    // Return as array
    return Array.isArray(decryptedData) ? decryptedData : [];
  } catch (error) {
    console.error("Decryption error:", error);
    return [];
  }
};