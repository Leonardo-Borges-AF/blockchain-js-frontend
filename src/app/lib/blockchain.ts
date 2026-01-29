import { Blockchain, Transaction } from 'blockchain-src';
import pkg from 'elliptic';

const EC = pkg.ec;
const ec = new EC('secp256k1');

export function generateKeyPair(): {
  keyPair: { getPublic: (enc: string) => string; getPrivate: (enc: string) => string; sign: (hash: string, enc: string) => { toDER: (enc: string) => string } };
  publicKey: string;
  privateKey: string;
} {
  const key = ec.genKeyPair();
  return {
    keyPair: key,
    publicKey: key.getPublic('hex'),
    privateKey: key.getPrivate('hex'),
  };
}

export function keyFromPrivate(privateKeyHex: string): {
  getPublic: (enc: string) => string;
  sign: (hash: string, enc: string) => { toDER: (enc: string) => string };
} {
  return ec.keyFromPrivate(privateKeyHex);
}

export { Blockchain, Transaction };
