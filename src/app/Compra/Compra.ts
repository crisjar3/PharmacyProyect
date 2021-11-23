export interface Compra{
    idCompra:number, 
    idEmpleado:number
    total:number, 
    descuento:number,
    fecha:Date, 
    idTipoEstadoCrompa:number,
    detallesCompras:DetalleCompra[]

}


export interface DetalleCompra{
     idDetalleCompra:number ,
     idCompra :number,
     idInsumo :number,
     cantidad:number,
     descuento:number,
    precioUnitario:number
}