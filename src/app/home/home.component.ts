import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  opened=false;
  usuario: Usuario | undefined;

  logout(){
    // if(this.usuario?.email==undefined){
    //   console.log("es nulo");
    // }
    // this.apiauthserv.logout();
    // this.router.navigate(['/login']);
  }
  ngOnInit(): void {
  }

}
