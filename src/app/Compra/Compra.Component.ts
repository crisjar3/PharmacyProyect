import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApiCompraService } from '../services/Api.Compra';
import { ApiLineaproduccionService } from '../services/Api.LineaProduccion';
import { Venta } from '../venta/Venta';
import { Compra, DetalleCompra } from './Compra';
import { DialogCompra } from './Dialog/DialogCompra';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Utils } from '../Utils/Util';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

export interface CompraView{
  idCompra:number, 
  idEmpleado:number
   total:number, 
   descuento:number,
   fecha:Date, 
   idTipoEstadoCrompa:number

}
@Component({
  selector: 'app-linea-produccion',
  templateUrl: './Compra.Component.html',
  styleUrls: ['./Compra.Component.scss']
})
export class CompraComponent implements OnInit {
  //logos para la factura
  logoUrl:string="";
  Util= Utils.getImageDataUrlFromLocalPath1('./assets/img/2.png').then(
    result => this.logoUrl = result
  );
  //
  range = new FormGroup({
    starti: new FormControl(),
    endi: new FormControl()
  });
  //Declararcion de como se abren los apneles
  panelOpenState = false;
  
  //Datasource para las dos tablas
  date2 = new Date('1995-12-17T03:24:00');
  
  public lstd:DetalleCompra[]=[{idDetalleCompra:0 ,
    idCompra :1,
    idInsumo :1,
    cantidad:90,
    descuento:0,
   precioUnitario:10}];
   public ArrayDetalles:DetalleCompra[]=[];
public lst:Compra[]=[];
// public lstd:DetalleCompra[]=[];
  //aca estan las columnas de prueba, se usaran para la prueba mientras el backend
  
  
  
//Aca se declaras los estados de los paneles
f_firstPanel=true;
f_secondPanel=false;

  filterValues=[];
  //las Cabecera de las dos tablas tanto detalleCOmpra y Compra
  public ColumnasDetalle:string []=[
    'IdCompra',
    'IdInsumo',
    'Cantidad',
    'PrecioUnitario'
  ];

public ColumnasCompra:string[]=[
    'IdCompra',
    'IdEmpleado',
    'Total',
    'Descuento',
    'Fecha',
    'TipodeEstadoCompra',
    'Acciones'

];
  

   
  
  readonly Alto:string='300px';
  dataSourceCompra = new MatTableDataSource<Compra>();
  dataSourceCompraDetalle = new MatTableDataSource<DetalleCompra>();

   @ViewChild(MatTable) table: MatTable<CompraView> | undefined;

  constructor(private apiCompra:ApiCompraService, public dialog:MatDialog,
    public snackBAr:MatSnackBar) 
    { 
      // this.llenar();
      
      
    }

