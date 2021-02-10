import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

//Nous allons aussi déclarer une variable qui permettra d’afficher la valeur (time)  
  time: number = 0;
  
  constructor(){}

  ngOnInit(){
// Ancienne écriture bservable.interval(1000)
      const counter = interval(1000);
      counter.subscribe(
        (value)=>{
// De modifier la valeur de time à chaque nouvelle émission de données
          this.time=value;
        },
        (error)=>{
// De gérer les erreurs
          console.log('Error : ' + error);
        },
        ()=>{
// De réaliser des actions lors de l’achèvement de l’observable
          console.log('Observable complete !');
        }
      )
  }
  
}
