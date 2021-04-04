import { DocumentReference } from "@angular/fire/firestore";

export class Subscription {
    date: Date;
    finalDate: Date;
    client: DocumentReference;
    prices: DocumentReference;
    subtotal: number;
    iva: number;
    total: number;
    
    constructor(){
        this.date = null;
        this.finalDate = null;
        this.client = this.client;
        this.prices = this.prices;
        this.subtotal = this.subtotal;
        this.iva = this.iva;
        this.total = this.total;
        
    }

    validar():any{
        let respuesta = {
            esValido: false,
            mensaje: ''
        }
        if(this.client == null || this.client == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = "Select a client"
            return respuesta;
        }
        if(this.prices == null || this.prices == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = "Select a subscription's price"
            return respuesta;
        }
        if(this.date == null || this.date == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = "You don't have final date"
            return respuesta;
        }
        
        if(this.subtotal == null || this.subtotal == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = "Error in subtotal"
            return respuesta;
        }
        if(this.iva == null || this.iva == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = "Error in IVA"
            return respuesta;
        }
        if(this.total == null || this.total == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = "Error in total"
            return respuesta;
        }
        respuesta.esValido = true;
        return respuesta;

    }

}