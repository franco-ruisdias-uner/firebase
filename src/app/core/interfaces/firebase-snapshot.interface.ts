export interface FirebaseSnapshot<T> {
  data: T;
  id: string;
  path: string;
}
