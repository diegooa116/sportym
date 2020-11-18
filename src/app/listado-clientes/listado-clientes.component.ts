import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ApiListadoClientesService } from '../api-listado-clientes.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css'],
  providers:[ApiListadoClientesService]
})
export class ListadoClientesComponent /*implements OnInit */{
  formularioagregarCliente:FormGroup;
  clientes: any[] = new Array<any>();
  id;
  datosCliente;
  constructor(private api:ApiListadoClientesService,private fb:FormBuilder) {
    this.getClientes();
    this.datosCliente = {nombre:'',
                        apellido:'',
                        celular:'',
                        cedula:'',
                        email:'',
                        fechaNacimiento:'' };
   }

  ngOnInit(): void {
    this.formularioagregarCliente=this.fb.group({//Validaciones para los inputs
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      celular:['',Validators.required],
      cedula:['',Validators.required],
      email:['',Validators.compose([
        Validators.required, Validators.email
      ])],
      fechaNacimiento:['',Validators.required]
    });
  }
  getClientes= () =>{
    this.api.obtenerListadoClientes().subscribe((data:any)=>{
      console.log(data.results)
      this.clientes=data.results;
    },
    error=> {
      console.log(error);
    }
    );
  }
  selectCliente = (cliente)=>{//Seleccionamos el id de los clientes en la tabla de listados de cliente
    //console.log(cliente.id);
    this.api.obtenerunCliente(cliente.id).subscribe((data:any)=>{
      console.log(data);
      this.datosCliente = data;
    },
    error=> {
      console.log(error);
    }
    );
  }

  modificarCliente=()=>{
    this.api.modificarunCliente(this.datosCliente).subscribe((data:any)=>{
      //console.log(data);
      //this.datosCliente = data;
      this.getClientes();
    },
    error=> {
      console.log(error);
    }
    );
  }

  /*crearCliente=()=>{
    this.api.crearunCliente(this.datosCliente).subscribe((data:any)=>{
      //console.log(data);
      this.clientes.push(data);
    },
    error=> {
      console.log(error);
    }
    );
  }*/

eliminarCliente=()=>{
    this.api.eliminarunCliente(this.datosCliente.id).subscribe((data:any)=>{
      //console.log(data);
      this.getClientes();
    },
    error=> {
      console.log(error);
    }
    );
  }

}
