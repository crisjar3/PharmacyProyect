// import { Injectable } from "@angular/core"
// import { Router,CanActivate ,ActivatedRouteSnapshot} from "@angular/router"
// import { apiAuthService } from "../services/apiAuth.service";
// @Injectable(
//     {
//         providedIn:'root'
//     }
// )

// export class AuthGuard implements CanActivate{
//     constructor(private router: Router,private apiAuthservice: apiAuthService){

//     }
//     canActivate(route:ActivatedRouteSnapshot){
//         const usuario=this.apiAuthservice.usuarioData;
//         if(usuario.token!=null){
           
//             return true;
//         }
//         this.router.navigate(['/login']);
//         return false;
//     }
// }