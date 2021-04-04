import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './add-client/add-client.component';
import { ClientListComponent } from './client-list/client-list.component';
import { PricesComponent } from './prices/prices.component';
import { SubcriptionsListComponent } from './subcriptions-list/subcriptions-list.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'subscriptions', pathMatch: 'full'
  },
  {
    path: 'subscriptions', component: SubscriptionsComponent
  },
  {
    path: 'subscription-list', component: SubcriptionsListComponent
  },
  {
    path: 'client-list', component: ClientListComponent
  },
  {
    path: 'add-client', component: AddClientComponent
  },
  {
    path: 'add-client/:clientID', component: AddClientComponent
  },
  {
    path: 'prices', component: PricesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
