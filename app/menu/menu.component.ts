import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicedatosService } from 'src/app/services/servicesdatos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  constructor(private storageService:ServicedatosService,) { }

  ngOnInit() {

  }
  onLogout(){
    this.storageService.onLogout()
  }

}
