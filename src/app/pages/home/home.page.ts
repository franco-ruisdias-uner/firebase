import {Component} from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput} from '@ionic/angular/standalone';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, FormsModule, ReactiveFormsModule, IonInput],
})
export class HomePage {

  usuarioActual: any = null

  profileForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
  })

  constructor(
      private authService: AuthService,
      private router: Router,) {
    this.init();
  }

  async init() {
    this.usuarioActual = await this.authService.getLoggedInUser();
    console.log(this.usuarioActual);
    this.profileForm.patchValue({nombre: this.usuarioActual.displayName});
  }


  async onSubmit() {
    const values = this.profileForm.value;
    await this.authService.actualizarPerfil(values);
  }

  async logout() {
    await this.authService.signOut();
    await this.router.navigate(['/login'], {replaceUrl: true});
  }
}
