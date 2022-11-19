import { Injectable } from '@angular/core';
import { Crypto } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorage {
  constructor(private crypto: Crypto) {}

  setItem(key: string, value: string) {
    const encoded = this.crypto.encrypt(value);
    return localStorage.setItem(key, encoded);
  }

  getItem(key: string) {
    const encoded = localStorage.getItem(key) || '';
    return this.crypto.decrypt(encoded)
  }

  removeItem(key: string) {
    return localStorage.removeItem(key);
  }
}
