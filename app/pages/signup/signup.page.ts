import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Storage } from '.angular'; 
import { ServicedatosService, Docente } from 'src/app/services/servicesdatos.service';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {
 
  docentes:Docente[] = [];
  newDocente: Docente = <Docente>{};
  @ViewChild('myList')myList:IonList;

  registroForm: FormGroup
  formularioValido = false;
  asignaturasInput1: string[] = [];
  asignaturasInput2: string[] = [];
  
  seleccionAsignatura1: string = "";
  seleccionAsignatura2: string = "";
  

  opcionesAsignaturas2: string[] = this.asignaturasInput2;
  
  asignaturas = []
  options=[
    {
      name : 'DOCENTE', isChecked: false
    },
    {
      name : 'ESTUDIANTE', isChecked: false
    }
  ]


  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private storageService:ServicedatosService,
    private plt: Platform,
    private toastController: ToastController,
    private router: Router,
    private appComponent: AppComponent
  ) { 
    this.appComponent.showMenu = false;
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(8)]],
      asignatura1:['', Validators.required],
      asignatura2:['', Validators.required],
    });
    this.plt.ready().then(()=>{
      this.loadDatos();
    })
  }
  

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/asignaturas')
      .subscribe(res => {
        this.asignaturas = res
        for(let asignatura of res){
          this.asignaturasInput1.push(asignatura.name)
          this.asignaturasInput2.push(asignatura.name)
        }
       })
       
  }
  
  _ionChange(event:Event){
    console.log(event)
  }
  
  unCheck(value){
    this.options.forEach( option => {
      if (option.name != value ){
        option.isChecked = false
      }
    } )
  }
  
  onAsignatura1Change() {
    if (this.newDocente.asignatura1) {
      // Filtra las opciones disponibles en el segundo campo
      this.opcionesAsignaturas2 = this.asignaturasInput2.filter(
        (asignatura) => asignatura !== this.newDocente.asignatura1
        );
      } else {
        // Restaura todas las opciones en el segundo campo si no se ha seleccionado ninguna en el primero
        this.opcionesAsignaturas2 = this.asignaturasInput2;
      }
  }

  loadDatos(){
    this.storageService.getDatos().then(docentes =>{
      this.docentes=docentes;
    })
    }  

  addDocente(){
    this.newDocente.id = Date.now();
    
    this.storageService.addDatos(this.newDocente).then(dato =>{
      this.newDocente = <Docente>{};
      this.showToast('Docente Agregado!')
      this.loadDatos();
    })
  }

  updateDocente(docente:Docente){
    docente.nombre = `UPDATED: ${docente.nombre} ${docente.apellido}`
    this.storageService.updateDatos(docente).then(item => {
      this.showToast('Docente Actualizado')
      this.myList.closeSlidingItems()
      this.loadDatos();
    })
  }

  deletDocente(docente: Docente){
    this.storageService.deleteDatos(docente.id).then(item => {
      this.showToast('Docente Eliminado')
      this.myList.closeSlidingItems()
      this.loadDatos()
    })
  }
  async showToast(msg){
    const toast = await this.toastController.create({
      message:msg,
      duration:2000
    });
    toast.present();
  }
  onSubmit() {
    if (this.registroForm.valid) {
      //this.formularioValido = true;
      this.addDocente();
      console.log('Formulario Valido')
      const formData = this.registroForm.value.nombre;
      this.router.navigate(['/login'])
      // Realizar la solicitud al servidor aquí
    } else {
      console.log('Formulario Invalido')
      // El formulario no es válido, muestra errores o mensajes de validación al usuario
    }
  }
  onChange(){
    this.formularioValido = this.registroForm.valid
  }
}
