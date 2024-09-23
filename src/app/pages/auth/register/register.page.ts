import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton, IonCol,
  IonContent, IonGrid,
  IonHeader,
  IonInput,
  IonInputPasswordToggle, IonLabel, IonRouterLink, IonRow, IonSpinner, IonText,
  IonTitle,
  IonToolbar, ToastController
} from '@ionic/angular/standalone';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  providers: [AuthService],
  imports: [IonContent, IonHeader,
    IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonInput, IonInputPasswordToggle, ReactiveFormsModule, IonLabel, IonSpinner, IonText, IonCol, IonGrid, IonRouterLink, IonRow, RouterLink]
})
export class RegisterPage {

  loading = false;
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController) {
  }

  async presentToast(props: { message: string, color: 'danger' | 'success' }) {
    const toast = await this.toastController.create({
      message: props.message,
      duration: 1500,
      position: 'bottom',
      color: props.color
    });

    await toast.present();
  }

  async onSubmit() {
    this.loading = true;
    const values = this.registerForm.value

    try {
      const ususarioRegistrado = await this.authService.registerWithEmail(values);
      console.log(ususarioRegistrado)
      this.loading = false;
      await this.presentToast({message: 'Usuario creado con exito', color: 'success'});
      await this.router.navigate(['/login'], {replaceUrl: true});
    } catch (e) {
      await this.presentToast({message: 'Error al crear el usuario', color: 'danger'});
    }


  }

}
