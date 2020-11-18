import { EventEmitter } from '@angular/core';
import { Component, OnInit,Input, Output } from '@angular/core';
import { ApiListadoClientesService } from '../api-listado-clientes.service';
import { Cliente } from '../models/clientes';


@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.css'],
  providers:[ApiListadoClientesService]
})
export class SeleccionarClienteComponent implements OnInit {

  constructor(private api:ApiListadoClientesService) { 
    this.getClientes();
  }
  clientes: Cliente[] = new Array<Cliente>();
  @Input('nombre') nombre:string; //tener en cuenta esto para estudiar
  @Output('seleccionoCliente') seleccionoCliente = new EventEmitter();//Comunicaremos al componente padre(inscripciones) lo que ha hecho el cliente
  @Output('canceloCliente') canceloCliente = new EventEmitter(); 
  ngOnInit(): void {
  }

  getClientes= () =>{
    this.api.obtenerListadoClientes().subscribe((data:any)=>{
      //console.log(data.results)
      //cliente.visible= false;
      data.visible= false;
      this.clientes=data.results;
      //console.log(this.clientes);
    },
    error=> {
      console.log(error);
    }
    );
  }

  buscarClientes(nombre:string){
    this.clientes.forEach((cliente)=>{
      if(cliente.nombre.toLowerCase().includes(nombre.toLowerCase())){
        cliente.visible = true;
      }else{
        cliente.visible=false;
      }
    })
  }

  seleccionarClienteInscripcion(cliente:Cliente){
    
    this.nombre=cliente.nombre + ' ' + cliente.apellido;
    this.clientes.forEach((cliente)=>{// Con esto escondemos la lista desplegable una vez seleccionemos el cliente
      cliente.visible=false;
    })
    //console.log(cliente)
    this.seleccionoCliente.emit(cliente);
  }

  cancelarCliente(){
    this.nombre=undefined;
    this.canceloCliente.emit();
  }

}
