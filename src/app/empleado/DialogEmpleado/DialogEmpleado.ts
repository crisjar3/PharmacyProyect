import { Template } from "@angular/compiler/src/render3/r3_ast";
import { Component ,Inject} from "@angular/core";
import { inject } from "@angular/core/testing";
import { MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Title } from "@angular/platform-browser";
import { Proveedor } from "src/app/model/Proveedor";
import { ApiEmpleadoService } from "src/app/services/Api.Empleado";
import { ApiproveedorService } from "src/app/services/API.PROVEEDOR";
import { DialogVenta } from "src/app/venta/Dialog/DialogVenta";
import { Empleado } from "../Empleado";

@Component({
  selector: 'app-proveedor',
  templateUrl: './DialogEmpleado.html'
})


export class DialogEmpleado{
    IdEmpleado:number=0;
    NombreCompleto :string="";
    // IdPuestoTrabajo :string="";
    IdPuestoTrabajo :number=0;
    Cedula :string="";
    Direccion :string="";
    Telefono :string="";
    Correo:string="";
    Estado :number=0;

    pu:boolean=false;

    constructor(
        public dialogRef:MatDialogRef<DialogEmpleado>,
        public ApiEmpleado:ApiEmpleadoService,
        public snackbar:MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public empleado:Empleado,
        private title: Title
    ){
       
        
        if(empleado.idEmpleado!=null){
            this.IdEmpleado=empleado.idEmpleado;
            this.NombreCompleto=empleado.nombreCompleto;
         this.IdPuestoTrabajo=empleado.idPuestoTrabajo;
            
            
            this.Cedula=empleado.cedula;
            this.Direccion=empleado.direccion;
            this.Telefono=empleado.telefono;
            this.Correo=empleado.correo;
            this.Estado=empleado.estado;
        }
           
       
    }

    close(){
        this.dialogRef.close();
    }
    addProveedor(){
       
        
        
        
        const numeroPuesto:number=Number(this.IdPuestoTrabajo);
        const Estado:number=Number(this.Estado);
        const Emple: Empleado={
            idEmpleado:this.IdEmpleado,
            nombreCompleto :this.NombreCompleto,
            idPuestoTrabajo :numeroPuesto,
            cedula :this.Cedula,
            direccion :this.Direccion,
            telefono :this.Telefono,
            correo:this.Correo,
            estado :Estado
            
        };
        // const o=4;
        // if(!isNaN(this.IdPuestoTrabajo)){
        //     console.log(this.IdPuestoTrabajo);
        //     console.log('Es numero');
        // }

        // return;

        this.ApiEmpleado.add(Emple).subscribe(response=>{
            
            if(response.exito==1){
                
                this.dialogRef.close();
                this.snackbar.open('insertado con exito','',{duration:2000});
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
        
        
        
        
        const numeroPuesto:number=Number(this.IdPuestoTrabajo);
        const Estado:number=Number(this.Estado);
        const Emple: Empleado={
            idEmpleado:this.IdEmpleado,
            nombreCompleto :this.NombreCompleto,
            idPuestoTrabajo :numeroPuesto,
            cedula :this.Cedula,
            direccion :this.Direccion,
            telefono :this.Telefono,
            correo:this.Correo,
            estado :Estado
            
        };
        
       
        this.ApiEmpleado.edit(Emple).subscribe(response=>{
            if(response.exito==1){
                this.dialogRef.close();
                this.snackbar.open('Editado con exito','',{duration:2000});
            }else{
                this.dialogRef.close();
                this.snackbar.open('Valio pito, no funcionó, lptm','',{duration:2000});
            }
            });

            // this.empleado={ idEmpleado:0,
            //     nombreCompleto :'',
            //     idPuestoTrabajo :'',
            //     cedula :'',
            //     direccion :'',
            //     telefono :'',
            //     correo:'',
            //     estado :0};
    }
}