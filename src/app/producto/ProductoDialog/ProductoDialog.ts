import { Component ,Inject} from "@angular/core";
import { inject } from "@angular/core/testing";
import { MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Title } from "@angular/platform-browser";
import { Proveedor } from "src/app/model/Proveedor";
import { ApiProductoService } from "src/app/services/Api.Proucto";
import { ApiproveedorService } from "src/app/services/API.PROVEEDOR";
import { Producto } from "../Productos";

@Component({
  selector: 'app-proveedor',
  templateUrl: './ProductoDialog.html',
  styleUrls: ['./Product.scss']
})


export class DialogoProducto{
    public idPrducto: number=0;
    public nombre: string="";
    public descripcion: string="";
    public Cantidad: string="";
    public Precio: string="";


    pu:boolean=false;

    constructor(
        public dialogRef:MatDialogRef<DialogoProducto>,
        public apiProveedor:ApiProductoService,
        public snackbar:MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public proveedor:Producto,
        private title: Title
    ){
       
        
        
           if(proveedor.idProducto!=null){
            this.descripcion=proveedor.descripcion;
            this.idPrducto=proveedor.idProducto;
           this.nombre=proveedor.nombre;
           this.Cantidad=proveedor.cantidad.toString();
           this.Precio=proveedor.precio.toString();
           }
            
           
            
            
            
            
            
           
       
    }

    close(){
        this.dialogRef.close();
    }
    addProveedor(){
        console.log("Agregar");
        
        
        
        
        const proveedor: Producto={
            idProducto:Number(this.idPrducto),
            nombre:this.nombre,
            descripcion:this.descripcion,
            
            precio:Number(this.Precio),
            cantidad:Number(this.Cantidad)
            
        };
        

        this.apiProveedor.add(proveedor).subscribe(response=>{
            
            if(response.exito==1){
                
                this.dialogRef.close();
                this.snackbar.open('insertado con exito','',{duration:2000});
            }else{
                
                console.log(response.mensaje);
                this.dialogRef.close();
                this.snackbar.open('Valio pito, no funcionó, lptm','',{duration:2000});
            }
            });
            // this.pu=false;
    }
    prueba(){
        this.pu=true;
        
    }

    editProveedor(){
        
        this.pu=true;
        console.log("Editar");
        
        
        const proveedor:Producto ={
            idProducto:Number(this.idPrducto),
            nombre:this.nombre,
            descripcion:this.descripcion,
            
            precio:Number(this.Precio),
            cantidad:Number(this.Cantidad)
        };
       
        this.apiProveedor.edit(proveedor).subscribe(response=>{
            if(response.exito==1){
                this.dialogRef.close();
                this.snackbar.open('cliente Editado con exito','',{duration:2000});
            }else{
                this.dialogRef.close();
                this.snackbar.open('Valio pito, no funcionó, lptm','',{duration:2000});
            }
            });

            this.proveedor={idProducto:0, nombre:'', descripcion:'', cantidad:0, precio:0};
    }
}