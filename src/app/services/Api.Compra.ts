import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compra } from '../Compra/Compra';
import { Insumo } from '../insumos/Insumo';
import { DetalleLineaDeProduccion, LineaDeProduccion } from '../linea-produccion/Linea_Prod';
import { Proveedor } from '../model/Proveedor';
import { Response } from '../model/response';
import { Producto } from '../producto/Productos';
import { MyClass } from './url';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  const httpOptionl = {
    headers: new HttpHeaders({
      Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwiZW1haWwiOiJQb2xsbyIsIm5iZiI6MTYzMDEzOTE5NSwiZXhwIjoxNjMyNzMxMTk1LCJpYXQiOjE2MzAxMzkxOTV9.y0Pfp4XoRjvmaY5HypaIRafwKs4KWomuGoGkU_UdA5c`
     }),
     withCredentials: true
  };
  @Injectable({
    providedIn: 'root'
  })
  export class ApiCompraService {
  
    
    
  
    url: string =MyClass.myProp +'Compra';
    url2:string=MyClass.myProp+'DetallesCompra';
  
    constructor(
      private _http:HttpClient){
        
    }
    
  
    get():Observable<Response>{
      
      return this._http.get<Response>(this.url);
      
    }
    getDetails():Observable<Response>{
      
      return this._http.get<Response>(this.url2);
      
    }
    add(proveedor:Compra): Observable<Response> {
      // console.log(proveedor);
      return this._http.post<Response>(this.url, proveedor);      
    }
    
    edit(proveedor:LineaDeProduccion): Observable<Response> {
      return this._http.put<Response>(this.url, proveedor,httpOptions);
      // ,httpOption
    }
    Delete(id:String): Observable<Response> {
      return this._http.delete<Response>(`${this.url}/${id}`,httpOptions);
      // ,httpOption
    }
  
  
  }
