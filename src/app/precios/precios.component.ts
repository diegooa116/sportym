import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiListadoPreciosService } from '../api-listado-precios.service';

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
    //this.esEditar = true;
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
    this.api.modificarunPrecio(this.datosPrecio).subscribe((data:any)=>{
      //console.log(data);
      this.datosPrecio = data;
      this.getPrecios();
    },
    error=> {
      console.log(error);
    }
    );
  }

  crearPrecio = () =>{
    this.api.crearunPrecio(this.datosPrecio).subscribe((data:any)=>{
      //console.log(data);
      this.datosPrecio = data;
      this.getPrecios();
    },
    error=> {
      console.log(error);
    }
    );
  }

}
