import { Component, OnInit } from '@angular/core';
import { Subscription } from '../models/subscriptions';
import { Client } from '../models/clients';
import { AngularFirestore } from '@angular/fire/firestore';
import { Prices } from '../models/prices';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  inscription: Subscription = new Subscription();
  clienteSeleccionado: Client = new Client();
  prices: Prices[] = new Array<Prices>();
  precioSeleccionado: Prices = new Prices();
  idPrecio:string = 'null';

  constructor(private db: AngularFirestore, private msj: MessagesService) { }

  ngOnInit(): void {
    this.db.collection('prices').get().subscribe((resultado:any)=>{
      resultado.docs.forEach((item)=>{
        let precio = item.data() as Prices;
        precio.id = item.id;
        precio.ref = item.ref;
        this.prices.push(precio);
      })
    })
  }

  asignarCliente(client: Client){
    this.inscription.client = client.ref;
    this.clienteSeleccionado = client;
  }

  eliminarCliente(){
    this.clienteSeleccionado = new Client();
    this.inscription.client = undefined;
  }

  save(){
    if (this.inscription.validar().esValido) {
      let inscripcionAgregar = {
        date: this.inscription.date,
        finalDate: this.inscription.finalDate,
        client: this.inscription.client,
        prices: this.inscription.prices,
        subtotal: this.inscription.subtotal,
        iva: this.inscription.iva,
        total: this.inscription.total
      }
      this.db.collection('subscriptions').add(inscripcionAgregar).then((resultado)=>{
        this.inscription = new Subscription();
        this.clienteSeleccionado = new Client();
        this.precioSeleccionado = new Prices();
        this.idPrecio = 'null';
        this.msj.successMessage('Success!', 'We have a new subscriber')
        
      })
    }
    else{
      this.msj.warningMessage("Warning!", this.inscription.validar().mensaje)
      
    }
    
  }

  seleccionarPrecio(id: string){

    if (id != "null") {
        
      //Se selecciona el plan de precio requerido
      this.precioSeleccionado = this.prices.find(x=> x.id == id)
      this.inscription.prices = this.precioSeleccionado.ref;
    
      //Calula el subtotal de la subscripcion
      this.inscription.subtotal = this.precioSeleccionado.cost;
      //Calcula el impuesto
      this.inscription.iva = this.inscription.subtotal *0.15;
      //Calcula el total
      this.inscription.total = this.inscription.subtotal + this.inscription.iva;
    
    
      //Se calcula la fecha de inicio y fecha final de la subscripion
      this.inscription.date = new Date();
    
      //Donde: 1 = dia, 2 = semana, 3 = quincena, 4 = mes, 5 = año
      if (this.precioSeleccionado.type == 1) {
        let anio: number = this.inscription.date.getFullYear();
        let mes: number = this.inscription.date.getMonth()
        let dias: number = this.precioSeleccionado.time + this.inscription.date.getDay() - 3;
        let fechaFinal = new Date(anio, mes, dias)
        this.inscription.finalDate = fechaFinal;
        
      }
      if (this.precioSeleccionado.type == 2) {
        let dias: number = this.precioSeleccionado.time *7;
        let fechaFinal = new Date(this.inscription.date.getFullYear(),this.inscription.date.getMonth(), this.inscription.date.getDay() - 3 + dias)
        this.inscription.finalDate = fechaFinal;
      }
      if (this.precioSeleccionado.type == 3) {
        let dias: number = this.precioSeleccionado.time *15;
        let fechaFinal = new Date(this.inscription.date.getFullYear(),this.inscription.date.getMonth(), this.inscription.date.getDay() - 3 + dias)
        this.inscription.finalDate = fechaFinal;
      }
      if (this.precioSeleccionado.type == 4) {
        let anio: number = this.inscription.date.getFullYear()
        let meses = this.precioSeleccionado.time + this.inscription.date.getMonth();
        let dia: number =  this.inscription.date.getDay() -3;
        let fechaFinal = new Date(anio, meses, dia);
        this.inscription.finalDate = fechaFinal;
      }
      if (this.precioSeleccionado.type == 5) {
        let anio: number = this.inscription.date.getFullYear() + this.precioSeleccionado.time;
        let meses = this.inscription.date.getMonth();
        let dia: number =  this.inscription.date.getDay() -3;
        let fechaFinal = new Date(anio, meses, dia);
        this.inscription.finalDate = fechaFinal;
      }
  
    }
    else{
      this.precioSeleccionado = new Prices();
      this.inscription.prices = null;
      this.inscription.subtotal = 0;
      this.inscription.total = 0;
      this.inscription.date = null;
      this.inscription.finalDate = null;
      this.inscription.iva = 0;

    }
  
  }

}
