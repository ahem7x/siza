import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyNgModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';

import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { IntegrateComponent } from './home/integrate/integrate.component';
import { OrchestrateComponent } from './home/orchestrate/orchestrate.component';
import { MilliSecondsPipe } from './pipes/ms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CatalogitemComponent } from './home/catalogitem/catalogitem.component';
import { ConfigitemComponent } from './home/configitem/configitem.component';
import { OrgadminComponent } from './home/orgadmin/orgadmin.component';
import { BundlecatalogitemComponent } from './home/bundlecatalogitem/bundlecatalogitem.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { PiechartComponent } from './home/piechart/piechart.component';
import { BarchartComponent } from './home/barchart/barchart.component';
import { StackedBarlinechartComponent } from './home/stacked-barlinechart/stacked-barlinechart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    LoginComponent,
    IntegrateComponent,
    OrchestrateComponent,
    MilliSecondsPipe,
    CatalogitemComponent,
    ConfigitemComponent,
    OrgadminComponent,
    BundlecatalogitemComponent,
    DashboardComponent,
    PiechartComponent,
    BarchartComponent,
    StackedBarlinechartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyNgModule,
    FormsModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule
  ],
  providers: [],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
