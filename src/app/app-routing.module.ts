import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListingComponent } from './listing/listing.component'
import { HomechartComponent } from '../app/homechart.component';
import { PagenotfoundComponent } from '../app/pagenotfound/pagenotfound.component'

const routes: Routes = [
  { path: '', component: HomechartComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'listing', component: ListingComponent },
  //Wild Card Route for 404 request 
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent }, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
