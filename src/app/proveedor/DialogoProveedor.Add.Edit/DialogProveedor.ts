import { Template } from "@angular/compiler/src/render3/r3_ast";
import { Component ,Inject} from "@angular/core";
import { inject } from "@angular/core/testing";
import { MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Title } from "@angular/platform-browser";
import { Proveedor } from "src/app/model/Proveedor";
import { ApiproveedorService } from "src/app/services/API.PROVEEDOR";
import { ProveedorComponent } from "../proveedor.component";
@Component({
  selector: 'app-proveedor',
  templateUrl: './DialogProveedor.html'
})


export class DialogoProovedor{
    public idProveedor: number=0;
    public nombre: string="";
    public direccion: string="";
    public Numero: string="";
    public Correo: string="";
    public cedula: string="";

    pu:boolean=false;

    constructor(
        public dialogRef:MatDialogRef<DialogoProovedor>,
        public apiProveedor:ApiproveedorService,
        public snackbar:MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public proveedor:Proveedor,
        private title: Title
    ){
       
        
        this.idProveedor=proveedor.idProveedor;
           this.nombre=proveedor.nombreCompleto;
           
            this.direccion=proveedor.direccion;
            this.Numero=proveedor.telefono;
            this.Correo=proveedor.correo;
            this.cedula=proveedor.cedula;
           
       
    }

    close(){
        this.dialogRef.close();
    }
    addProveedor(){
        console.log("Agregar");
        
        this.pu=false;
        
        
        const proveedor:Proveedor ={
            idProveedor:0,
            nombreCompleto:this.nombre,
            direccion:this.direccion,
            telefono:this.Numero,
            correo:this.Correo,
            cedula:this.cedula   
        };
        console.log(proveedor);
        

        this.apiProveedor.add(proveedor).subscribe(response=>{
            
            if(response.exito==1){
                
                this.dialogRef.close();
                this.snackbar.open('cliente insertado con exito','',{duration:2000});
            }else{
                
                console.log(response.mensaje);
                this.dialogRef.close();
                this.snackbar.open('Valio pito, no funcionó, lptm','',{duration:2000});
            }
            });
    }
    prueba(){
        this.pu=true;
        
    }

    editProveedor(){
        
        this.pu=true;
        
        
        const proveedor:Proveedor ={
            idProveedor:Number(this.idProveedor),
            nombreCompleto:this.nombre,
            direccion:this.direccion,
            telefono:this.Numero,
            correo:this.Correo,
            cedula:this.cedula   
        };
        console.log(proveedor.direccion);
       
        this.apiProveedor.edit(proveedor).subscribe(response=>{
            if(response.exito==1){
                this.dialogRef.close();
                this.snackbar.open('cliente Editado con exito','',{duration:2000});
            }else{
                this.dialogRef.close();
                this.snackbar.open('Valio pito, no funcionó, lptm','',{duration:2000});
            }
            });

            this.proveedor={idProveedor:0, nombreCompleto:'', direccion:'', telefono:'', correo:'',cedula:""};
    }
}