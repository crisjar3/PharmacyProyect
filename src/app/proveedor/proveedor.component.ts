
import {  ChangeDetectorRef,  OnInit } from '@angular/core';
import { ApiproveedorService } from '../services/API.PROVEEDOR';
import { Response } from '../model/response';
// import { DialogProovedor } from './Dialog/Dialoproveedor';
import { DialogoProovedor } from './DialogoProveedor.Add.Edit/DialogProveedor';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Proveedor } from '../model/Proveedor';
// import { dialogdelete } from '../Common/Delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';


import {AfterViewInit} from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { dialogdelete } from '../Common/Delete/Dialog_delete';



@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {
  public lst:Proveedor[]=[];
   public lstt=[{IdProveedor:'ef',
   NombreCompleto:'fd',
   Cedula :'hoal',
   Direccion:'mama', 
   Telefono:'dfkn', 
   Correo:'sdfjj'}] ;
  // public lstt!:MatTableDataSource<Proveedor>;

  filterValues=[];
  mensaje:Number=4;
  // public Columnas : string[]=['idProv','nombre','dirprov',
  // 'telp','correoP','Acciones'];
  public Columnas : string[]=['idProveedor',
    'nombreCompleto',
    'cedula',
    'Direccion', 
    'Telefono', 'Correo','Acciones'];

  

   
  
  readonly Alto:string='300px';
   dataSource:Proveedor[]=[];
  dataSourcel = new MatTableDataSource([]);
  

  constructor(private apiproveedor:ApiproveedorService, public dialog:MatDialog,
    public snackBAr:MatSnackBar) 
    { 

    }


  ngOnInit(): void {
this.getProveedor();





  }

  applyFilter(event:Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue==''){
      this.getProveedor();
      return;
    }
    
    const lst = this.lst.filter((d)=> {
     return  d.nombreCompleto.toLowerCase().indexOf(filterValue) !== -1 || !filterValue;
       
   });
   this.dataSource=lst;
   this.lst=lst;

 }

 getProveedor(){
   
   this.apiproveedor.getProveedor().subscribe(response=>{
    
    //  console.log(response.data);
    if(response.exito==1){
      this.lst=response.data;
      
      this.lstt=response.data;
      this.dataSource=response.data;
    }
     
      
   });

   
  

 }

 openAdd(){
   const dialogref=this.dialog.open(DialogoProovedor,{
     width:this.Alto,
     data:{nombre:''}
   }
   );
    dialogref.afterClosed().subscribe(result=>{this.getProveedor()});
 
 }
 


 Edit(proveedor:Proveedor){
 
   const dialogref=this.dialog.open(DialogoProovedor,{
     width:this.Alto,
     data:proveedor
   });
   
   dialogref.afterClosed().subscribe(result=>{this.getProveedor()});
 }

 delete(proveedor:Proveedor){
   const dialogref=this.dialog.open(dialogdelete,{
     width:this.Alto
   });
   
   dialogref.afterClosed().subscribe(result=>{
     if(result){
       this.apiproveedor.Delete(proveedor.idProveedor.toString()).subscribe(
         response=>{
           if(response.exito==1){
             this.snackBAr.open('Cliente eliminado con Exito','',{duration:2000})
             this.getProveedor();
           }else{
             
             this.snackBAr.open(`${proveedor.nombreCompleto} no fue eliminiado, intente nuevamente`,'',{duration:2000})
           }
         }
       );
     }
   });
 }

}
