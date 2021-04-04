import { Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth'
import firebase from 'firebase/app';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mastergym';
  usuario: firebase.User; //variable para almacenar el usuario
  cargando: boolean = true;
  
  //Se inyecta el componente de Angular Fire Auth
  constructor(private auth: AngularFireAuth, private spinner: NgxSpinnerService){

    //Le agrega un timeout a la optencion del usuario para mostrar una dialogo de carga
    this.auth.user.subscribe((usuario)=>{
      this.spinner.show();// Muestra el spinner de carga
      setTimeout(() => {
        this.cargando = false;
        this.usuario = usuario;
        this.spinner.hide();  
      }, 2000);
    });
    
  }

}
