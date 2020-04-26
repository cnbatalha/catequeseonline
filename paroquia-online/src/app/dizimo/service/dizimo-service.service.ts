import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

import { Dizimista } from '../model/dizimista';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class DizimoServiceService {

  dizimistaRef: AngularFirestoreCollection<Dizimista>;
  successMsg = 'Data successfully saved.';
  items: Observable<Dizimista[]>;

  // constructor(private db: AngularFireDatabase) { }
  constructor(private db: AngularFirestore) {
    this.dizimistaRef = this.db.collection<Dizimista>('dizimistas');
    this.db.collection
   }

  getLista() {
    this.items = this.dizimistaRef.valueChanges();
    return this.items;

    let tasks: Observable<any[]>;

    tasks = this.dizimistaRef.snapshotChanges();
    /*
    .map(actions => {
   return actions.map(a => {
     //Get document data
     const data = a.payload.doc.data() as Dizimista;
     //Get document id
     const id = a.payload.doc.id;
     //Use spread operator to add the id to the document data
     return { id, data };
   });
   */
   return tasks;
  }

  insert(dizimista: Dizimista) {

    this.dizimistaRef.add(JSON.parse(JSON.stringify(dizimista)))
        .then( _ => alert(this.successMsg));
    //return this.db.collection<Dizimista>('dizimista').add(dizimista)
    //      .then( _ => alert(this.successMsg));

    /*
    this.db.list('dizimista').push(contato)
      .then((result: any) => {
        console.log(result.key);
      });
      */
  }
  
}
