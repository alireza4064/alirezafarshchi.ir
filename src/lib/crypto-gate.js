/* ==========================================================================
   Authenticated Encryption Engine for Protected Case Studies
   Supports both:
   - AES-256-GCM + PBKDF2-SHA256 (Web Crypto local tool)
   - AES-256-CBC + HMAC-SHA256 (Encrypt-then-MAC, PBKDF2-SHA256)
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

async function deriveGcmKey(password, salt, iterations = 250000) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function deriveCbcHmacKeys(password, salt, iterations = 100000) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    keyMaterial,
    512
  );

  const raw = new Uint8Array(bits);
  const encKey = await crypto.subtle.importKey(
    "raw",
    raw.slice(0, 32),
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );
  const macKey = await crypto.subtle.importKey(
    "raw",
    raw.slice(32, 64),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  return { encKey, macKey };
}

export async function encryptCaseStudyPayload(dataObject, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const iterations = 250000;
  const key = await deriveGcmKey(password, salt, iterations);

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

export async function decryptCaseStudyPayload(bundle, password) {
  if (!bundle || !bundle.ciphertext || !bundle.salt || !bundle.iv) {
    throw new Error("INVALID_BUNDLE");
  }

  const salt = base64ToBytes(bundle.salt);
  const iv = base64ToBytes(bundle.iv);
  const ciphertext = base64ToBytes(bundle.ciphertext);
  const iterations = Number(bundle.iterations) || 100000;

  if (bundle.algorithm === "AES-256-CBC-HMAC-SHA256") {
    const mac = base64ToBytes(bundle.mac || "");
    const { encKey, macKey } = await deriveCbcHmacKeys(password, salt, iterations);

    const macInput = new Uint8Array(iv.length + ciphertext.length);
    macInput.set(iv, 0);
    macInput.set(ciphertext, iv.length);

    const valid = await crypto.subtle.verify("HMAC", macKey, mac, macInput);
    if (!valid) {
      throw new Error("INVALID_PASSWORD");
    }

    const plainBuffer = await crypto.subtle.decrypt(
      { name: "AES-CBC", iv },
      encKey,
      ciphertext
    );
    return JSON.parse(decoder.decode(plainBuffer));
  }

  const key = await deriveGcmKey(password, salt, iterations);
  const plainBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );
  return JSON.parse(decoder.decode(plainBuffer));
}
