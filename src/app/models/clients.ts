import { DocumentReference } from "@angular/fire/firestore";

export class Client{
    id: string;
    ref: DocumentReference;
    name: string;
    lastname: string;
    email: string;
    document: string;
    birthday: Date;
    image: string;
    visible: boolean;

    constructor(){}
}