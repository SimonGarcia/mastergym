import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  clients:any[] = new Array<any>();

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
   /*  this.db.collection('clients').valueChanges().subscribe((resultado)=>{
      this.clients = resultado;
    }); */

    this.clients.length = 0;
    this.db.collection('clients').get().subscribe((resultado:any)=>{
    
      resultado.docs.forEach((item)=>{
    
        let client = item.data();
        client.id = item.id;
        client.ref = item.ref;
       
        this.clients.push(client)
     });
    });
  }

}
