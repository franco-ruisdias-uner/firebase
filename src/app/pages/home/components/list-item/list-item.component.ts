import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DocumentData, DocumentSnapshot} from "@capacitor-firebase/firestore";
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {trash, pencil} from "ionicons/icons";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class ListItemComponent {

  @Input() item: DocumentSnapshot<DocumentData> | null = null
  @Output() deletePressed = new EventEmitter<string>();
  @Output() editPressed = new EventEmitter<string>();

  constructor() {
    addIcons({trash, pencil})
  }

  getLabel() {
    return this.item?.data ? this.item.data['item'] : '';
  }

  onEdit() {
    this.editPressed.emit(this.item?.path)
  }

  onDelete() {
    this.deletePressed.emit(this.item?.path)
  }

}
