import {Injectable} from '@angular/core';
import {IStorageService} from "../../core/storage/iStorage/i-storage.service";
import {Session} from "../../core/interfaces";
import {Storage} from '../../core/enums'
import {FirebaseAuthentication} from "@capacitor-firebase/authentication";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private iStorage: IStorageService) {
  }

  async actualizarPerfil(params: { nombre: string }): Promise<void> {
    const perfilActualizado = await FirebaseAuthentication.updateProfile({
      displayName: params.nombre
    })
    console.log("perfilActualizado", perfilActualizado);
  }

  async registerWithEmail(params: { email: string, password: string }): Promise<any> {
    const result = await FirebaseAuthentication.createUserWithEmailAndPassword({
      email: params.email,
      password: params.password,
    });
    return result.user;
  }

  async loginConUsuarioYPass(params: { email: string, password: string }): Promise<any> {
    const result = await FirebaseAuthentication.signInWithEmailAndPassword({
      email: params.email,
      password: params.password,
    });
    return result.user;
  }

  async getLoggedInUser() {
    const {user} = await FirebaseAuthentication.getCurrentUser();
    return user;
  }

  async signOut(): Promise<void> {
    await FirebaseAuthentication.signOut();
  }


  async setSession(session: Session): Promise<Session> {
    await this.iStorage.setValue(Storage.SESSION, session)
    return session;
  }

  async removeSession(): Promise<void> {
    await this.iStorage.removeValue(Storage.SESSION);
  }
}