    generatePDF(id:string) {  
      const op=this.lst.findIndex(x=> x.idCompra===Number(id));
  
      var secondArray:DetalleCompra[]=[];
  
      for(var elegido of this.lstd){
        if(elegido.idCompra==Number(id)){
          secondArray.push(elegido);
        }
      }
  
      let docDefinition = {  
       pageSize:{width: 600,
        height: 450},
        content: [
          {
            image:  this.logoUrl,
            width:50,
            height:50
          },
          { 
            columns:[
              [
            {
            text:`Id Compra: ${this.lst[op].idCompra}`,bold:true
            },
            {
              text:`Id Empleado: ${this.lst[op].idEmpleado}`
            }
           ],[
            {
              text:`Fecha Compra: ${this.lst[op].fecha.toLocaleString()}`
            },
            {
              text:`Descuento: ${this.lst[op].descuento}`
            },
            {
              text:`Total: ${this.lst[op].total}`
            },
            {
              text:`Estado: ${this.lst[op].idTipoEstadoCrompa}`, italics: true
            }
            ],
            [{qr: `${this.lst[op].idCompra.toString()} usted esta bien pendejo, no haga eso PUÑETON` }]
        ]
      },
            // Previous configuration  
            {  
              text: 'FACTURA COMPRA',  
              fontSize: 16,  
              color: '#047886'
            },
            {  
                table: {  
                    headerRows: 1,  
                    widths: ['*', 'auto', 'auto', 'auto','auto', 'auto', 'auto'],  
                    body: [  
                        ['Id Detalle Compra'
                        ,'Id Compra'
                        ,'ID Insumo',
                          'Cantidad',
                            'Descuento',
                            'Precio',
                            'Sub Total'],  
                        ...secondArray.map(p => 
                          ([p.idDetalleCompra, p.idCompra, p.idInsumo
                            ,p.cantidad,p.descuento,p.precioUnitario
                            , p.cantidad*p.precioUnitario])) 
                    ]  
                }  
            }
        ]
      };
      pdfMake.createPdf(docDefinition).open();
    }
    generateReporteCompras() {  
      var fechaHoy= new Date();
      var secondArray:Compra[]=[];

      var VentasTotale:number=0;

      const month = fechaHoy.toLocaleString('es-ES', { month: 'long' });

      for(var elegido of this.lst){
        var strToDate = new Date(elegido.fecha);
        if(strToDate.getMonth()== fechaHoy.getMonth()){
          secondArray.push(elegido);
          VentasTotale+=elegido.total;
        }
      }
  
      let docDefinition = {  
        pageSize:{width: 600,
         height: 900},
         content: [// Previous configuration  
          {  
            text: `Reporte de compras del mes de ${month}`,  
            fontSize: 16,  
            color: '#047886',
            margin:15,
            bold:true
          },
           {
             image:  this.logoUrl,
             width:50,
             height:50,
             margin:10
           },
           { 
             columns:[
               [
             {
             text:`Compras totales de: ${VentasTotale} `,bold:true,
             margin: [ 5, 2, 10, 20 ]
             },
             {
               text:`Este reporte te muestra los datos de las compras de ${month}`
             }
            ],
             [{qr: `usted esta bien pendejo, no haga eso PUÑETON` ,width:50,
             height:50,
             margin:10,
             fit: 70}]
         ]
       },
             
             {  
                 table: {  
                     headerRows: 1,  
                     widths: ['*', 'auto', 'auto', 'auto','auto', 'auto'],  
                     body: [  
                         ['Id Compra'
                         ,'Id Empleado',
                           'Descuento',
                             'Fecha',
                             'Tipo de estado Compra',
                             'Total'],  
                         ...secondArray.map(p => 
                           ([p.idCompra, p.idEmpleado, p.descuento
                             ,p.fecha,p.idTipoEstadoCrompa
                             ,p.total
                             ])) 
                     ]  
                 }  
             }
         ]
       };
      

      pdfMake.createPdf(docDefinition).open();
    }
    SearchRange(){
      var arraytest: Compra[]=[];
   
   if(this.range.value.endi!=null && this.range.value.starti!=null ){
     this.range.value.endi.setHours(0,0,0,0);
   this.range.value.starti.setHours(0,0,0,0);
       for(var a of this.lst){
         var strToDate = new Date(a.fecha);
         strToDate.setHours(0,0,0,0);
 
         if(strToDate.getTime()<=this.range.value.endi.getTime() &&
          strToDate.getTime()>=this.range.value.starti.getTime()){
           
           arraytest.push(a);
         }
       }
       this.dataSourceCompra.data=arraytest;
       return;
   }else{
      this.GetCompras();
    }
   }


  ngOnInit(): void {
this.GetCompras();


  }



  press(id:string){
    this.GetCompras();
    this.f_secondPanel=!this.f_secondPanel;
    this.f_firstPanel=!this.f_firstPanel;
    this.ArrayDetalles=[];
    for(var a of this.lstd){
      if(a.idCompra==Number(id)){
        this.ArrayDetalles.push(a);
      }
    }
    this.dataSourceCompraDetalle.data=this.ArrayDetalles;
  }
  press2(){
    this.GetCompras();
    this.f_secondPanel=!this.f_secondPanel;
    this.f_firstPanel=!this.f_firstPanel;
  }

  applyFilter(event:Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue==''){
      this.GetCompras();
      return;
    }
    

 }

 GetCompras(){
   this.apiCompra.get().subscribe(response=>{
    if(response.exito==1){
      this.lst=response.data;
      this.dataSourceCompra.data=response.data;
    } });
    

    this.apiCompra.getDetails().subscribe(response=>{
     if(response.exito==1){
       this.lstd=response.data;
     } });

 }



 openAdd(){
   const dialogref=this.dialog.open(DialogCompra,{
   
    height: '650px',
    width: '600px',
     data:{nombre:''}
   }
   );
    dialogref.afterClosed().subscribe(result=>{this.GetCompras()});
 
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
