import { Component ,ElementRef,Inject, OnInit, ViewChild} from "@angular/core";
import { inject } from "@angular/core/testing";
import { MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from "@angular/material/table";
import { Title } from "@angular/platform-browser";
import { Insumo } from "src/app/insumos/Insumo";
import { Proveedor } from "src/app/model/Proveedor";
import { Producto } from "src/app/producto/Productos";
import { ApiCompraService } from "src/app/services/Api.Compra";
import { ApiDistribuidoraService } from "src/app/services/Api.Distribuidora";
import { ApiEmpleadoService } from "src/app/services/Api.Empleado";
import { ApiInsumoService } from "src/app/services/Api.Insumos";
import { ApiLineaproduccionService } from "src/app/services/Api.LineaProduccion";
import { ApiProductoService } from "src/app/services/Api.Proucto";
import { ApiproveedorService } from "src/app/services/API.PROVEEDOR";
import { ApiVentaService } from "src/app/services/Api.Venta";
import { DetalleVenta, Venta } from "src/app/venta/Venta";
declare var paypal: { Buttons: (arg0: { createOrder: (data: any, actions: any) => any; onApprove: (data: any, actions: any) => Promise<void>; onError: (err: any) => void; }) => { (): any; new(): any; render: { (arg0: any): void; new(): any; }; }; };


interface Selector {
    value: string;
    viewValue: string;
  }

interface TableDetailsView{
    IdInsumo:string;
    Cantidad:number;

  }
@Component({
  selector: 'app-proveedor',
  templateUrl: './DialogVentaPaypal.html',
  styleUrls:['./DialogVentaPaypal.scss']
})



export class DialogVentaPaypal implements OnInit{
  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;

  //paypal
  producto = {
    descripcion : 'producto en venta',
    precio      : 599.99,
    img         : 'imagen de tu producto'
  }
  // title = 'angular-paypal-payment';
    //Aca el valor selecccionado de Distribuidora
    SelectedDistribuidora:string="";
    //aca el elgido de Empleado
    SelectedEmpleado:string="";
    //Aca elegido seleccionado producto
    SelectedProducto:string="";


    
    //aca son los elementos de la tabla Venta
    data= new Date('1995-12-17T03:24:00')
    Fecha:Date=this.data;
    Descuento:Number=0;
    Total:number=0;
    Estado:number=0;
    //Aca esta los de los detalles de compra
    IdDetalleVentas:number=0;
    IdVenta:number=0;
    IdProducto:number=0;
    Cantidad:number=0;
    DescuentoDeta:number=0;
    PrecioUnitario:number=0;
    TotalDeta:number=0;
//aun no lo ocupo aca va a ir los detalles de Venta
 Detalle: DetalleVenta[]=[];
 //el prover es para mostrar los elementos del combobox
 DistribuidoraComboBox:Selector[]=[];
 //el prove recibe los datos del apiEmpleado y los inserta modificado en comboEmpleado
DistribuidoraArray:Producto[]=[];//Aca falta el elemento de empleado

    //ACa selector para Productos
    ProductoComboBox:Selector[]=[];
    //aca el que recibe de insumo
    ProductoArray:Producto[]=[];
    //ACa selector para Empleado
    EmpleadoComboBox:Selector[]=[];
    //aca el que recibe de insumo
    EmpleadoArray:Producto[]=[];
    //las Cabecera de las dos tablas tanto detalleVenta y Venta
    public ColumnasDetalle:string []=[
        
      'IdProducto',
      'PrecioUnitario',
      'Cantidad',
      'Descuento',
      'Total',
      'Acciones'
      ];

    public ColumnasVenta:string[]=[
        
      'IdVenta',
      'IdDistribuidora',
      'IdEmpleado',
      'Fecha',
      'Descuento',
      'Total',
      'Estado'

    ];

      DatosDetalle=[{idDetalleDeVentas :'',
        idVenta :'',
        idProducto :'',
        precioUnitario :'',
        cantidad :'',
        descuento :'',
        total :''}];

    DatosDetalle2=[{idDetalleDeVentas :'',
    idVenta :'',
    idProducto :'',
    precioUnitario :'',
    cantidad :'',
    descuento :'',
    total :''}];
    

      @ViewChild(MatTable) table: MatTable<TableDetailsView> | undefined;




    constructor(
        public dialogRef:MatDialogRef<DialogVentaPaypal>,
        public apiVenta:ApiVentaService,
        public snackbar:MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public Venta:Venta,
        @Inject(MAT_DIALOG_DATA) public detalleVenta:DetalleVenta[],
        private title: Title,
        public ApiEmpleado:ApiEmpleadoService,//Aca debe ir la api de cliente
        public APiDist:ApiDistribuidoraService,
        public ApiProd:ApiProductoService
    ){
        
           this.listar();
           
           
            
       
    }

    ope(){
      this.AddCompra();
    }
    AddCompra(){
      var clave:boolean;
      clave=false;

        const Ventas: Venta={
            idVenta:this.IdVenta,
            idDistribuidora:1,
            idEmpleado:1,
            fecha :this.data,
            descuento:0,
            total:this.Total,
            estado:1,
            detallesVenta:[]
            
            
        };
        console.log(Ventas);
        var idProducto:number;
        var prec:number;
        var canti:number;
        var desc:number;
        var tot: number;

        for(var testo of this.DatosDetalle2){
          idProducto=Number(testo.idProducto);
          prec=Number(testo.precioUnitario);
          canti=Number(testo.cantidad);
          desc=Number(testo.descuento);
          tot=Number(testo.total);
          Ventas.detallesVenta.push({idDetalleDeVentas :0,
            idVenta :0,
            idProducto :idProducto,
            precioUnitario :prec,
            cantidad :canti,
            descuento :desc,
            total :tot});
        }
        console.log(Ventas),
        

        this.apiVenta.add(Ventas).subscribe(response=>{
            
            if(response.exito==1){
                
              // for(var testo of this.Detalle){
              //   const op=this.ProductoArray.findIndex(x=> x.idProducto===Number(testo.idProducto));
              //   this.ProductoArray[op].cantidad=this.ProductoArray[op].cantidad-testo.cantidad;
              //   this.ApiProd.edit(this.ProductoArray[op]).subscribe(response=>{
                  
              //   });
              // }
              // this.generatePDF(Ventas);
               this.dialogRef.close();
                this.snackbar.open('Insertada','Exito',{duration:2000});
                
               
            }else{
                
                console.log(response.mensaje);
                this.dialogRef.close();
                this.snackbar.open('Lamentablemente,no se insertó con exito','',{duration:2000});
            }
            });
            // console.log(this.clav);
            // if(this.clav==true){
            //   this.generatePDF(Ventas);
            //   this.dialogRef.close();
            // }
    }
    ngOnInit(): void {
      paypal
    .Buttons({
      createOrder: (data: any, actions: { order: { create: (arg0: { purchase_units: { description: string; amount: { currency_code: string; value: number; }; }[]; }) => any; }; }) => {
        return actions.order.create({
          purchase_units: [
            {
              description: this.producto.descripcion,
              amount     :{
                currency_code: 'MXN',
                value        : this.producto.precio
              }
            }
          ]
        })
      },
      onApprove: async (data: any, actions: { order: { capture: () => any; }; }) => {
        const order = await actions.order.capture();
        // console.log(order);
        if(order.status=='COMPLETED'){
          console.log('se hizo, mamaguebo');
          this.ope();
        }
        
      },
      onError: (err: any) =>{
        // console.log(err);
        
      }
    })
    .render( this.paypalElement.nativeElement );
    }

    close(){
        this.dialogRef.close();
    }
    Add(){

        // for(let a of this.DatosDetalle2){
        //     this.Detalle.push({idDetalleLineaDeProduccion:0,idInsumo:Number(a.IdInsumo),idLineaDeProduccion:0
        //     ,cantidad:Number(a.Cantidad)});
        // }
        
        
        
        
        // const Compra: Compra={
        //     idLineaDeProduccion:Number(this.IdLineaDeProduccion),
        //     idProducto:this.IdProducto,
        //     descripcionLinea:this.DescripcionLinea,
        //     descripcionProducto:this.DescripcionProducto,
        //     detalle:this.Detalle
            
        // };
        

        // this.apiProveedor.add(LineaDirecta).subscribe(response=>{
            
        //     if(response.exito==1){
                
        //         this.dialogRef.close();
        //         this.snackbar.open('Linea de Produccion Insertada','Exito',{duration:2000});
        //     }else{
                
        //         console.log(response.mensaje);
        //         this.dialogRef.close();
        //         this.snackbar.open('Lamentablemente,no se insertó con exito','',{duration:2000});
        //     }
        //     });
            
    }
    
    listar(){
           this.ApiProd.getProveedor().subscribe(response=>{
    
            this.ProductoArray=response.data;
            if(response.exito==1){
              for(let a of this.ProductoArray){
                  this.ProductoComboBox.push({value:a.idProducto.toString(),viewValue:a.nombre+" "+a.idProducto});
              }
            }
             
              
           });
          

        
    }
    AddDetails(){
        
        if(this.SelectedProducto=='' || this.Cantidad<=0){
            this.snackbar.open('Ingrese correctamente los datos al agregar','',{duration:2000});
            return;
        }
        
            const ConsultaInsumo=this.ProductoArray.find(a=> a.idProducto===Number(this.SelectedProducto));
        if(ConsultaInsumo!.cantidad<this.Cantidad){
            this.snackbar.open('Na hay suficiente insumo','Alerta, esta bien pendejo',{duration:2000});
            return;
        }
       
        if(this.DatosDetalle2.find(a=> a.idProducto===this.SelectedProducto)!=undefined){
            this.snackbar.open('No puede ingresar un insumo ya ingresado','',{duration:2000});
            return;
        }
        if(this.DatosDetalle2[0].idProducto==''){
            this.DatosDetalle2[0].idProducto=this.SelectedProducto;
            this.DatosDetalle2[0].cantidad=this.Cantidad.toString();
            this.DatosDetalle2[0].idDetalleDeVentas='';
            // this.DatosDetalle2[0].idProducto ='',
    this.DatosDetalle2[0].precioUnitario =ConsultaInsumo!.precio.toString(),
    this.DatosDetalle2[0].descuento ='no hay',
    this.DatosDetalle2[0].total =(ConsultaInsumo!.precio*Number(this.Cantidad)).toString();
    this.Total=(this.Total)+(ConsultaInsumo!.precio*Number(this.Cantidad));
            this.table?.renderRows();
            return;
        }
        
        this.DatosDetalle2.push({idProducto:this.SelectedProducto
          ,cantidad:this.Cantidad.toString(),
        idDetalleDeVentas:'',
        precioUnitario:ConsultaInsumo!.precio.toString(),
        descuento:'no hay',
        total:(ConsultaInsumo!.precio*Number(this.Cantidad)).toString(),idVenta:''});
        this.Total=(this.Total)+(ConsultaInsumo!.precio*Number(this.Cantidad));
        this.table?.renderRows();
    }

    EraseDetails(id:string){
        
        const op=this.DatosDetalle2.findIndex(x=> x.idProducto===id);
        this.Total=(this.Total)-(Number(this.DatosDetalle2[op].total));
        if(this.DatosDetalle2.length==1){
            this.DatosDetalle2[0].idProducto='';
            this.DatosDetalle2[0].cantidad='';
            this.DatosDetalle2[0].idDetalleDeVentas='';
            // this.DatosDetalle2[0].idProducto ='',
            this.DatosDetalle2[0].precioUnitario ='',
            this.DatosDetalle2[0].descuento ='',
            this.DatosDetalle2[0].total =''
            this.table?.renderRows();
            return;

        }
        if(op==0){
            this.DatosDetalle2.splice(op,op+1);
        }else
            {
            this.DatosDetalle2.splice(op,op+1);
        }
        this.table?.renderRows();
        console.log(op);
    }

    
}