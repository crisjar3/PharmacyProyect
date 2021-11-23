
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatDialogModule} from '@angular/material/dialog'
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import { NgModule } from '@angular/core';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ProductoComponent } from './producto/producto.component';
import { DialogoProovedor } from './proveedor/DialogoProveedor.Add.Edit/DialogProveedor';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';

import { MatFormFieldModule} from '@angular/material/form-field';
import { dialogdelete } from './Common/Delete/Dialog_delete';
import { DialogoProducto } from './producto/ProductoDialog/ProductoDialog';
import { InsumosComponent } from './insumos/insumos.component';
import { LineaProduccionComponent } from './linea-produccion/linea-produccion.component';
import { InsumoDialog } from './insumos/InsumoDIalog/InsumoDialog';
import { MatOption, MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import { DialogLinea } from './linea-produccion/Dialog/DialogoLinea';
import { CompraComponent } from './Compra/Compra.Component';
import { DialogCompra } from './Compra/Dialog/DialogCompra';
import { VentaComponent } from './venta/venta.component';
import { GraficaComponent } from './grafica/grafica.component';
import { DistribuidoraComponent } from './distribuidora/distribuidora.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { DialogVenta } from './venta/Dialog/DialogVenta';

import { ChartsModule } from 'ng2-charts';
import { ColorPickerModule } from 'ngx-color-picker';
import { HistoricoMedicionesChartComponent } from './grafica/historico-mediciones-chart/historico-mediciones-chart.component';
import { DistrDialog } from './distribuidora/DistrDialog/DistrDialog';
import { DialogEmpleado } from './empleado/DialogEmpleado/DialogEmpleado';
import { TransactionPaypalComponent } from './transaction-paypal/transaction-paypal.component';
import { DialogVentaPaypal } from './transaction-paypal/Dialog/DialogVentaPaypal';

import {MatDatepickerModule} from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';









@NgModule({
  declarations: [
    AppComponent,
    ProveedorComponent,
    ProductoComponent,
    LoginComponent,
    HomeComponent,
    DialogoProovedor,
    dialogdelete,
    DialogoProducto,
    InsumosComponent,
    LineaProduccionComponent,
    InsumoDialog,
    CompraComponent,
    DialogCompra,
    VentaComponent,
    GraficaComponent,
    DistribuidoraComponent,
    EmpleadoComponent,
    DialogVenta,
    VentaComponent,
    HistoricoMedicionesChartComponent,
    DistrDialog,
    DialogEmpleado,
    TransactionPaypalComponent,
    DialogVentaPaypal,
    DialogLinea,
    
  ],
  imports: [
    MatSnackBarModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatExpansionModule,
    ChartsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
