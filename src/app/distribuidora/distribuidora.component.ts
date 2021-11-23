import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dialogdelete } from '../Common/Delete/Dialog_delete';
import { ApiDistribuidoraService } from '../services/Api.Distribuidora';
import { DistrDialog } from './DistrDialog/DistrDialog';
import { Distribuidora } from './Distribuidora';

@Component({
  selector: 'app-distribuidora',
  templateUrl: './distribuidora.component.html',
  styleUrls: ['./distribuidora.component.scss']
})
export class DistribuidoraComponent implements OnInit {

  public lst:Distribuidora[]=[];
  
  // public lstt!:MatTableDataSource<Proveedor>;

  filterValues=[];
  public Columnas : string[]=[
    'IdDistribuidora' ,
    'Nombre',
    'Direccion',
    'Correo',
   'Telefono',
   'Acciones' 
];

  

   
  
  readonly Alto:string='300px';
   dataSource:Distribuidora[]=[];
  

  constructor(private ApiDistr:ApiDistribuidoraService, public dialog:MatDialog,
    public snackBAr:MatSnackBar) 
    { 

    }


  ngOnInit(): void {
this.getDistr();
// console.log(this.lst);

  }

  applyFilter(event:Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue==''){
      this.getDistr();
      return;
    }
    
    const lst = this.lst.filter((d)=> {
     return  d.nombre.toLowerCase().indexOf(filterValue) !== -1 || !filterValue;
       
   });
   this.dataSource=lst;
   this.lst=lst;

 }

 getDistr(){
   
   this.ApiDistr.getProveedor().subscribe(response=>{
    
     console.log(response.data);
    if(response.exito==1){
      this.lst=response.data;
      
      this.dataSource=response.data;
    }
     
      
   });

   
  

 }

 openAdd(){
   const dialogref=this.dialog.open(DistrDialog,{
     width:this.Alto,
     data:{nombre:''}
   }
   );
    dialogref.afterClosed().subscribe(result=>{this.getDistr()});
 
 }
 


 Edit(Distr:Distribuidora){
 
   const dialogref=this.dialog.open(DistrDialog,{
     width:this.Alto,
     data:Distr
   });

   
   dialogref.afterClosed().subscribe(result=>{this.getDistr()});
 }

 delete(Distr:Distribuidora){
   const dialogref=this.dialog.open(dialogdelete,{
     width:this.Alto
   });
   
   dialogref.afterClosed().subscribe(result=>{
     if(result){
       this.ApiDistr.Delete(Distr.idDistribuidora.toString()).subscribe(
         response=>{
           if(response.exito==1){
             this.snackBAr.open('Cliente eliminado con Exito','',{duration:2000})
             this.getDistr();
           }else{
             
             this.snackBAr.open(`${Distr.nombre} no fue eliminiado, intente nuevamente`,'',{duration:2000})
           }
         }
       );
     }
   });
 }




}
