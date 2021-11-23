import { Component ,Inject, OnInit, ViewChild} from "@angular/core";
import { inject } from "@angular/core/testing";
import { MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { Title } from "@angular/platform-browser";
import { Empleado } from "src/app/empleado/Empleado";
import { Insumo } from "src/app/insumos/Insumo";
import { Proveedor } from "src/app/model/Proveedor";
import { Producto } from "src/app/producto/Productos";
import { ApiCompraService } from "src/app/services/Api.Compra";
import { ApiEmpleadoService } from "src/app/services/Api.Empleado";
import { ApiInsumoService } from "src/app/services/Api.Insumos";
import { ApiLineaproduccionService } from "src/app/services/Api.LineaProduccion";
import { ApiProductoService } from "src/app/services/Api.Proucto";
import { ApiproveedorService } from "src/app/services/API.PROVEEDOR";
import { Utils } from "src/app/Utils/Util";
import { Compra,DetalleCompra } from "../Compra";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
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
  templateUrl: './DialogCompra.html',
  styleUrls:['./DialogCompra.scss']
})



export class DialogCompra implements OnInit{
  logoUrl:string="";
  Util= Utils.getImageDataUrlFromLocalPath1('./assets/img/2.png').then(
    result => this.logoUrl = result
  );
    //Aca el valor selecccionado de los empleado
    //Compra
    SelectedEmpleado:string="";
    //aca el elgido de insumo
    //DetalleCompra
    SelectedInsumo:string="";
    
    //aca son los elementos de la tabla compra
    Total:number=0;
    Descuento:number=0;
    Fecha= new Date();
    IdtipoEstadoCompra:number=0;
    //Aca esta los de los detalles de compra
    IdDetalleCompra:number=0;
    IdCompra:number=0;
    IdInsumo:number=0;
    Cantidad:number=0;
    DescuentoDeta:number=0;
    PrecioUnitario:number=0;
//aun no lo ocupo aca va a ir los detalles de la linea
 Detalle: DetalleCompra[]=[];
 //el prover es para mostrar los elementos del combobox
 ComboEmpleado:Selector[]=[];
 //el prove recibe los datos del apiEmpleado y los inserta modificado en comboEmpleado
ArrayEmpleado:Empleado[]=[];//Aca falta el elemento de empleado

    //ACa selector para insumos
    InsumoComboBox:Selector[]=[];
    //aca el que recibe de insumo
    InsumoArray:Insumo[]=[];
    //las Cabecera de las dos tablas tanto detalleCOmpra y Compra
    public ColumnasDetalle:string []=[
        
        'IdInsumo',
        'Cantidad',
        'Descuento individual',
        'Precio Unitario',
        'Subtotal',
        'Editar'
      ];

    public ColumnasCompra:string[]=[
        
        'IdEmpleado',
        'Total',
        'Descuento',
        'Fecha',
        'Tipo de Estado Compra'

    ];

   //ACa selector para insumos
   EstadoComboBox:Selector[]=[{ value: '1',
    viewValue: 'compra correcta'},{ value: '2',
    viewValue: 'posible a devolucion'}];

    //seleccionado estado de compra
    selectedEstado:string='';
   
  //  InsumoArray:Insumo[]=[];

      @ViewChild(MatTable) table: MatTable<TableDetailsView> | undefined;
      DataSourceDetalleCompra=new  MatTableDataSource<DetalleCompra> ();




    constructor(
        public dialogRef:MatDialogRef<DialogCompra>,
        public apiCompra:ApiCompraService,
        public snackbar:MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public compra:Compra,
        @Inject(MAT_DIALOG_DATA) public detalleLinea:DetalleCompra[],
        private title: Title,
        public ApiEmpleado:ApiEmpleadoService,//Aca debe ir la api de cliente
        public APiInsumo:ApiInsumoService
    ){
        
           this.listar();
           
           
            
       
    }
    ngOnInit(): void {
        
       
        
          }

    close(){
        this.dialogRef.close();
    }
  
