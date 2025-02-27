import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomechartComponent } from './homechart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { environment } from '../environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListingComponent } from './listing/listing.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HomechartComponent,
    DashboardComponent,
    ListingComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    const baseHref = environment.APP_CONTEXT;
    // Set base path dynamically
    document.querySelector('base')?.setAttribute('href', baseHref);
  }
}
