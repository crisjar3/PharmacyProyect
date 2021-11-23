

export interface Venta{
    idVenta:number ,
     idDistribuidora:number ,
     idEmpleado:number,
     fecha :Date,
     descuento:number,
     total:number,
     estado:number,
     detallesVenta:DetalleVenta[]

}
 export interface DetalleVenta{
    idDetalleDeVentas :number,
     idVenta :number,
     idProducto :number,
     precioUnitario :number,
     cantidad :number,
     descuento :number,
     total :number
 }