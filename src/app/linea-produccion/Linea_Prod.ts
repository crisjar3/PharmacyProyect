export interface LineaDeProduccion{
 idLineaDeProduccion:number,
 idProducto:number,
 descripcionLinea:string,
 descripcionProducto:string,
}



export interface DetalleLineaDeProduccion{
    idDetalleLineaDeProduccion:number,
    idLineaDeProduccion:number,
    idInsumo:number,
    cantidad:number
}
