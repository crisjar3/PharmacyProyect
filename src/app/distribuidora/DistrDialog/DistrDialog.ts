import { Component ,Inject} from "@angular/core";
import { inject } from "@angular/core/testing";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Title } from "@angular/platform-browser";
import { Proveedor } from "src/app/model/Proveedor";
import { ApiDistribuidoraService } from "src/app/services/Api.Distribuidora";
import { ApiInsumoService } from "src/app/services/Api.Insumos";
import { ApiProductoService } from "src/app/services/Api.Proucto";
import { ApiproveedorService } from "src/app/services/API.PROVEEDOR";
import { Distribuidora } from "../Distribuidora";


interface Selector {
    value: string;
    viewValue: string;
  }

@Component({
  selector: 'app-proveedor',
  templateUrl: './DistrDialog.html'
//   styleUrls: ['./Product.scss']
})


export class DistrDialog{
    foods: Selector[] = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
      ];
      IdDistribuidora :number=0;
      Nombre :string="";
      Direccion :string="";
      Correo :string="";
     Telefono :string="";
    


    pu:boolean=false;

    constructor(
        public dialogRef:MatDialogRef<DistrDialog>,
        public apiDistr:ApiDistribuidoraService,
        public snackbar:MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public Distri:Distribuidora,
        private title: Title
    ){
       
        
        
           if(Distri.idDistribuidora!=null){
            this.IdDistribuidora=Distri.idDistribuidora;
            this.Nombre=Distri.nombre;
           this.Direccion=Distri.direccion;
           this.Correo=Distri.correo;
           this.Telefono=Distri.nombre;
           }   
       
    }

    close(){
        this.dialogRef.close();
    }
   
    AddDistr(){
        
        
        
        
        
        
        const Distri: Distribuidora={
            idDistribuidora :this.IdDistribuidora,
            nombre :this.Nombre,
            direccion :this.Direccion,
            correo :this.Correo,
           telefono :this.Telefono
            
        };
        

        this.apiDistr.add(Distri).subscribe(response=>{
            
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

    Edit(){
        
        
        
        
        const Distri: Distribuidora={
            idDistribuidora :this.IdDistribuidora,
            nombre :this.Nombre,
            direccion :this.Direccion,
            correo :this.Correo,
           telefono :this.Telefono
            
        };
        
       
        this.apiDistr.edit(Distri).subscribe(response=>{
            if(response.exito==1){
                this.dialogRef.close();
                this.snackbar.open('Editado con exito','',{duration:2000});
            }else{
                this.dialogRef.close();
                this.snackbar.open('Valio pito, no funcionó, lptm','',{duration:2000});
            }
            });

            this.Distri={
                idDistribuidora :0,
            nombre :"",
            direccion :"",
            correo :"",
           telefono :""
            };
    }
}