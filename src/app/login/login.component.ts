import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

// Se crea un Form Builder para validar que no se envien los datos
// hasta que los campos esten llenos
export class LoginComponent implements OnInit {
  
  //Variables
  formLogin: FormGroup;
  validData: boolean = true;
  errorText: string = '';
  
  constructor(private fb: FormBuilder, public auth: AngularFireAuth,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      //Valida que el email sea tipo email y que sea requerido
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      //Valida que la password sea requerida
      password: ['', Validators.required]
    });
  }

    //Funcion para el login con usuario y contraseña
    login(){
      if(this.formLogin.valid){
        this.validData = true;
        this.spinner.show();// Muestra el spinner de carga
        this.auth.signInWithEmailAndPassword(this.formLogin.value.email, this.formLogin.value.password)
        .then((usuario)=>{
          console.log(usuario);
          
          setTimeout(() => {
            this.spinner.hide();
          }, 2000);

          //Lanza error si existe y muestra en pantalla
        }).catch((error)=>{
          this.validData = false;
          this.errorText = error.message;

          setTimeout(() => {
            this.spinner.hide();
          }, 2000);
        });
      } 
      else{
        this.validData = false;
        this.errorText = 'Incorrect email or password...';
      }     
    }



}
