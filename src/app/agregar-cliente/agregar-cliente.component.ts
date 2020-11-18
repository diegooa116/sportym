import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ApiListadoClientesService } from '../api-listado-clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css'],
  providers:[ApiListadoClientesService]
})
export class AgregarClienteComponent implements OnInit {
  formularioagregarCliente:FormGroup;
  clientes: any[] = new Array<any>();
  id;
  datosCliente;
  constructor(private api:ApiListadoClientesService,private fb:FormBuilder) {
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
  crearCliente=()=>{
    this.api.crearunCliente(this.datosCliente).subscribe((data:any)=>{
      //console.log(data);
      this.clientes.push(data);
      Swal.fire({// Mostramos una ventanita para mostrarle al cliente que se agregó un usuario
        title: 'Agregado',
        text: 'Se agregó satisfactoriamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      
    },
    error=> {
      Swal.fire({// Mostramos una ventanita para mostrarle al cliente que ocurrió un error
        title: 'Error',
        text: 'No se ha podido agregar un cliente',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      console.log(error);
    }
    );
  }

}
