import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

import { Dizimista } from '../dizimo/model/dizimista';

@Component({
  selector: 'app-dizimo-cad',
  templateUrl: './dizimo-cad.component.html',
  styleUrls: ['./dizimo-cad.component.css']
})
export class DizimoCadComponent implements OnInit {
  dmz: Dizimista;

  constructor(private firebaseService: FirebaseService) { }
  
  ngOnInit(): void {
    this.dmz = new Dizimista();
    console.log("Chamou init");
  }

  onSubmit(): void {
    console.log("Chamou submit");
    this.firebaseService.insert();
  }
}
