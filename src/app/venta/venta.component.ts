import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Distribuidora } from '../distribuidora/Distribuidora';
import { Empleado } from '../empleado/Empleado';
import { ApiDistribuidoraService } from '../services/Api.Distribuidora';
import { ApiEmpleadoService } from '../services/Api.Empleado';
import { ApiVentaService } from '../services/Api.Venta';
import { DialogVenta } from './Dialog/DialogVenta';
import { DetalleVenta, Venta } from './Venta';
import { Utils } from '../Utils/Util';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormControl, FormGroup } from '@angular/forms';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
interface Selector {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {
  range = new FormGroup({
    starti: new FormControl(),
    endi: new FormControl()
  });
  //logos para la factura
  logoUrl:string="";
  Util= Utils.getImageDataUrlFromLocalPath1('./assets/img/2.png').then(
    result => this.logoUrl = result
  );
//aca estan los seleccionado
SelectedEmpleado:string='';
SelectedEstado:string='';
SelectedDist:string='';
//Arreglos para obtener todos los registros
ArrayEmple:Empleado[]=[];
ArrayDist:Distribuidora[]=[];
// ArrayEstado:Empleado[]=[];
//aca estara los datos a mostrar en el combo box
BoxEmpleado:Selector[]=[];
BoxDist:Selector[]=[];
BoxEstado:Selector[]=[];
  //Datasource para las dos tablas
  date2 = new Date();
  public lstd:DetalleVenta[]=[];
  public lst:Venta[]=[];
  
  
  
//Aca se declaras los estados de los paneles
f_firstPanel=true;
f_secondPanel=false;
Numeroregistr:number=0;

  filterValues=[];
  //las Cabecera de las dos tablas tanto detalleCOmpra y Compra
  public ColumnasDetalles:string []=['IdDetalleVentas'
  ,'IdVenta',
    'IdProducto',
      'PrecioUnitario',
      'Cantidad',
      'Descuento',
      'Total'
  ];

public ColumnasVentas:string[]=[
  'IdVentas',
  'IdDistribuidora',
  'IdEmpleado',
  'Fecha',
  'Descuento',
  'Total',
  'Estado',
  'Acciones'

];
  

   
  
  readonly Alto:string='300px';
   DataVenta= new MatTableDataSource<Venta>();
   ArrayFilter:Venta[]=[];
   dataSourceDetalleVenta=new MatTableDataSource<DetalleVenta>();   

  constructor(private ApiVenta:ApiVentaService, public dialog:MatDialog,
    public snackBAr:MatSnackBar,ApiEmple:ApiEmpleadoService,ApiDist:ApiDistribuidoraService) 
    { 
      // this.llenar();
      
      
    }
    SearchRange(){
      // if(this.lst.length<this.Numeroregistr){
      //   this.GetVentas();
      // }
       var arraytest: Venta[]=[];
       this.range.value.endi.setHours(0,0,0,0);
    this.range.value.starti.setHours(0,0,0,0);
    
    if(this.range.value.endi!=null && this.range.value.starti!=null ){
      
        for(var Variable of this.lst){
          var strToDate = new Date(Variable.fecha);
          strToDate.setHours(0,0,0,0);
          if(strToDate.getTime()<=this.range.value.endi.getTime() &&
           strToDate.getTime()>=this.range.value.starti.getTime()){

            // console.log('aaaaaaa');
            arraytest.push(Variable);
          }
        }
        this.DataVenta.data=arraytest;
        return;
    }else{
       this.GetVentas();
     }
    }


  ngOnInit(): void {
    this.GetVentas();
  }
  
  generatePDF(id:string) {  
    const op=this.lst.findIndex(x=> x.idVenta===Number(id));

    var secondArray:DetalleVenta[]=[];

    for(var elegido of this.lstd){
      if(elegido.idVenta==Number(id)){
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
          text:`Id Venta: ${this.lst[op].idVenta}`,bold:true
          },
          {
            text:`Id Distribudora: ${this.lst[op].idDistribuidora}`
          },
          {
            text:`Id Empleado: ${this.lst[op].idEmpleado}`
          }
         ],[
          {
            text:`Fecha Venta: ${this.lst[op].fecha.toLocaleString()}`
          },
          {
            text:`Descuento: ${this.lst[op].descuento}`
          },
          {
            text:`Total: ${this.lst[op].total}`
          },
          {
            text:`Estado: ${this.lst[op].estado}`, italics: true
          }
          ],
          [{qr: `${this.lst[op].idVenta.toString()} usted esta bien pendejo, no haga eso PUÑETON` }]
      ]
    },
          // Previous configuration  
          {  
            text: 'FACTURA VENTA',  
            fontSize: 16,  
            color: '#047886'
          },
          {  
              table: {  
                  headerRows: 1,  
                  widths: ['*', 'auto', 'auto', 'auto','auto', 'auto', 'auto'],  
                  body: [  
                      ['IdDetalleVentas'
                      ,'IdVenta',
                        'IdProducto',
                          'PrecioUnitario',
                          'Cantidad',
                          'Descuento',
                          'Sub Total'],  
                      ...secondArray.map(p => 
                        ([p.idDetalleDeVentas, p.idVenta, p.idProducto
                          ,p.precioUnitario,p.cantidad,p.descuento
                          , p.total])) 
                  ]  
              }  
          }
      ]
    };
    pdfMake.createPdf(docDefinition).open();
  }

  generateReporteVentas(){  
    var fechaHoy= new Date();
    var secondArray:Venta[]=[];

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
           text:`Ventas totales : ${VentasTotale} `,bold:true,
           margin: [ 5, 2, 10, 20 ]
           },
           {
             text:`Este reporte te muestra los datos de las Ventas de ${month}`
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
             widths: ['*', 'auto', 'auto', 'auto','auto', 'auto','auto'],  
             body: [  
                 ['Id Venta'
                 ,'Id Distribuidora',
                   'Id Empleado',
                     'Fecha',
                     'Descuento',
                     'Total',
                    'Estado Venta'],  
                 ...secondArray.map(p => 
                   ([p.idVenta, p.idDistribuidora,p.idEmpleado, p.fecha
                     ,p.descuento,p.estado
                     ,p.total
                     ])) 
             ]  
         }  
     }
       ]
     };
    

    pdfMake.createPdf(docDefinition).open();
  }

  
  press(id:string){
    this.GetVentas();
      var seconArray:DetalleVenta[]=[];

    for(var elegido of this.lstd){
      if(elegido.idVenta==Number(id)){
        seconArray.push(elegido);
      }
    }
    this.dataSourceDetalleVenta.data=seconArray;
    console.log(this.dataSourceDetalleVenta.data);
    this.f_secondPanel=!this.f_secondPanel;
    this.f_firstPanel=!this.f_firstPanel;
  }
  press2(){
    this.f_secondPanel=!this.f_secondPanel;
    this.f_firstPanel=!this.f_firstPanel;
  }

  applyFilter(event:Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue==''){
      this.GetVentas();
      return;
    }

 }

 GetVentas(){
   
   this.ApiVenta.getVenta().subscribe(response=>{
    
    if(response.exito==1){
      this.lst=response.data;
      this.DataVenta.data=response.data;
    }
     
      
   });
   this.ApiVenta.getDetail().subscribe(response=>{
   if(response.exito==1){
     this.lstd=response.data;
   }
    
     
  });
 }

 openAdd(){
   const dialogref=this.dialog.open(DialogVenta,{
   
    height: '650px',
    width: '600px',
     data:{nombre:''}
   }
   );
    dialogref.afterClosed().subscribe(result=>{this.GetVentas()});
 
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
