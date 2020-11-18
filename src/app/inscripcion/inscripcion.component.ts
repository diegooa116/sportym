import { Inscripcion } from './../models/inscripcion';
import { Precio } from './../models/precios';
import { Component, OnInit } from '@angular/core';
import { ApiListadoPreciosService } from '../api-listado-precios.service';
import { Cliente } from '../models/clientes';
import { ApiInscripcionesService } from '../api-inscripciones.service';



@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css'],
  providers:[ApiInscripcionesService]
})
export class InscripcionComponent implements OnInit {
  ivaActual:number=0.19;
  inscripcion:Inscripcion = new Inscripcion();
  clienteSeleccionado: Cliente = new Cliente();
  precioSeleccionado:Precio = new Precio();
  precios:Precio[] = new Array <Precio>();
  constructor(private api:ApiListadoPreciosService,private ins:ApiInscripcionesService) { 
    this.getPrecios();
    this.getInscripcion();
  }

  ngOnInit(): void {
    
  }
  getPrecios= () =>{
    this.api.obtenerListadoPrecios().subscribe((data:any)=>{
      this.precios=data.results;
      //this.precios.push(data);
      //console.log(this.precios)
    },
    error=> {
      console.log(error);
    }
    );
  }
  asignarCliente(cliente:Cliente){//Recibimos el cliente desde seleccionar-Cliente
    this.inscripcion.cliente = cliente.id;
    this.clienteSeleccionado = cliente;
  }

  eliminarCliente(){
    this.clienteSeleccionado = new Cliente(); //Con esto se elimina el cliente seleccionado
    this.inscripcion.cliente = undefined;
  }

  guardarInscripcion(){
    if(this.inscripcion.validar().esValido){
      console.log('Guardando');
    }else{
      console.log(this.inscripcion.validar().mensaje);
    }
    

  }

  seleccionarPrecio(id:String){

    if(id !="null"){

      this.precioSeleccionado = this.precios.find(x => x.id == id);
      this.inscripcion.tipoInscripcion = this.precioSeleccionado.id;//Asigna cliente con precios
      console.log(this.precioSeleccionado);

      this.inscripcion.subtotal = this.precioSeleccionado.costo;
      this.inscripcion.iva = this.inscripcion.subtotal * this.ivaActual;
      this.inscripcion.total = this.inscripcion.subtotal + this.inscripcion.iva;
      this.inscripcion.fecha = new Date();

      if (this.precioSeleccionado.tipoDuracion == '1') {
        let dias: number = this.precioSeleccionado.duracion;
        let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias) //Los meses inician desde 0  10=Noviembre
        this.inscripcion.fechaFinal = fechaFinal;
      }

      if (this.precioSeleccionado.tipoDuracion == '2') {
        let dias: number = this.precioSeleccionado.duracion * 7;//Recordar que es semana
        let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias) //Los meses inician desde 0  10=Noviembre
        this.inscripcion.fechaFinal = fechaFinal;
      }

      if (this.precioSeleccionado.tipoDuracion == '3') {
        let dias: number = this.precioSeleccionado.duracion * 15;//Recordar que es quincena
        let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias) //Los meses inician desde 0  10=Noviembre
        this.inscripcion.fechaFinal = fechaFinal;
      }

      if (this.precioSeleccionado.tipoDuracion == '4') {
        let dia: number = this.inscripcion.fecha.getDate();//Recordar que es para MES
        let mes = this.precioSeleccionado.duracion + this.inscripcion.fecha.getMonth();
        let anio: number = this.inscripcion.fecha.getFullYear();


        let fechaFinal = new Date(anio, mes, dia) //Los meses inician desde 0  10=Noviembre
        this.inscripcion.fechaFinal = fechaFinal;
      }



      if (this.precioSeleccionado.tipoDuracion == '5') {
        let dia: number = this.inscripcion.fecha.getDate();//Recordar que es para Año
        let mes = this.inscripcion.fecha.getMonth();
        let anio: number = this.inscripcion.fecha.getFullYear() + this.precioSeleccionado.duracion;


        let fechaFinal = new Date(anio, mes, dia)
        this.inscripcion.fechaFinal = fechaFinal;
      }
        console.log(this.inscripcion);
    }else{

      this.precioSeleccionado = new Precio();
      this.inscripcion.tipoInscripcion = "0";//Asigna cliente con precios
      this.inscripcion.fecha = null;
      this.inscripcion.fechaFinal=null;
      this.inscripcion.subtotal = 0;
      this.inscripcion.iva = 0;
      this.inscripcion.total = 0;
    }
  }

  getInscripcion= () =>{
    this.ins.obtenerListadoInscripcion().subscribe((data:any)=>{
      console.log(data.results)
      //this.precios=data.results;
    },
    error=> {
      console.log(error);
    }
    );
  }



}
