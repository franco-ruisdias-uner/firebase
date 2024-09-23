import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {User} from "../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class IStorageService {

  private storage: Storage | null = null;

  constructor(private ionicStorage: Storage) {
    this.initStorage();
  }


  async initStorage() {
    this.storage = await this.ionicStorage.create();
    console.log(`DRIVER: ${this.storage.driver}`);
    //this.storage.defineDriver()
  }


  async getValue<T>(key: string): Promise<T> {
    if (!this.storage) {
      throw new Error('Storage no fue inicializado')
    }
    const value = await this.storage.get(key);
    return value as T;
  }

  async setValue<T>(key: string, value: T): Promise<T> {
    if (!this.storage) {
      throw new Error('Storage no fue inicializado')
    }
    await this.storage.set(key, value);
    return value
  }

  async removeValue(key: string) {
    if (!this.storage) {
      throw new Error('Storage no inicializado')
    }
    return this.storage.remove(key);
  }

}
