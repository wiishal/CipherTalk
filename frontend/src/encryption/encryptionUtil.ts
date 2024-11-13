// Function to generate a salt
export function generateSalt(length = 16) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}

// Function to generate AES-GCM 256-bit key
async function generateAESKey() {
  try {
    const key = await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
    return key;
  } catch (error) {
    console.error("Error generating AES key:", error);
    throw error;
  }
}

// Function to export the AES key to Base64
async function exportKeyToBase64(key:CryptoKey) {
  const rawKey = await window.crypto.subtle.exportKey("raw", key);
  return btoa(String.fromCharCode(...new Uint8Array(rawKey)));
}

// Function to generate and export AES key as Base64
export async function generateKey() {
  try {
    const key = await generateAESKey();
    const base64Key = await exportKeyToBase64(key);
    console.log("Generated AES Key (Base64):", base64Key);
    return base64Key;
  } catch (error) {
    console.error("Failed to generate and export key:", error);
  }
}

// Function to encrypt message using AES key and salt
export async function encryption(base64Key:string, salt:string, message:string) {
  try {
    // Convert the base64 key and salt to ArrayBuffer format
    const keyBytes = Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0));
    const saltBytes = Uint8Array.from(atob(salt), (c) => c.charCodeAt(0));


    const key = await window.crypto.subtle.importKey(
      "raw",
      keyBytes,
      { name: "AES-GCM" },
      false,
      ["encrypt"]
    );

    // Convert message to Uint8Array for encryption
    const encoder = new TextEncoder();
    const encodedMessage = encoder.encode(message);

    // Encrypt the message with AES-GCM, using salt as the initialization vector
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: saltBytes, // Initialization vector (salt)
      },
      key,
      encodedMessage
    );

    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  } catch (error) {
    console.error("Encryption failed:", error);
    throw error;
  }
}

export async function decryption(base64Key:string, salt:string, encryptedMessage:string) {
  try {
    // Convert the base64 key, salt, and encrypted message to ArrayBuffer format
    const keyBytes = Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0));
    const saltBytes = Uint8Array.from(atob(salt), (c) => c.charCodeAt(0));
    const encryptedBytes = Uint8Array.from(atob(encryptedMessage), (c) =>
      c.charCodeAt(0)
    );

    // Re-import the key for decryption
    const key = await window.crypto.subtle.importKey(
      "raw",
      keyBytes,
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );

    // Decrypt the message with AES-GCM, using the salt as the initialization vector
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: saltBytes, // Initialization vector (salt)
      },
      key,
      encryptedBytes
    );

    // Convert decrypted data to string
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    console.error("Decryption failed:", error);
    throw error;
  }
}