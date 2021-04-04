import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }


  errorMessage(titulo:string, message:string){
    Swal.fire({
      title: titulo,
      text: message,
      icon: 'error',
      confirmButtonText: 'Oh no!'
    });
  }

  successMessage(titulo:string, message:string){
    Swal.fire({
      title: titulo,
      text: message,
      icon: 'success',
      confirmButtonText: 'Cool'
    });
  }

  warningMessage(titulo:string, message:string){
    Swal.fire({
      title: titulo,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Ok!'
    });
  }
}
