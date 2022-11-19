import { Injectable } from '@angular/core';
import { environment } from 'apps/school/src/environments/environment';
import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class Crypto {
  private secret = environment.crypto;

  encrypt(value: string) {
    return AES.encrypt(value, this.secret).toString()
  }

  decrypt(value: string) {
    return AES.decrypt(value, this.secret).toString(enc.Utf8)
  }
}
