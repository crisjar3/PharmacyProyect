import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dialogdelete } from '../Common/Delete/Dialog_delete';
import { ApiEmpleadoService } from '../services/Api.Empleado';
import { DialogEmpleado } from './DialogEmpleado/DialogEmpleado';
import { Empleado } from './Empleado';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {

  public lst:Empleado[]=[];
  
  // public lstt!:MatTableDataSource<Proveedor>;

  filterValues=[];
  public Columnas : string[]=[
    'IdEmpleado',
    'NombreCompleto',
    'IdPuestoTrabajo',
    'Cedula' ,
    'Direccion' ,
    'Telefono' ,
    'Correo',
    'Estado',
    'Acciones'
];

  

   
  
  readonly Alto:string='300px';
   dataSource:Empleado[]=[];
  

  constructor(private ApiEmpleado:ApiEmpleadoService, public dialog:MatDialog,
    public snackBAr:MatSnackBar) 
    { 

    }


  ngOnInit(): void {
this.get();


  }

  applyFilter(event:Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue==''){
      this.get();
      return;
    }
    
    const lst = this.lst.filter((d)=> {
     return  d.nombreCompleto.toLowerCase().indexOf(filterValue) !== -1 || !filterValue;
       
   });
   this.dataSource=lst;
   this.lst=lst;

 }

 get(){
   
   this.ApiEmpleado.getProveedor().subscribe(response=>{
    
    
    if(response.exito==1){
      this.lst=response.data;
      
      this.dataSource=response.data;
    }
    
     
      
   });

   
  

 }

 openAdd(){
   const dialogref=this.dialog.open(DialogEmpleado,{
     width:this.Alto,
     data:{nombre:''}
   }
   );
    dialogref.afterClosed().subscribe(result=>{this.get()});
 
 }
 


 Edit(Emple:Empleado){
 
   const dialogref=this.dialog.open(DialogEmpleado,{
     width:this.Alto,
     data:Emple
   });
   
   
   dialogref.afterClosed().subscribe(result=>{this.get()});
 }

 delete(Emple:Empleado){
   const dialogref=this.dialog.open(dialogdelete,{
     width:this.Alto
   });
   
   dialogref.afterClosed().subscribe(result=>{
     if(result){
       this.ApiEmpleado.Delete(Emple.idEmpleado.toString()).subscribe(
         response=>{
           if(response.exito==1){
             this.snackBAr.open('eliminado con Exito','',{duration:2000})
             this.get();
           }else{
             
             this.snackBAr.open(`${Emple.nombreCompleto} no fue eliminiado, intente nuevamente`,'',{duration:2000})
           }
         }
       );
     }
   });
 }


  

}
