import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ServicedatosService } from 'src/app/services/servicesdatos.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  username:string;
  constructor(
    private storageService:ServicedatosService,
    private router: Router,
    private appComponent: AppComponent
  ) { 
    
  }

  ngOnInit() {
    this.appComponent.showMenu = true
    this.username=''
    this.storageService.getUser().then(user =>{
      this.username = user.nombre.charAt(0).toUpperCase() + user.nombre.slice(1) 
    })
  }
}
