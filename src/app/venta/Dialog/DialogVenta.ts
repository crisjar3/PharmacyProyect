import { Component ,Inject, OnInit, ViewChild} from "@angular/core";
import { MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { Title } from "@angular/platform-browser";
import { Distribuidora } from "src/app/distribuidora/Distribuidora";
import { Empleado } from "src/app/empleado/Empleado";
import { Producto } from "src/app/producto/Productos";
import { ApiDistribuidoraService } from "src/app/services/Api.Distribuidora";
import { ApiEmpleadoService } from "src/app/services/Api.Empleado";
import { ApiProductoService } from "src/app/services/Api.Proucto";
import { ApiVentaService } from "src/app/services/Api.Venta";
import { DetalleVenta, Venta } from "../Venta";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Utils } from "src/app/Utils/Util";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

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
  templateUrl: './DialogVenta.html',
  styleUrls:['./DialogVenta.scss']
})



export class DialogVenta implements OnInit{
  logoUrl:string="";
  Util= Utils.getImageDataUrlFromLocalPath1('./assets/img/2.png').then(
    result => this.logoUrl = result
  );
  public clav:boolean=false;
    //Aca el valor selecccionado de Distribuidora
    SelectedDistribuidora:string="";
    //aca el elgido de Empleado
    SelectedEmpleado:string="";
    //Aca elegido seleccionado producto
    SelectedProducto:string="";
     //Aca elegido seleccionado producto
     SelectedEstado:string="";


    
    //aca son los elementos de la tabla Venta
    data= new Date();
     fechacadena=this.data.getDate()+'-'+(this.data.getMonth()+1)+'-'+this.data.getFullYear();
    //  fechacadena=this.data;
    Fecha:Date=this.data;
    Descuento:number=0;
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
DistribuidoraArray:Distribuidora[]=[];//Aca falta el elemento de empleado

