import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MessagesService } from '../services/messages.service';
import { Prices } from '../models/prices';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {
  priceFrom: FormGroup;
  prices: Prices[] = new Array<Prices>();
  isEdit: boolean = false;
  id: string;


  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private msj: MessagesService
    ) { }

  ngOnInit(): void {
    //Validaciones de formulario
    this.priceFrom = this.fb.group({
      name: ['', Validators.required],
      cost: ['', Validators.required],
      time: ['', Validators.required],
      type: ['', Validators.required]
    })
    this.showPrices()
  }

  showPrices(){
    this.db.collection<Prices>('prices').get().subscribe((resultado:any)=>{
      this.prices.length = 0;
      resultado.docs.forEach((dato)=>{
        let price = dato.data() as Prices;
        price.id = dato.id;
        price.ref = dato.ref;
        this.prices.push(price);
      })
    })
  }


  //agregar a la base de datos
  add(){
    this.db.collection<Prices>('prices').add(this.priceFrom.value).then(()=>{
      this.msj.successMessage('Success!', 'Added successfully...');
      this.priceFrom.reset();
      this.showPrices()
    }).catch(()=>{
      this.msj.errorMessage('Error!', 'An error has ocurred...');
    })
  }

  editPrice(price: Prices){
    this.isEdit = true;
    this.priceFrom.setValue({
      name: price.name,
      cost: price.cost,
      time: price.time,
      type: price.type
    })
    this.id = price.id;
  }

  edit(){
    this.db.doc('prices/' + this.id).update(this.priceFrom.value).then(()=>{
      this.msj.successMessage('Success!', 'Edit successfully...');
      this.priceFrom.reset();
      this.isEdit = false;
      this.showPrices()
    }).catch(()=>{
      this.msj.errorMessage('Error!', 'An error has ocurred...');
    })
      
  }
}
