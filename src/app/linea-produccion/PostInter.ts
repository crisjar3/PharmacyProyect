


export interface LineaDeProduccions{
    idLineaDeProduccion:number,
    idProducto:number,
    descripcionLinea:string,
    descripcionProducto:string,
    detalleLinea:DetalleLineaDeProduccions[]
   }
   
   
   
   export interface DetalleLineaDeProduccions{
     idDetalleLineaDeProduccion:number,
     idLineaDeProduccion:number,
       idInsumo:number,
       cantidad:number
   }