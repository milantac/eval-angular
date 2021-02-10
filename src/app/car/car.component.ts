import { Component, OnInit, Input } from '@angular/core';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  @Input() carMarque: string;
  @Input() carType: string;
  @Input() carCategorie: string;
  @Input() carOnSold: string;
  @Input() carColorCar: string;
  @Input() id: number;

  constructor( 
    private Car: CarService
  ) { }

  ngOnInit() {
  }

  getOnSold(){
    /* comme on fait mention de cette fonction des propres propriété de notre component, on utilise le mot clé this */
    return this.carOnSold;
  }

 /* je vais créer une fonction qui me permet de changer la couleur du text et de la carosserie dans mon <svg>> en fonction de la couleur de la voiture  */
 changeColor(){
   switch (this.carColorCar){
      case 'blue':
        return 'blue';
      case 'black':
        return 'black';
      case 'white':
        return 'white';
      case 'yellow':
        return 'yellow';
      case 'red':
        return 'red';   
    }

 }
  removeCar(id:any){
    this.Car.deleteCar(id);
  }
}
