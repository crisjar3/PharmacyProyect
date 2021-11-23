import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../model/Proveedor';
import { Response } from '../model/response';
import { MyClass, urlDetermination } from './url';

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
  export class ApiproveedorService {
  
    
    url: string =MyClass.myProp + 'proveedore';
  
    constructor(
      private _http:HttpClient){
        
    }
    
  
    getProveedor():Observable<Response>{
      
      return this._http.get<Response>(this.url);
      
    }
    add(proveedor:Proveedor): Observable<Response> {
      // console.log(proveedor);
      return this._http.post<Response>(this.url, proveedor);      
    }
    edit(proveedor:Proveedor): Observable<Response> {
      return this._http.put<Response>(this.url, proveedor,httpOptions);
      // ,httpOption
    }
    Delete(id:String): Observable<Response> {
      return this._http.delete<Response>(`${this.url}/${id}`,httpOptions);
      // ,httpOption
    }
  
  
  }
