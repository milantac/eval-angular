import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, OnDestroy {
  cars:any = [];

  carSubsrcription: Subscription;  //  On déclare la « souscription » à la liste

  constructor(
    private Car: CarService
  ){}


  ngOnInit(){
   this.carSubsrcription = this.Car.carSubject.subscribe((value)=>{
      this.cars = value;
   });
   this.Car.emitCarSubject(); 
  }
   
// On « résilie » la souscription à la fermeture du component
  ngOnDestroy(){
    this.carSubsrcription.unsubscribe();
  }

}
