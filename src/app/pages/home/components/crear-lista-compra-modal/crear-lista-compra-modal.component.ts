import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-crear-lista-compra-modal',
  templateUrl: './crear-lista-compra-modal.component.html',
  styleUrls: ['./crear-lista-compra-modal.component.scss'],
  standalone: true,
  imports: [
    IonModal,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CrearListaCompraModalComponent {

  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() guardar = new EventEmitter<string>();

  itemControl = new FormControl('', Validators.required);

  constructor() {
  }

  cancelar() {
    this.isOpenChange.emit(false);
  }

  confirmar() {
    if (this.itemControl.valid && this.itemControl.value) {
      const valor = this.itemControl.value;
      this.itemControl.reset()
      this.guardar.emit(valor);
    }

  }

}
