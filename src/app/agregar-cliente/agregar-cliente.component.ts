import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {
  formularioagregarCliente:FormGroup;
  porcentajesubidaImagen: number = 0;
  url_imagen: string = '';
  editarCliente:boolean = false;
  id_clienteDB:string;
  constructor(
    private agregar_a_DB:FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.formularioagregarCliente=this.agregar_a_DB.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      celular:['',Validators.required],
      cedula:['',Validators.required],
      email:['',Validators.compose([
        Validators.required, Validators.email
      ])],
      fechaNacimiento:['',Validators.required],
      url_img:['',Validators.required]
    });

     this.id_clienteDB =this.activeRoute.snapshot.params.clienteID;//capturamos el id de nuestros clientes
    if(this.id_clienteDB != undefined){
      this.editarCliente = true;
      this.db.doc<any>('clientes'+"/"+ this.id_clienteDB).valueChanges().subscribe((cliente)=>{
        this.formularioagregarCliente.setValue({
          nombre:cliente.nombre,
          apellido:cliente.apellido,
          celular:cliente.celular,
          cedula:cliente.cedula,
          email:cliente.email,
          fechaNacimiento:new Date(cliente.fechaNacimiento.seconds * 1000).toISOString().substr(0,10),
          url_img:''
        })
        this.url_imagen=cliente.url_img;
      });
    }
    

  }

  agregarCliente(){
    this.formularioagregarCliente.value.url_img = this.url_imagen;
    this.formularioagregarCliente.value.fechaNacimiento = new Date(this.formularioagregarCliente.value.fechaNacimiento);//Cambiamos el tipo de dato de fecha de String a Date
    console.log(this.formularioagregarCliente.value)
    this.db.collection('clientes').add(this.formularioagregarCliente.value).then((guardo)=>{
      console.log('Se guardo el registro')
    });
  }

  editar_cliente(){
    this.formularioagregarCliente.value.url_img = this.url_imagen;
    this.formularioagregarCliente.value.fechaNacimiento = new Date(this.formularioagregarCliente.value.fechaNacimiento);//Cambiamos el tipo de dato de fecha de String a Date
    this.db.doc('clientes/' + this.id_clienteDB).update(this.formularioagregarCliente.value).then((resultado)=>{
      console.log('Datos modificados correctamente')
    }).catch(()=>{
      console.log('Error')
    })
  }

  subirimagenFirebase(evento){
    if(evento.target.files.length>0){//Comprobamos de que si se seleccinó una imagen
      let nombreImagen = new Date().getTime().toString();//optenemos el tiempo para nombrar una imagen
      console.log(evento);
      let file = evento.target.files[0];//Accedemos a la imagen en la posicion 0
      let formatoImagen=file.name.toString().substring(file.name.toString().lastIndexOf('.'));//Capturamos la extensión de la imagen
      let filePath = 'clientes/' + nombreImagen + formatoImagen; //Direccion de la imagen
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.then((datoRecibido)=>{//Con este metodo una vez subida la imagen, avisamos que se cargo correctamente
        console.log("La imagen ha sido subida satisfactoriamente")


        ref.getDownloadURL().subscribe((url)=>{//Con este método capturamos la url de la imagen para guardarla en la base de datos
        this.url_imagen=url;
      })

    })
      task.percentageChanges().subscribe((porcentaje)=>{//Con este metodo simplemente mostramos el porcentaje de subida de la imagen
        this.porcentajesubidaImagen = parseInt(porcentaje.toString());//*****Recordar insertarlo en el progressbar*****
    })
    }
    
  }
  

}
