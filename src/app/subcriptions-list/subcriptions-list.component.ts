import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from '../models/subscriptions';

@Component({
  selector: 'app-subcriptions-list',
  templateUrl: './subcriptions-list.component.html',
  styleUrls: ['./subcriptions-list.component.scss']
})
export class SubcriptionsListComponent implements OnInit {
  inscripciones: any[] = [];


  constructor(private db: AngularFirestore) {

   }

  ngOnInit(): void {
    this.inscripciones.length = 0;
    this.db.collection('subscriptions').get().subscribe((resultado:any)=>{
      resultado.forEach(inscription => {

        let inscripcionObtenida = inscription.data();
        inscripcionObtenida.id = inscription.id;

        this.db.doc(inscription.data().client.path).get().subscribe((cliente:any)=>{
          inscripcionObtenida.clienteObtenido = cliente.data();
          inscripcionObtenida.date = new Date(inscripcionObtenida.date.seconds *1000)
          inscripcionObtenida.finalDate = new Date(inscripcionObtenida.finalDate.seconds *1000)
          this.inscripciones.push(inscripcionObtenida);
        })
      });
    })
  }

}
