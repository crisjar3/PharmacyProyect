import { Component ,Inject} from "@angular/core";
import { inject } from "@angular/core/testing";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Title } from "@angular/platform-browser";
import { Proveedor } from "src/app/model/Proveedor";
import { ApiInsumoService } from "src/app/services/Api.Insumos";
import { ApiProductoService } from "src/app/services/Api.Proucto";
import { ApiproveedorService } from "src/app/services/API.PROVEEDOR";
import { Insumo } from "../Insumo";

interface Selector {
    value: string;
    viewValue: string;
  }

@Component({
  selector: 'app-proveedor',
  templateUrl: './InsumoDialog.html'
//   styleUrls: ['./Product.scss']
})


export class InsumoDialog{
    foods: Selector[] = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
      ];
    public IdInsumo: number=0;
    public Nombre: string="";
    public IdProveedor: number=0;
    public selectedProve:String="";
    public Descripcion: string="";
    public Cantidad: string="";
    prover:Selector[]=[];
    prove:Proveedor[]=[];
    


    pu:boolean=false;

    constructor(
        public dialogRef:MatDialogRef<InsumoDialog>,
        public apiProveedor:ApiInsumoService,
        public snackbar:MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public proveedor:Insumo,
        private title: Title,
        @Inject(MAT_DIALOG_DATA) public ListProv:string[],
        public ApiProveedorList:ApiproveedorService
    ){
       
        
        
           if(proveedor.idInsumo!=null){
            this.Descripcion=proveedor.descripcion;
            this.IdProveedor=proveedor.idProveedor;
           this.Nombre=proveedor.nombre;
           this.Cantidad=proveedor.cantidad.toString();
           this.IdInsumo=proveedor.idInsumo;
           }
           this.listProv();
           
            
            
            
            
            
           
       
    }

    close(){
        this.dialogRef.close();
    }
    listProv(){
        this.ApiProveedorList.getProveedor().subscribe(response=>{
    
            this.prove=response.data;
            if(response.exito==1){
              for(let a of this.prove){
                  this.prover.push({value:a.idProveedor.toString(),viewValue:a.nombreCompleto+" "+a.idProveedor});
              }
            }
             
              
           });
           console.log(this.prover);
        
    }
    addProveedor(){
        console.log(this.selectedProve);
        
        
        
        
        
        const proveedor: Insumo={
            idInsumo:Number(this.IdInsumo),
            nombre:this.Nombre,
            descripcion:this.Descripcion,
            
            idProveedor:Number(this.selectedProve),
            cantidad:Number(this.Cantidad)
            
        };
        

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
            // this.pu=false;
    }
    prueba(){
        this.pu=true;
        
    }

    editProveedor(){
        
        this.pu=true;
        console.log("Editar");
        if(this.selectedProve==''){
            this.snackbar.open('Seleccione un proveedor','',{duration:2000});
            return;
        }
        
        
        const proveedor: Insumo={
            idInsumo:Number(this.IdInsumo),
            nombre:this.Nombre,
            descripcion:this.Descripcion,
            
            idProveedor:Number(this.selectedProve),
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

            this.proveedor={idProveedor:0, nombre:'', descripcion:'', cantidad:0, idInsumo:0};
    }
}