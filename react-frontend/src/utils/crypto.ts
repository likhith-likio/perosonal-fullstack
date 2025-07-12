import CryptoJS from "crypto-js"

const SECRET_KEY = "my_super_secret_key_123" // You can use .env for this

export const encryptToken = (token: string): string => {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString()
}

export const decryptToken = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}
