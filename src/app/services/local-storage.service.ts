import { Injectable } from '@angular/core';
import { JSONSchema, StorageMap } from '@ngx-pwa/local-storage';

const schema: JSONSchema = {
  type: 'object',
  properties: {
    key: { type: 'string' },
    value: { type: 'string' }
  },
  required: ['key', 'value']
};

@Injectable()
export class LocalStorageService {

  /**
   * The main object to storage
   * key
   * value
   */
  private toStorage: any = {};
  private prefix = 'tbv01_';

  constructor(private localStorage: StorageMap) { }

  setValue(key: any, value: any) {
    this.toStorage.key = key;
    this.toStorage.value = value;

    this.localStorage.set(this.prefix + key, JSON.stringify(this.toStorage)).subscribe(() => {
      // console.log("Object storaged!");
      // console.log(this.toStorage);
    });
  }

  getValue(key: any): any {
    return this.localStorage.get(this.prefix + key);
  }

  clearAll(): void {
    this.localStorage.clear().subscribe(() => {});
  }

  removeItem(key: any): void {
    this.localStorage.delete(this.prefix + key).subscribe(() => {});
  }
}