    AddCompra(){
      var Addins=false;
      if(this.SelectedEmpleado==''){
        this.snackbar.open('Seleccione un empleado','Error',{duration:2000});
        return;
      }
     
      if(isNaN(this.Descuento)){
        this.snackbar.open('Ingrese una cantidad correcta','Error',{duration:2000});
        return;
      }
      if(this.Descuento>1 || this.Descuento<0){
        this.snackbar.open('Ingrese un descuento correcto','Error',{duration:2000});
        return;
      }
      if(this.Detalle.length<1){
        this.snackbar.open('Ingrese al menos un insumo','Error',{duration:2000});
        return;
      }
      

      
        
        
      
        const Compra: Compra={
          idCompra:0, 
          idEmpleado:Number(this.SelectedEmpleado),
          total:Number(this.Total-this.Total*Number(this.Descuento)), 
          descuento:Number(this.Descuento),
          fecha:this.Fecha, 
          idTipoEstadoCrompa:Number(this.selectedEstado),
          detallesCompras:[]
            
        };
        var Canti:number;
        var idInsumo:number;
        var prec:number;

        for(var test of this.Detalle){
          Canti= Number(test.cantidad);
          idInsumo=Number(test.idInsumo);
          prec= Number(test.precioUnitario);
          Compra.detallesCompras.push({idCompra:0,idDetalleCompra:0,idInsumo:idInsumo,
          cantidad:Canti,
        precioUnitario:prec,descuento:0});
        }

        this.apiCompra.add(Compra).subscribe(response=>{
          
          
            if(response.exito==1){
              for(var testo of this.Detalle){
                const op=this.InsumoArray.findIndex(x=> x.idInsumo===Number(testo.idInsumo));
                this.InsumoArray[op].cantidad=this.InsumoArray[op].cantidad+testo.cantidad;
                this.APiInsumo.edit(this.InsumoArray[op]).subscribe(response=>{
                });
              }
              this.generatePDF(Compra); 
                this.snackbar.open('Insertada','Exito',{duration:2000});
                this.dialogRef.close();
            }else{
                
                console.log(response.mensaje);
                this.dialogRef.close();
                this.snackbar.open('Lamentablemente,no se insertó con exito','',{duration:2000});
            }
            });
            
            
    }

    generatePDF(a:Compra) {  
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
              text:`Estado: ${a.idTipoEstadoCrompa}`, italics: true
            }
            ],
            [{qr: `usted esta bien pendejo, no haga eso PUÑETON` }]
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
                    widths: ['*', 'auto', 'auto', 'auto','auto'],  
                    body: [  
                        [
                          'Id Insumo',
                            'Cantidad',
                            'Precio Unitario',
                            'Descuento',
                            'Sub Total'],  
                        ...a.detallesCompras.map(p => 
                          ([ p.idInsumo
                            ,p.cantidad,p.precioUnitario,p.descuento
                            , p.precioUnitario*p.cantidad])) 
                    ]  
                }  
            }
        ]
      };
      pdfMake.createPdf(docDefinition).open();
    } 
  
    
    
    listar(){
        //aca debe ir El llenado de combobox de Emleado
        this.ApiEmpleado.getProveedor().subscribe(response=>{
    
            this.ArrayEmpleado=response.data;
            if(response.exito==1){
              for(let a of this.ArrayEmpleado){
                  this.ComboEmpleado.push({value:a.idEmpleado.toString(),viewValue:a.nombreCompleto+" "+a.idEmpleado});
              }
            }
             
              
           });
           this.APiInsumo.getProveedor().subscribe(response=>{
    
            this.InsumoArray=response.data;
            if(response.exito==1){
              for(let a of this.InsumoArray){
                  this.InsumoComboBox.push({value:a.idInsumo.toString(),viewValue:a.nombre+" "+a.idInsumo});
              }
            }
             
              
           });
          

        
    }
    AddDetails(){
      
        
        if(this.SelectedInsumo=='' || this.Cantidad<=0){
            this.snackbar.open('Ingrese correctamente los datos al agregar','',{duration:2000});
            return;
        }
        
        if(isNaN(this.Cantidad)){
          this.snackbar.open('Ingrese una cantidad correcta','Error',{duration:2000});
          return;
        }
        if(isNaN(this.PrecioUnitario)){
          this.snackbar.open('Ingrese un precio correcto','Error',{duration:2000});
          return;
        }
        if(this.PrecioUnitario<=0){
          this.snackbar.open('Ingrese un precio mayor a 0','Error',{duration:2000});
          return;
        }
        if(this.DataSourceDetalleCompra.data.find(a=> a.idInsumo===Number(this.SelectedInsumo))!=undefined){
            this.snackbar.open('No puede ingresar un insumo ya ingresado','',{duration:2000});
            return;
        }
        // console.log(isNaN(Number(this.Cantidad)));
        this.Detalle.push({ idDetalleCompra:0,
          idCompra :0,
          idInsumo :Number(this.SelectedInsumo),
          cantidad:Number(this.Cantidad),
          descuento:Number(this.DescuentoDeta),
         precioUnitario:this.PrecioUnitario});
         this.DataSourceDetalleCompra.data=this.Detalle;
         this.Total=0;
         for(var tot of this.DataSourceDetalleCompra.data){
           this.Total=this.Total+tot.cantidad*tot.precioUnitario;
         }

         console.log(this.DataSourceDetalleCompra.data);
       
    }

    EraseDetails(id:string){
        
        const op=this.Detalle.findIndex(x=> x.idInsumo===Number(id));
        if(this.Detalle.length==1){
          this.Detalle=[];
          this.Total=0;
            

        }else{
          
          // console.log(this.Detalle[op]);
          this.Total=this.Total- this.Detalle[op].cantidad*this.Detalle[op].precioUnitario;
          this.Detalle.splice(op,1);
        }
        this.DataSourceDetalleCompra.data=this.Detalle;
        // if(op==0){
        //     this.DatosDetalle2.splice(op,op+1);
        // }else
        //     {
        //     this.DatosDetalle2.splice(op,op+1);
        // }
        // this.table?.renderRows();
        // console.log(op);
    }

    
}