import { Component } from '@angular/core'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PharmacyProyect';
  // usuario: Usuario | undefined;

  opened=false;
  constructor(){

  }

  logout(){
    // if(this.usuario?.email==undefined){
    //   console.log("es nulo");
    // }
    // this.apiauthserv.logout();
    // this.router.navigate(['/login']);
  }

}
