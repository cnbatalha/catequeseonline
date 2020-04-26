import { Component, OnInit } from '@angular/core';
import { DizimoServiceService } from './service/dizimo-service.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dizimo',
  templateUrl: './dizimo.component.html',
  styleUrls: ['./dizimo.component.css']
})
export class DizimoComponent implements OnInit {
  lista: Observable<any[]>;
  constructor(private dizimistaService: DizimoServiceService) { }

  ngOnInit(): void {
    this.lista = this.dizimistaService.getLista();
  }

}
