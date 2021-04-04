import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from '../services/messages.service';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  //Variables
  formClient: FormGroup;
  uploadPercent: number = 0;
  imageUrl:string = '';
  esEditable: boolean = false;
  id: string = '';

  constructor(
    private fb: FormBuilder, 
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private msj: MessagesService) 
    { }

  ngOnInit(): void {
  
    // Crea las validaciones del formulario
    this.formClient = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.email, Validators.required
      ])],
      document: [''],
      birthday: ['', Validators.required],
      image: ['', Validators.required]
    });

    //Obtiene los datos de la db y los inserta en el formulario para editarlo
    this.id = this.activeRoute.snapshot.params.clientID;

    if(this.id != undefined){
      this.esEditable = true;
      this.db.doc<any>('clients/' + this.id).valueChanges().subscribe((client)=>{
      
        this.formClient.setValue({
          name: client.name,
          lastname: client.lastname,
          email: client.email,
          document: client.document,
          birthday: new Date(client.birthday.seconds *1000).toISOString().substring(0,10),
          image: ''
        })
  
        this.imageUrl = client.image
  
      });
    }
  }

  //Agrega los datos del formulario a la Base de Datos
  add(){
    this.formClient.value.birthday = new Date(this.formClient.value.birthday);
    this.formClient.value.image = this.imageUrl;
    this.db.collection('clients').add(this.formClient.value).then((termino) =>{
      //hace la llamada del servicio SweetAlert para arrojar un mensaje si se añadio correctamente
      this.msj.successMessage('Success!', 'Added successfully...');
    });
    console.log(this.formClient.value);
    
  }

  //edita los datos de la base de datos.
  edit(){
    this.formClient.value.image = this.imageUrl;
    this.formClient.value.birthday = new Date(this.formClient.value.birthday);
    
    this.db.doc('clients/' + this.id).update(this.formClient.value).then(()=>{
       //hace la llamada del servicio SweetAlert para arrojar un mensaje si se agrego correctamente
      this.msj.successMessage('Success!', 'Edited successfully...');
    }).catch(()=>{
       //hace la llamada del servicio SweetAlert para arrojar un mensaje si ocurrio un error
      this.msj.errorMessage('Error!', 'An error has ocurred...');
    });
  }


  //Carga las imagenes a Firebase/Storage
  uploadImg(event){
    
    if(event.target.files.length > 0){

      //Obtiene la fecha actual como nombre de imagen
      let fileName = new Date().getTime().toString();
      let file = event.target.files[0];
      //Obtiene la extension de la imagen a subir
      let extension = file.name.toString().substring(file.name.toString().lastIndexOf('.'));
      //Obtiene la imagen con el nuevo nombre y la extension a la ruta creada en firebase
      let path = 'clients/' + fileName + extension;
  
      //Obtiene la referencia de la imagen y la carga a firebase.
      const ref = this.storage.ref(path);
      const task = ref.put(file);
      task.then((obj)=>{
          console.log('Imagen Subida');
    
          //Obtiene la URL de la imagen almacenada en el Storage de Firebase para guardarla
          //en la base de datos.
          ref.getDownloadURL().subscribe((url)=>{
            this.imageUrl = url;
          })
      });
      //Indica el porcentaje de tiempo que tarda la iamgen en subirse
      task.percentageChanges().subscribe((porcentaje)=>{
        this.uploadPercent = parseInt(porcentaje.toString());
        
      })
    }

  }

}
