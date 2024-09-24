import {Component} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonFab,
  IonFabButton, IonIcon, IonButtons, IonList
} from '@ionic/angular/standalone';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {add, logOut, logOutOutline} from "ionicons/icons";
import {addIcons} from "ionicons";
import {CrearListaCompraModalComponent} from "./components/crear-lista-compra-modal/crear-lista-compra-modal.component";
import {Dialog} from "@capacitor/dialog";
import {ListaService} from "../../services/lista/lista.service";
import {DocumentData, DocumentSnapshot} from "@capacitor-firebase/firestore";
import {ListItemComponent} from "./components/list-item/list-item.component";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  providers: [ListaService],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFab, IonFabButton, IonIcon, IonButtons, CrearListaCompraModalComponent, IonList, ListItemComponent, NgForOf],
})
export class HomePage {

  usuarioActual: any = null
  modalAbierto = false;
  items: DocumentSnapshot<DocumentData>[] = []

  constructor(
    private authService: AuthService,
    private listaService: ListaService,
    private router: Router,) {
    addIcons({add, logOutOutline})
    this.init();
  }

  async init() {
    this.usuarioActual = await this.authService.getLoggedInUser();
    await this.getItemsDeFirebase();
  }

  async getItemsDeFirebase() {
    this.items = await this.listaService.get();
  }

  async onLogoutPressed() {
    const {value} = await Dialog.confirm({
      title: 'Cerrar sesión',
      message: 'Está seguro que desea cerrar sesión?',
      okButtonTitle: 'SI',
      cancelButtonTitle: 'Cancelar'
    })
    if (value) {
      await this.logout();
    }
  }

  async onGuardarPresionado(dato: string) {
    this.modalAbierto = false;
    await this.listaService.create(dato);
    console.log(dato);
  }

  async logout(): Promise<void> {
    await this.authService.signOut();
    await this.router.navigate(['/login'], {replaceUrl: true});
  }

  abrirCerrarElModal() {
    this.modalAbierto = !this.modalAbierto;
  }

  deleteItemPressed(path: string) {

  }

  editItemPressed(path: string) {

  }
}
