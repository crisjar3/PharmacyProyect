import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApiLineaproduccionService } from '../services/Api.LineaProduccion';
import { DialogLinea } from './Dialog/DialogoLinea';
import { DetalleLineaDeProduccion, LineaDeProduccion } from './Linea_Prod';
import { DetalleLineaDeProduccions, LineaDeProduccions } from './PostInter';

// interface TableDetailsView{
//   idDetalleLineaDeProduccion:number;
//   idLineaDeProduccion:number;
//   idInsumo:number;
//   cantidad:number;

// }
interface TableDetailsView{
  idDetalleLineaDeProduccion:string;
  idLineaDeProduccion:string;
  idInsumo:string;
  cantidad:string;

}

@Component({
  selector: 'app-linea-produccion',
  templateUrl: './linea-produccion.component.html',
  styleUrls: ['./linea-produccion.component.scss']
})
export class LineaProduccionComponent implements OnInit {

  
  panelOpenState = false;
  public prueb=[{nombre:'fdhf',maso:'mas'},{nombre:'mas',maso:'mata'}];
  public prueba=[{nombre:'fdhf',maso:'mas'},{nombre:'mas',maso:'mata'}];
  public lst:LineaDeProduccions[]=[];
  public lstd:DetalleLineaDeProduccions[]=[];
  //aca estaran los resultados con el filter
  public lstdd:DetalleLineaDeProduccion[]=[];


  public Columnastest : string[]=[
    'nombre',
    'maso',
    'Acciones'
];
public Columnastest2 : string[]=[
  'nombre',
  'maso'
];
f_firstPanel=true;
f_secondPanel=false;

  filterValues=[];
  public ColumnasL : string[]=[
    'IdLineaDeProduccion',
    'IdProducto',
    'DescripcionLinea',
    'DescripcionProducto',
    'Acciones'
];

public ColumnasD:string []=[
  'IdDetalleLineaDeProduccion',
  'IdLineaDeProduccion',
  'IdInsumo',
  'Cantidad'
];
  

   
  
  readonly Alto:string='300px';
   dataSource:LineaDeProduccion[]=[];
   
    dataSources = new MatTableDataSource<DetalleLineaDeProduccions>();
   @ViewChild(MatTable) table: MatTable<TableDetailsView> | undefined;

  constructor(private ApiLinea:ApiLineaproduccionService, public dialog:MatDialog,
    public snackBAr:MatSnackBar, ) 
    { 

    }


  ngOnInit(): void {
this.get();
// console.log(this.dataSource);

  }

  press(id:string){
    this.get();
    this.f_secondPanel=!this.f_secondPanel;
    this.f_firstPanel=!this.f_firstPanel;
    this.lstdd=[];
    for(var a of this.lstd){
      if(a.idLineaDeProduccion==Number(id)){
        this.lstdd.push(a);
      }
    }
    this.dataSources.data=this.lstdd;
    
    // this.table?.renderRows();


  }

  press2(){
    this.f_secondPanel=!this.f_secondPanel;
    this.f_firstPanel=!this.f_firstPanel;
    this.dataSources.data=[{idLineaDeProduccion:1,idDetalleLineaDeProduccion:1,idInsumo:8,cantidad:90}];
    this.dataSources._renderChangesSubscription;

  }


  

 get(){
   
   this.ApiLinea.getProveedor().subscribe(response=>{
    
     
    if(response.exito==1){
      this.lst=response.data;
    }  });
   this.ApiLinea.getDetalles().subscribe(response=>{
    
  
   if(response.exito==1){
     this.lstd=response.data;
     
     this.dataSource=response.data;
   }
  //  console.log(this.lstd);
    
     
  });
   

   
  

 }

 openAdd(){
   const dialogref=this.dialog.open(DialogLinea,{
   
    height: '650px',
    width: '600px',
     data:{nombre:''}
   }
   );
    dialogref.afterClosed().subscribe(result=>{this.get()});
    this.get();
 
 }
 


//  Edit(proveedor:LineaDeProduccion){
 
//    const dialogref=this.dialog.open(InsumoDialog,{
//      width:this.Alto,
//      data:proveedor
//    });
//    console.log(proveedor);
   
//    dialogref.afterClosed().subscribe(result=>{this.getProveedor()});
//  }

//  delete(proveedor:LineaDeProduccion){
//    const dialogref=this.dialog.open(dialogdelete,{
//      width:this.Alto
//    });
   
//    dialogref.afterClosed().subscribe(result=>{
//      if(result){
//        this.apiproveedor.Delete(proveedor.idInsumo.toString()).subscribe(
//          response=>{
//            if(response.exito==1){
//              this.snackBAr.open('Cliente eliminado con Exito','',{duration:2000})
//              this.getProveedor();
//            }else{
             
//              this.snackBAr.open(`${proveedor.nombre} no fue eliminiado, intente nuevamente`,'',{duration:2000})
//            }
//          }
//        );
//      }
//    });
//  }

}
