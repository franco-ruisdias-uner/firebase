import {Injectable} from '@angular/core';
import {User} from "../../core/interfaces";
import {FirebaseFirestore} from "@capacitor-firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  async create(user: User): Promise<User> {
    const userCreated = await FirebaseFirestore.addDocument({
      reference: 'user',
      data: user
    });
    console.log(userCreated)
    return user;
  }

  async update(user: User): Promise<User> {
    let aInsertar = {...user}
    delete aInsertar.password;
    delete aInsertar.id;
    const usuarioAcutalizado = await FirebaseFirestore.setDocument({
      reference: `user/${user.id}`,
      data: aInsertar,
      merge: true
    })
    console.log(usuarioAcutalizado)
    return user;
  }

  async removeUser(user: User): Promise<void> {
    await FirebaseFirestore.deleteDocument({
      reference: `user/${user.id}`,
    })
  }

  async getAll(): Promise<any> {
    const {snapshots} = await FirebaseFirestore.getCollection({
      reference: 'users',
      compositeFilter: {
        type: 'and',
        queryConstraints: [
          {
            type: 'where',
            fieldPath: 'email',
            opStr: '==',
            value: 'test@test.com'
          }
        ]
      },
      queryConstraints: [
        {
          type: 'limit',
          limit: 10
        }
      ]
    })
  }

  async getUser(user: User): Promise<User> {
    const {snapshot} = await FirebaseFirestore.getDocument({
      reference: `user/${user.id}`,
    });

    return snapshot.data as User;
  }
}
