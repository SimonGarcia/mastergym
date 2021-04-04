import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Client } from '../models/clients';

@Component({
  selector: 'app-select-client',
  templateUrl: './select-client.component.html',
  styleUrls: ['./select-client.component.scss']
})
export class SelectClientComponent implements OnInit {
  clients: Client[] = new Array<Client>();
  
  @Input('name') name: string;
  @Output('seleccionoCliente') seleccionoCliente = new EventEmitter;
  @Output('canceloCliente') canceloCliente = new EventEmitter;
 
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection<any>('clients').get().subscribe((resultado:any)=>{
      this.clients.length = 0;
      resultado.docs.forEach(item => {
        let client: Client = item.data();
        client.id = item.id;
        client.ref = item.ref;
        client.visible = false;
        this.clients.push(client);
      });
    })
  }

  //Habilita el buscador de clientes, mostrando solamente los que coincidan con la palabra escrita
  searchClient(name:string){
    this.clients.forEach((client)=>{
      if (client.name.toLowerCase().includes(name.toLowerCase())){
        client.visible = true;
      }
      else{
        client.visible = false;
      }
    });    
  }

  selectClient(client: Client){
    this.name = client.name + ' ' + client.lastname;
    this.clients.forEach((client)=>{
      client.visible = false;
    })
    this.seleccionoCliente.emit(client)
  }
    
  cancelClient(){
    this.name = undefined;
    this.canceloCliente.emit();
  }  

}