    //ACa selector para Productos
    ProductoComboBox:Selector[]=[];
    //aca el que recibe de insumo
    ProductoArray:Producto[]=[];
    //ACa selector para Empleado
    EmpleadoComboBox:Selector[]=[];
    //aca el que recibe de insumo
    EmpleadoArray:Empleado[]=[];
    //ACa selector para Estado
    EstadoComboBox:Selector[]=[{value: '1',
      viewValue: 'Venta Normal'},{value: '2',
      viewValue: 'Devuelta'}];
    //las Cabecera de las dos tablas tanto detalleVenta y Venta
    public ColumnasDetalle:string []=[
        
      'IdProducto',
      'PrecioUnitario',
      'Cantidad',
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

      DatosDetalle=[{IdCompra:'',
      IdInsumo:'',
      Cantidad:'',
      Descuentoindividual:'',
      PrecioUnitario:''}];

    DatosDetalle2=[{IdCompra:'',
    IdInsumo:'',
    Cantidad:'',
    Descuentoindividual:'',
    PrecioUnitario:''}];
    

      @ViewChild(MatTable) table: MatTable<TableDetailsView> | undefined;

      // aca estan lo necesario para actualizar los delles
      DataSourceDetalleVenta= new MatTableDataSource<DetalleVenta>();




    constructor(
        public dialogRef:MatDialogRef<DialogVenta>,
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
    ngOnInit(): void {
    }

     

    close(){
        this.dialogRef.close();
    }
    AddCompra(){
      var clave:boolean;
      clave=false;
      if(this.SelectedDistribuidora=='' ||this.SelectedEmpleado==''||
        this.SelectedEstado==''){
            this.snackbar.open('Ingrese correctamente los datos al agregar','',{duration:2000});
            return;
        }
        if(isNaN(this.Descuento)||this.Descuento>1|| this.Descuento<0){
          this.snackbar.open('Los descuentos son en numero, menores a uno','',{duration:2000});
          return;
        }

        const Ventas: Venta={
            idVenta:this.IdVenta,
            idDistribuidora:Number(this.SelectedDistribuidora),
            idEmpleado:Number(this.SelectedEmpleado),
            fecha :this.data,
            descuento:this.Descuento,
            total:this.Total-this.Total*this.Descuento,
            estado:Number(this.SelectedEstado),
            detallesVenta:[]
            
            
        };
        var idProducto:number;
        var prec:number;
        var canti:number;
        var desc:number;
        var tot: number;

        for(var testo of this.Detalle){
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
        

        this.apiVenta.add(Ventas).subscribe(response=>{
            
            if(response.exito==1){
                
              for(var testo of this.Detalle){
                const op=this.ProductoArray.findIndex(x=> x.idProducto===Number(testo.idProducto));
                this.ProductoArray[op].cantidad=this.ProductoArray[op].cantidad-testo.cantidad;
                this.ApiProd.edit(this.ProductoArray[op]).subscribe(response=>{
                  
                });
              }
              this.generatePDF(Ventas);
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

    generatePDF(a:Venta) {  
      console.log(a);
  
      let docDefinition = {  
       pageSize:{width: 600,
        height: 450},
        content: [
          {
            image: this.logoUrl,
            width:50,
            height:50
          },
          { 
            columns:[
              [
            
            {
              text:`Id Distribudora: ${a.idDistribuidora}`
            },
            {
              text:`Id Empleado: ${a.idEmpleado}`
            }
           ],[
            {
              text:`Fecha Venta: ${a.fecha.toLocaleDateString()}`
            },
            {
              text:`Descuento: ${a.descuento}`
            },
            {
              text:`Total: ${a.total}`
            },
            {
              text:`Estado: ${a.estado}`, italics: true
            }
            ],
            [{qr: `usted esta bien pendejo, no haga eso PUÑETON` }]
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
                    widths: ['*', 'auto', 'auto', 'auto','auto'],  
                    body: [  
                        [
                          'IdProducto',
                            'PrecioUnitario',
                            'Cantidad',
                            'Descuento',
                            'Sub Total'],  
                        ...a.detallesVenta.map(p => 
                          ([ p.idProducto
                            ,p.precioUnitario,p.cantidad,p.descuento
                            , p.total])) 
                    ]  
                }  
            }
        ]
      };
      pdfMake.createPdf(docDefinition).open();
    } 
  
    
    
    listar(){
        //aca debe ir El llenado de combobox de Empleado
        this.ApiEmpleado.getProveedor().subscribe(response=>{
    
            this.EmpleadoArray=response.data;
            if(response.exito==1){
              for(let a of this.EmpleadoArray){
                  this.EmpleadoComboBox.push({value:a.idEmpleado.toString(),viewValue:a.nombreCompleto+" "+a.idEmpleado});
              }
            }  
           });
           this.ApiProd.getProveedor().subscribe(response=>{
    
            this.ProductoArray=response.data;
            if(response.exito==1){
              for(let a of this.ProductoArray){
                  this.ProductoComboBox.push({value:a.idProducto.toString(),viewValue:a.nombre+" "+a.idProducto});
              }
            }
             
              
           });
           this.APiDist.getProveedor().subscribe(response=>{
    
            this.DistribuidoraArray=response.data;
            if(response.exito==1){
              for(let a of this.DistribuidoraArray){
                  this.DistribuidoraComboBox.push({value:a.idDistribuidora.toString(),viewValue:a.nombre+" "+a.idDistribuidora});
              }
            }
             
              
           });
          

        
    }
    AddDetails(){
      if(isNaN(this.Cantidad)){
        this.snackbar.open('La cantidad debe estar en numero','Atencion',{duration:2000});
        return;    
      }
        
        // if(this.SelectedDistribuidora=='' || this.Cantidad<=0||this.SelectedEmpleado==''||
        // this.SelectedEstado==''){
        //     this.snackbar.open('Ingrese correctamente los datos al agregar','',{duration:2000});
        //     return;
        // }
        if(this.SelectedProducto=='' || this.Cantidad<=0){
            this.snackbar.open('Ingrese correctamente los datos al agregar','',{duration:2000});
            return;
        }
        
            const ConsultProd=this.ProductoArray.find(a=> a.idProducto===Number(this.SelectedProducto));
        if(ConsultProd!.cantidad<this.Cantidad){
            this.snackbar.open('Na hay suficiente producto','Alerta, esta bien pendejo',{duration:2000});
            return;
        }
       
        if(this.DataSourceDetalleVenta.data.find(a=> a.idProducto===Number(this.SelectedProducto))!=undefined){
            this.snackbar.open('No puede ingresar un producto ya ingresado','Eliminelo',{duration:2000});
            return;
        }
        
        this.Detalle.push({idDetalleDeVentas :0,
          idVenta :0,
          idProducto :Number(this.SelectedProducto),
          precioUnitario :ConsultProd!.precio,
          cantidad :this.Cantidad,
          descuento :0,
          total :this.Cantidad*ConsultProd!.precio});
          this.Total=this.Total+this.Detalle[this.Detalle.length-1].total
          this.DataSourceDetalleVenta.data=this.Detalle;
    }

    EraseDetails(id:string){
        
        const op=this.Detalle.findIndex(x=> x.idProducto===Number(id));
       
        if(this.Detalle.length==1){
          this.Total=0,
            this.Detalle=[]
        }else{
          this.Total=this.Total-this.Detalle[op].total;

            this.Detalle.splice(op,1);
        }
       this.DataSourceDetalleVenta.data=this.Detalle;
    }

    
}