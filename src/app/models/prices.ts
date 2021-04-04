import { DocumentReference } from "@angular/fire/firestore";

export class Prices{
    id: string;
    name: string;
    cost: number;
    time: number;
    type: number;
    ref: DocumentReference;
}