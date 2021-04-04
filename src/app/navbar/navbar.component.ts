import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  usuario: firebase.User; //variable para almacenar el usuario

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

 //Funcion para desloguear
 logout(){
  this.auth.signOut();
}

}
