import { Component ,Inject, OnInit, ViewChild} from "@angular/core";
import { inject } from "@angular/core/testing";
import { MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { Title } from "@angular/platform-browser";
import { Insumo } from "src/app/insumos/Insumo";
import { Proveedor } from "src/app/model/Proveedor";
import { Producto } from "src/app/producto/Productos";
import { ApiInsumoService } from "src/app/services/Api.Insumos";
import { ApiLineaproduccionService } from "src/app/services/Api.LineaProduccion";
import { ApiProductoService } from "src/app/services/Api.Proucto";
import { ApiproveedorService } from "src/app/services/API.PROVEEDOR";
import { DetalleLineaDeProduccion, LineaDeProduccion} from "../Linea_Prod";
import { DetalleLineaDeProduccions, LineaDeProduccions} from "../PostInter";


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
  templateUrl: './DialogLinea.html',
  styleUrls:['./DialogLinea.scss']
})



export class DialogLinea implements OnInit{
    //Aca el valor selecccionado de proveedor
    selectedProve:string="";
    //aca el elgido de insumo
    SelectedInsumo:string="";
    //aca son los elementos de la tabla detalle de line
    Cantidad:number=0;
    IdInsumo:number=0;
    //Aca esta los de linea de produccion general
    IdLineaDeProduccion:number=0;
 IdProducto:number=0;
 DescripcionLinea:string="";
 DescripcionProducto:string="";
//detalles de la linea
Datosdeta:DetalleLineaDeProduccions[]=[];
 //el prover es para mostrar los elementos del combobox
 prover:Selector[]=[];
 //el prove recibe los datos del apiproveedor y los inserta modificado en prover
    prove:Producto[]=[];

    //ACa selector para insumos
    InsumoComboBox:Selector[]=[];
    //aca el que recibe de insumo
    InsumoArray:Insumo[]=[];
    public ColumnasD:string []=[
        'IdInsumo',
        'Cantidad',
        'Acciones'
      ];

      DatosDetalle=[{IdInsumo:'',
        Cantidad:''}];
    DatosDetalle2=[{IdInsumo:'',
        Cantidad:''}];
     

      @ViewChild(MatTable) table: MatTable<TableDetailsView> | undefined;
      




    constructor(
        public dialogRef:MatDialogRef<DialogLinea>,
        public apiProveedor:ApiLineaproduccionService,
        public snackbar:MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public linea:LineaDeProduccions,
        private title: Title,
        public apiProd:ApiProductoService,
        public APiInsumo:ApiInsumoService
        // public Full:PostLineaDeProduccionRequest
    ){
        if(linea.idLineaDeProduccion!=null){
            this.IdLineaDeProduccion=linea.idLineaDeProduccion;
            this.IdProducto=linea.idProducto;
            this.DescripcionLinea=linea.descripcionLinea;
            this.DescripcionProducto=linea.descripcionProducto;
            // this.Detalle=linea.detalle;
           }
           this.listar();
           
           
           
            
       
    }
    ngOnInit(): void {
        
       
        
          }

    close(){
        this.dialogRef.close();
    }
    AddlineaProduccion(){
        console.log(this.Datosdeta.length);

        
        
        
      

        
        const LineaDirecta: LineaDeProduccions={
            idLineaDeProduccion:0,
            idProducto:Number(this.selectedProve),
            descripcionLinea:this.DescripcionLinea,
            descripcionProducto:this.DescripcionProducto,
            // detalleLinea:[{idDetalleLineaDeProduccion:40,idInsumo:1,idLineaDeProduccion:1,cantidad:12500}]
            detalleLinea:[]
            
        };
        var n:number;
        var Canti:number;
        for (var a of this.Datosdeta){
           n=a.idInsumo;
           Canti=a.cantidad;
           
            LineaDirecta.detalleLinea.push({idDetalleLineaDeProduccion:40,idInsumo:Number(a.idInsumo),
                idLineaDeProduccion:1,cantidad:Number(a.cantidad)});
        }
        

        

        this.apiProveedor.add(LineaDirecta).subscribe(response=>{
            
            if(response.exito==1){
                
                this.dialogRef.close();
                this.snackbar.open('Linea de Produccion Insertada','Exito',{duration:2000});
                console.log(response.mensaje);
            }else{
               // console.log("la cagaste chatel");
                console.log(response.mensaje);
                this.dialogRef.close();
            //   this.snackbar.open('Lamentablemente,no se insertó con exito','',{duration:2000});
            }
            });
            
    }
    
    listar(){
        this.apiProd.getProveedor().subscribe(response=>{
    
            this.prove=response.data;
            if(response.exito==1){
              for(let a of this.prove){
                  this.prover.push({value:a.idProducto.toString(),viewValue:a.nombre+" "+a.idProducto});
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
        
            const ConsultaInsumo=this.InsumoArray.find(a=> a.idInsumo===Number(this.SelectedInsumo));
        if(ConsultaInsumo!.cantidad<this.Cantidad){
            this.snackbar.open('Na hay suficiente insumo','Alerta, esta bien pendejo',{duration:2000});
            return;
        }
       
        if(this.Datosdeta.find(a=> a.idInsumo===Number(this.SelectedInsumo))!=undefined){
            this.snackbar.open('No puede ingresar un insumo ya ingresado','',{duration:2000});
            return;
        }
        
        this.Datosdeta.push({ idLineaDeProduccion:0,idDetalleLineaDeProduccion:0,idInsumo:Number(this.SelectedInsumo),cantidad:this.Cantidad});
        this.table?.renderRows();
    }

    EraseDetails(id:string){
        
        const op=this.Datosdeta.findIndex(x=> x.idInsumo===Number(id));
        
       
        if(op==0){
          
            this.Datosdeta=[];
        }else
            {
            this.Datosdeta.splice(op,1);
        }
        this.table?.renderRows();
        
    }
    
}