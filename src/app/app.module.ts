import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { environment } from '../environments/environment';
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClientListComponent } from './client-list/client-list.component';
import { AddClientComponent } from './add-client/add-client.component';
import { MessagesService } from './services/messages.service';
import { PricesComponent } from './prices/prices.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { SelectClientComponent } from './select-client/select-client.component';
import { SubcriptionsListComponent } from './subcriptions-list/subcriptions-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ClientListComponent,
    AddClientComponent,
    PricesComponent,
    SubscriptionsComponent,
    SelectClientComponent,
    SubcriptionsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    AngularFireStorageModule,
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore,
    MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
