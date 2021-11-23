import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dialogdelete } from '../Common/Delete/Dialog_delete';
import { ApiInsumoService } from '../services/Api.Insumos';
import { Insumo } from './Insumo';
import { InsumoDialog } from './InsumoDIalog/InsumoDialog';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.scss']
})
export class InsumosComponent implements OnInit {

  

  public lst:Insumo[]=[];
  
  // public lstt!:MatTableDataSource<Proveedor>;

  filterValues=[];
  public Columnas : string[]=['IdInsumo',
    'Nombre',
    'IdProveedor',
    'Descripcion',
    'Cantidad',
    'Acciones'
];

  

   
  
  readonly Alto:string='300px';
   dataSource:Insumo[]=[];
  

  constructor(private apiproveedor:ApiInsumoService, public dialog:MatDialog,
    public snackBAr:MatSnackBar) 
    { 

    }


  ngOnInit(): void {
this.getProveedor();
// console.log(this.lst);

  }

  applyFilter(event:Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue==''){
      this.getProveedor();
      return;
    }
    
    const lst = this.lst.filter((d)=> {
     return  d.nombre.toLowerCase().indexOf(filterValue) !== -1 || !filterValue;
       
   });
   this.dataSource=lst;
   this.lst=lst;

 }

 getProveedor(){
   
   this.apiproveedor.getProveedor().subscribe(response=>{
    
     console.log(response.data);
    if(response.exito==1){
      this.lst=response.data;
      
      this.dataSource=response.data;
    }
     
      
   });

   
  

 }

 openAdd(){
   const dialogref=this.dialog.open(InsumoDialog,{
     width:this.Alto,
     data:{nombre:''}
   }
   );
    dialogref.afterClosed().subscribe(result=>{this.getProveedor()});
 
 }
 


 Edit(proveedor:Insumo){
 
   const dialogref=this.dialog.open(InsumoDialog,{
     width:this.Alto,
     data:proveedor
   });
   console.log(proveedor);
   
   dialogref.afterClosed().subscribe(result=>{this.getProveedor()});
 }

 delete(proveedor:Insumo){
   const dialogref=this.dialog.open(dialogdelete,{
     width:this.Alto
   });
   
   dialogref.afterClosed().subscribe(result=>{
     if(result){
       this.apiproveedor.Delete(proveedor.idInsumo.toString()).subscribe(
         response=>{
           if(response.exito==1){
             this.snackBAr.open('Cliente eliminado con Exito','',{duration:2000})
             this.getProveedor();
           }else{
             
             this.snackBAr.open(`${proveedor.nombre} no fue eliminiado, intente nuevamente`,'',{duration:2000})
           }
         }
       );
     }
   });
 }



}
