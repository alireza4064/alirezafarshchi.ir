/* ==========================================================================
   Authenticated Encryption Engine for Protected Case Studies
   Web Crypto API: PBKDF2-SHA256 (250,000 iterations) + AES-256-GCM
   Zero plaintext secrets or passwords stored in public source code.
   ========================================================================== */

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function bytesToBase64(bytes) {
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function deriveKey(password, salt, iterations = 250000) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypts a JSON-serializable case study object with a user-supplied passphrase.
 * Used locally by the site owner via /tools/encrypt-case-study.html.
 */
export async function encryptCaseStudyPayload(dataObject, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const iterations = 250000;
  const key = await deriveKey(password, salt, iterations);

  const plaintext = encoder.encode(JSON.stringify(dataObject));
  const ciphertextBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    plaintext
  );

  return {
    version: 1,
    algorithm: "AES-256-GCM",
    kdf: "PBKDF2-SHA256",
    iterations,
    salt: bytesToBase64(salt),
    iv: bytesToBase64(iv),
    ciphertext: bytesToBase64(new Uint8Array(ciphertextBuffer)),
  };
}

/**
 * Decrypts an encrypted case study bundle fetched from /src/data/encrypted-case-studies/<slug>.json.
 * Throws if the passphrase is invalid or the payload is tampered with.
 */
export async function decryptCaseStudyPayload(bundle, password) {
  if (!bundle || !bundle.ciphertext || !bundle.salt || !bundle.iv) {
    throw new Error("INVALID_BUNDLE");
  }

  const salt = base64ToBytes(bundle.salt);
  const iv = base64ToBytes(bundle.iv);
  const ciphertext = base64ToBytes(bundle.ciphertext);
  const iterations = Number(bundle.iterations) || 250000;

  const key = await deriveKey(password, salt, iterations);
  const plainBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );

  return JSON.parse(decoder.decode(plainBuffer));
}
