import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  styleUrls: ['./car-new.component.css']
})
export class CarNewComponent implements OnInit {

  newCar: any;

  constructor(
    private cars: CarService,
    private router: Router
  ) { }

  ngOnInit() {
    this.newCar={
      marque: null,
      type: null,
      categorie: null,
      onSold: null,
      colorCar: null 
    };
  }

  onSaveCar(){
    this.cars.addCar(this.newCar);
    this.router.navigate(['/cars']);
  }
}
