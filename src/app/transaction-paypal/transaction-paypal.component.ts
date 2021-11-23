import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from '../producto/Productos';
import { ApiProductoService } from '../services/Api.Proucto';
import { ApiVentaService } from '../services/Api.Venta';
import { DialogVentaPaypal } from './Dialog/DialogVentaPaypal';
// declare var paypal: { Buttons: (arg0: { createOrder: (data: any, actions: any) => any; onApprove: (data: any, actions: any) => Promise<void>; onError: (err: any) => void; }) => { (): any; new(): any; render: { (arg0: any): void; new(): any; }; }; };
@Component({
  selector: 'app-transaction-paypal',
  templateUrl: './transaction-paypal.component.html',
  styleUrls: ['./transaction-paypal.component.scss']
})
export class TransactionPaypalComponent implements OnInit {

  // @ViewChild('paypal', { static: true })
  // paypalElement!: ElementRef;
  //aca donde contiene todos los produtos
  public lst:Producto[]=[];
  dataSource:Producto[]=[];
  //Aca van las columnas
  public Columnas : string[]=['IdProducto',
    'Nombre',
    'Cantidad',
    'Descripcion',
    'Precio',
];
  //
  producto = {
    descripcion : 'producto en venta',
    precio      : 599.99,
    img         : 'imagen de tu producto'
  }
  title = 'angular-paypal-payment';

  constructor(private Apiprod:ApiProductoService, private ApiVenta:ApiVentaService,public dialog:MatDialog,
    public snackBAr:MatSnackBar){

  }
  ngOnInit(){

    
    this.get();

  }

  Comprar(){
    const dialogref=this.dialog.open(DialogVentaPaypal,{
   
      height: '650px',
      width: '600px',
       data:{nombre:''}
     }
     );
      dialogref.afterClosed().subscribe(result=>{this.get()});

  }

  get(){
    this.Apiprod .getProveedor().subscribe(response=>{
    
      console.log(response.data);
     if(response.exito==1){
       this.lst=response.data;
       
       this.dataSource=response.data;
     }
      
       
    });
  }

}
