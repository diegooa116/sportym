import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiListadoPreciosService } from '../api-listado-precios.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css'],
  providers:[ApiListadoPreciosService]
})
export class PreciosComponent implements OnInit {
  formularioPrecio:FormGroup;
  precios: any[] = new Array<any>();
  id;
  datosPrecio;
  esEditar: boolean = false;
  esAgregar:boolean = true;
  constructor(private api:ApiListadoPreciosService,private fb: FormBuilder) { 
    this.getPrecios();
    this.datosPrecio = {nombre:'',
                        costo:'',
                        duracion:'',
                        tipoDuracion:'' };
  }

  ngOnInit(): void {
    this.formularioPrecio=this.fb.group({ 
      nombre:['',Validators.required],
      costo:['', Validators.required],
      duracion:['',Validators.required],
      tipoDuracion:['',Validators.required]
    });
  }

  getPrecios= () =>{
    this.api.obtenerListadoPrecios().subscribe((data:any)=>{
      console.log(data.results)
      this.precios=data.results;
    },
    error=> {
      console.log(error);
    }
    );
  }

  selectPrecio=(precio)=>{
    this.esAgregar = false;
    this.esEditar = true;
    this.api.obtenerunPrecio(precio.id).subscribe((data:any)=>{
      this.datosPrecio = data;
      console.log(data)
    },
    error=> {
      console.log(error);
    }
    );
  }

  modificarPrecio = () =>{
    this.esEditar = false;
    this.api.modificarunPrecio(this.datosPrecio).subscribe((data:any)=>{
      //console.log(data);
      this.datosPrecio = data;
      this.getPrecios();
    },
    error=> {
      console.log(error);
    }
    );
    this.esAgregar = true;
  }

  crearPrecio = () =>{
    this.api.crearunPrecio(this.datosPrecio).subscribe((data:any)=>{
      //console.log(data);
      this.datosPrecio = data;
      Swal.fire({// Mostramos una ventanita al cliente que se agregó un usuario
        title: 'Agregado',
        text: 'Se agregó satisfactoriamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      this.getPrecios();
    },
    error=> {
      Swal.fire({// Mostramos una ventanita para mostrarle al cliente que ocurrió un error
        title: 'Error',
        text: 'No se ha podido agregar un precio',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      console.log(error);
    }
    );
  }

}
