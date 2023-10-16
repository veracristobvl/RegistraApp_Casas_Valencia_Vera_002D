import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage'

export interface Docente { 
  id : number;
  nombre: string,
  apellido: string,
  email:string,
  telefono:string,
  contrasena:string,
  asignatura1:string;   
  asignatura2:string; 
}

const ITEMS_KEY ='my-datos'

@Injectable({
  providedIn:'root'
})


export class ServicedatosService {
  private _storage:Storage
  
  constructor(private storage:Storage){
    this.init();
    }

    async init(){
      const storage = await this.storage.create();
      this._storage = storage
    }


    // FUNCION PARA AGREGAR DOCENTE (CREATE)
    async addDatos(docente:Docente):Promise<any>{
      return this.storage.get(ITEMS_KEY).then( (docentes:Docente[])=>{
        if (docentes){
          // console.log(docentes)
          docentes.push(docente);
          return this.storage.set(ITEMS_KEY,docentes)
        }
        else{
          return this.storage.set(ITEMS_KEY,[docente])
        }
      } )
   

    }
    // FUNCION PARA OBTENER DATOS (GET)
    async getDatos(): Promise<Docente[]>{
      return this.storage.get(ITEMS_KEY)
    }

    // FUNCION PARA ACTUALIZAR DATOS (UPDATE)
    async updateDatos(docente : Docente): Promise<any>{
      return this.storage.get(ITEMS_KEY).then((docentes : Docente[])=> {
        if ( !docentes || docentes.length==0 ){
          return null
        }
        let newDocente : Docente[] = []
        for (let i of docentes){
          if (i.id === docente.id){
            newDocente.push(docente)
          }
          else{
            newDocente.push(i)
          }
        }
        return this.storage.set(ITEMS_KEY,newDocente)
      })
    }

    // FUNCION PARA ELIMINAR (DELETE)
    async deleteDatos(id:number):Promise <any>{
      return this.storage.get(ITEMS_KEY).then((docentes : Docente[])=>{
        if ( !docentes || docentes.length==0 ){
          return null
        }
        let toKeep: Docente[] = []
        for(let i of docentes){
          if (i.id !== id){
            toKeep.push(i)
          }
        }
        return this.storage.set(ITEMS_KEY, toKeep)
      })
    }
    async onLoginSuccess(user) {
      // Almacena los datos del usuario en el almacenamiento local
      await this.storage.set('user', user);
    }
    async onLogout() {
      // Almacena los datos del usuario en el almacenamiento local
      await this.storage.remove('user');
    }
    async getUser() {
      return this.storage.get('user');
    }
    // ionViewWillEnter() {
    //   this.storage.get('user').then((user) => {
    //     if (user) {
    //       // El usuario existe en el almacenamiento, puedes mostrar su nombre
    //       this.userName = user.name;
    //     }
    //   });
    
}