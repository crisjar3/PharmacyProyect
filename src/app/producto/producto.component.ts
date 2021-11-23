import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { dialogdelete } from '../Common/Delete/Dialog_delete';
import { ApiProductoService } from '../services/Api.Proucto';
import { DialogoProducto } from './ProductoDialog/ProductoDialog';
import { Producto } from './Productos';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements AfterViewInit {
  isLoadingResults = true;
  public lst:Producto[]=[];
  DataProd= new MatTableDataSource<Producto>();
  resultsLength = 0;
  Busqueda="";
  
  // public lstt!:MatTableDataSource<Proveedor>;

  filterValues=[];
  public Columnas : string[]=['IdProducto',
    'Nombre',
    'Cantidad',
    'Descripcion',
    'Precio',
    'Acciones'
];

  

   
  
  readonly Alto:string='300px';
   dataSource:Producto[]=[];
   @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
   @ViewChild(MatSort) sort: MatSort | undefined;

  

  constructor(private apiproveedor:ApiProductoService, public dialog:MatDialog,
    public snackBAr:MatSnackBar) 
    { 
      
    }


  ngAfterViewInit() {
this.getProveedor();
this.DataProd.paginator=this.paginator!;
      this.DataProd.sort=this.sort!;

  }

  applyFilter() {
    
    const filterValue = this.Busqueda;
    if(filterValue==''){
      this.getProveedor();
      return;
    }
    
    const lst = this.dataSource.filter((d)=> {
     return  d.nombre.toLowerCase().indexOf(filterValue) !== -1 || !filterValue;
       
   });
   this.DataProd.data=lst;

 }

 getProveedor(){
   
   this.apiproveedor.getProveedor().subscribe(response=>{
    
     console.log(response.data);
    if(response.exito==1){
      this.DataProd.data=response.data;
      this.dataSource=response.data;
    }
     
      
   });

   
  

 }

 openAdd(){
   const dialogref=this.dialog.open(DialogoProducto,{
     width:this.Alto,
     data:{nombre:''}
   }
   );
    dialogref.afterClosed().subscribe(result=>{this.getProveedor()});
 
 }
 


 Edit(proveedor:Producto){
 
   const dialogref=this.dialog.open(DialogoProducto,{
     width:this.Alto,
     data:proveedor
   });
   console.log(proveedor);
   
   dialogref.afterClosed().subscribe(result=>{this.getProveedor()});
 }

 
 delete(proveedor:Producto){
   const dialogref=this.dialog.open(dialogdelete,{
     width:this.Alto
   });
   
   dialogref.afterClosed().subscribe(result=>{
     if(result){
       this.apiproveedor.Delete(proveedor.idProducto.toString()).subscribe(
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
