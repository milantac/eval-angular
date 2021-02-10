import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car-modif',
  templateUrl: './car-modif.component.html',
  styleUrls: ['./car-modif.component.css']
})
export class CarModifComponent implements OnInit {
  car:any;

  constructor(
    private Car: CarService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const id=this.route.snapshot.params['id'];
    this.Car.getCarById(id).subscribe(resultat =>{
      this.car=resultat;
    });
  }

  onModif(){
    this.Car.modifCar(this.car).subscribe(res=>{
      this.router.navigate(['/cars']);
    })
  }

}
