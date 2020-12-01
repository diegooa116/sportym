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
      nombre:['',Validators.required],   // Para valir que el input nombre es requerido
      apellido:['',Validators.required], // Para valir que el input apellido es requerido
      celular:['',Validators.required],  // Para valir que el input celular es requerido
      cedula:['',Validators.required],   // Para valir que el input celular es requerido
      email:['',Validators.compose([    // Para validar que el input email es requerido y sea de tipo email 
        Validators.required, Validators.email
      ])],
      fechaNacimiento:['',Validators.required]  // Para validar que el input fechaNacimiento es requerido
    });
  }
  crearCliente=()=>{
    this.api.crearunCliente(this.datosCliente).subscribe((data:any)=>{
      this.clientes.push(data);// Para agregar un nuevo cliente al array clientes cuando sea llamada la función
      Swal.fire({// Mostramos una ventanita al cliente que se agregó un usuario
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
