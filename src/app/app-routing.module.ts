import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompraComponent } from './Compra/Compra.Component';
import { DistribuidoraComponent } from './distribuidora/distribuidora.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { GraficaComponent } from './grafica/grafica.component';
import { HomeComponent } from './home/home.component';
import { InsumosComponent } from './insumos/insumos.component';
import { LineaProduccionComponent } from './linea-produccion/linea-produccion.component';
import { ProductoComponent } from './producto/producto.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { TransactionPaypalComponent } from './transaction-paypal/transaction-paypal.component';
import { VentaComponent } from './venta/venta.component';

const routes: Routes = [
  {path : '',redirectTo : '/home',pathMatch:'full'},
  {path : 'home', component:HomeComponent},
  {path : 'proveedore', component:ProveedorComponent},
  {path : 'producto', component:ProductoComponent},
  {path : 'Insumos', component:InsumosComponent},
  {path : 'LineaProduccion', component:LineaProduccionComponent},
  {path : 'Compra', component:CompraComponent},
  {path : 'Venta', component:VentaComponent},
  {path : 'Estadisticas', component:GraficaComponent},
  {path : 'Empleado', component:EmpleadoComponent},
  {path : 'Distribuidora', component:DistribuidoraComponent},
  {path : 'Pago', component:TransactionPaypalComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
