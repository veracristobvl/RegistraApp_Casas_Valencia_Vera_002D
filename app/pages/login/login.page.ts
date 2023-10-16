import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ServicedatosService } from 'src/app/services/servicesdatos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string ='';
  contrasena:string ='';
  emailInvalido:boolean = false;
  contrasenaInvalida:boolean = false;
  credencialesValidas :boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private storageService:ServicedatosService,
    private router: Router,
    private appComponent: AppComponent
  ) {
    this.appComponent.showMenu = false; 
   }

  ngOnInit() {
    const name = 'login'

  }
  onSubmit() {
    //console.log(this.storageService.verificarLlgin(this.email, this.contrasena));
    this.validarLogin()
    
  }
   
  async validarLogin(  ){
    console.log(this.contrasena)
    const docentes = await this.storageService.getDatos()
    const usuarioEncontrado = docentes.find(user =>{
      this.emailInvalido =user.email !== this.email?  true: false
      this.contrasenaInvalida =  user.email == this.email &&  user.contrasena !== this.contrasena?true: false
      this.storageService.onLoginSuccess(user)
      return user.email == this.email && user.contrasena == this.contrasena
    })
    if (usuarioEncontrado){
      this.router.navigate(['/about'])
    }
    else{
      console.log('Usuario no encontrado');
    }
  }

  
  

}
