import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CarComponent } from './car/car.component';
import { FormsModule } from '@angular/forms';

import { CarService } from './services/car.service';
import { CarListComponent } from './car-list/car-list.component';
import { CarNewComponent } from './car-new/car-new.component';
import { CarModifComponent } from './car-modif/car-modif.component';
import { HomeComponent } from './home/home.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Je vais créer une constante de type Routes ce qui me permettra d’importer le type Routes de mon package @angular/router.
// La déclaration de RouterModule est aussi nécessaire mais se fera automatiquement lors de la déclaration de notre système de route peu après.


const appRoutes: Routes=[
  {
    path: 'cars',
    component: CarListComponent
  },
  {
    path: 'new',
    component: CarNewComponent
  },
  {
    path: 'modif/:id',
    component: CarModifComponent
  },
  {
    path: '',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    CarListComponent,
    CarNewComponent,
    CarModifComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  
  ],
  providers: [
    CarService,
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
