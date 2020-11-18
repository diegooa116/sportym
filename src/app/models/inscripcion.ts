export class Inscripcion{
    //id:String;
    fecha: Date;
    fechaFinal:Date;
    cliente:String;
    tipoInscripcion:String;
    subtotal:number;
    iva:number;
    total:number;


    constructor(){
        //this.id = this.id;
        this.fecha = null;
        this.fechaFinal = null;
        this.cliente = this.cliente;
        this.tipoInscripcion = this.tipoInscripcion;
        this.subtotal = this.subtotal;
        this.iva = this.iva;
        this.total = this.total;
    }

    //Validaciones de todos los parámetros
    validar(): any{
        let respuesta = {
            esValido:false,
            mensaje:""
        }

        if(this.cliente == null || this.cliente == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = 'No tiene un cliente seleccionado'
            return respuesta;
        }
        if(this.tipoInscripcion == null || this.tipoInscripcion == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = 'No tiene un precio seleccionado'
            return respuesta;
        }
        if(this.fecha == null || this.fecha == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = 'No tiene una fecha de inicio'
            return respuesta;
        }
        if(this.fechaFinal == null || this.fechaFinal == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = 'No tiene una fecha de Finalización'
            return respuesta;
        }
        
        if(this.subtotal <= 0 || this.subtotal == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = 'No se ha podido calcular el subtotal'
            return respuesta;
        }
        if(this.iva <= 0 || this.iva == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = 'No se ha podido calcular el iva'
            return respuesta;
        }
        if(this.total <= 0 || this.total == undefined){
            respuesta.esValido = false;
            respuesta.mensaje = 'No se ha podido calcular el total'
            return respuesta;
        }
        respuesta.esValido = true;
        return respuesta;
    }
}