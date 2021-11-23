// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { ComponentFactoryResolver, Injectable } from "@angular/core";
// import { Observable } from "rxjs";
// import { apiAuthService } from "../services/apiAuth.service";
// @Injectable()
// export class jwtInterceptor implements HttpInterceptor{
//     constructor(private apiauyhservice:apiAuthService){

//     }

//     intercept(request:HttpRequest<any>, next:HttpHandler):
//     Observable<HttpEvent<any>>{
//         const usuario = this.apiauyhservice.usuarioData;
//         if(usuario.token!=null){
//             esto se va a comentar
//             console.log(usuario.token);
//              usuario.token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwiZW1haWwiOiJQb2xsbyIsIm5iZiI6MTYzMDEzOTE5NSwiZXhwIjoxNjMyNzMxMTk1LCJpYXQiOjE2MzAxMzkxOTV9.y0Pfp4XoRjvmaY5HypaIRafwKs4KWomuGoGkU_UdA5c";
//             request=request.clone({
//                 setHeaders:{
//                     Authorization:`Bearer ${usuario.token}`
//                 }
//             });
//         }
//         return next.handle(request);
//     }
// }