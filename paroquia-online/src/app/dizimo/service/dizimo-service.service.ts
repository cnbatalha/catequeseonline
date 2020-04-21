import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Dizimista } from '../model/dizimista';

@Injectable({
  providedIn: 'root'
})
export class DizimoServiceService {

  constructor(private db: AngularFireDatabase) { }

  insert(contato: Dizimista) {
    this.db.list('dizimista').push(contato)
      .then((result: any) => {
        console.log(result.key);
      });
  }
  
}
