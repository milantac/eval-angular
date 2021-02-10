import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; //On va créer le Subject en important (automatiquement) la méthode associée dans la librairie RxJS


@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor( private http: HttpClient ) { 
    this.getCar(); //Comme le service est déclenché dès l’ouverture de notre application, le Subject sera rempli dès l’ouverture
  }
  
  carSubject = new Subject<any[]>();

  private cars = [];
 
    private httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application/json'})
    };


// On va ensuite créer notre fonction qui permettra d’envoyer toutes modifications à tous les components en train d’utiliser le Subject
  emitCarSubject(){
      this.carSubject.next(this.cars.slice());
//                       |               |=>La méthode slice(<début>, <fin>) permet de générer un « soustableau » depuis un indice de départ et jusqu’à un indice de fin. Ici, on ne lui donne aucun paramètre ce qui aura pour effet de créer un « sous-tableau » identique donc de « rafraichir » artificiellement notre liste de car
//                       |=>La méthode next de notre Subject permet d’émettre les nouvelles informations      
  }

  getCarById(id: number){
    return this.http.get<any>('/api/cars/'+id);
  }
  
  addCar(tmpCar:any){
    this.http.post<any>('/api/cars',tmpCar,this.httpOptions).subscribe(res=>{ this.cars.push(res);
                                                                              this.emitCarSubject();
                                                                            }
                                                                      );
  }

  getCar(){
    this.http.get<any>('/api/cars').subscribe((resultat)=>{
                  this.cars=resultat;
//On n’oublie pas de remplir notre tableau et d’émettre grâce à notre Subject à tous les autres components cette nouvelle liste
                  this.emitCarSubject();
    });
  }
//Je vais maintenant créer la fonction qui permettra la modification dans la BdD de ma voiture. Je réalise une requête HTTP de type PUT en précisant l’identifiant
  modifCar(car: any){
    var index= this.cars.findIndex(
      (carToModif)=>{
        if(carToModif._id == car._id){
          return true;
        }
      }
    )
    this.cars.splice(index,1, car);
    this.emitCarSubject();
    return this.http.put<any>('/api/cars/'+car._id,car,this.httpOptions);
  }

  deleteCar(id: any){
    this.http.delete<any>('/api/cars/' + id).subscribe(res=>{
      var index = this.cars.findIndex(
        (carToDelete)=>{
          if(carToDelete._id==id){
            return true;
          }
        }
      );
      this.cars.splice(index, 1);
      this.emitCarSubject();
    });
  }
}
