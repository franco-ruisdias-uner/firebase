import {Injectable} from '@angular/core';
import {DocumentData, DocumentSnapshot, FirebaseFirestore} from "@capacitor-firebase/firestore";

@Injectable()
export class ListaService {

  constructor() {
  }

  async get(): Promise<DocumentSnapshot<DocumentData>[]> {
    const lista = await FirebaseFirestore.getCollection({
      reference: 'lista',
    })
    const snapshots: DocumentSnapshot<DocumentData>[] = lista.snapshots
    console.log(snapshots)
    return snapshots
  }

  async create(item: string): Promise<void> {
    await FirebaseFirestore.addDocument({
      reference: 'lista',
      data: {item}
    })
  }
}
