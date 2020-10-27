import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  listaClientes: any[] = new Array<any>();// Arreglo para guardar los clientes
  constructor(private basedeDatos: AngularFirestore) { } //Se capturan datos desde la base de datos

  ngOnInit(): void {
    /*this.basedeDatos.collection('clientes').valueChanges().subscribe((clientesDB)=>{//Se capturan los clientes de la base de datos
      this.listaClientes=clientesDB;
    })*/

    this.listaClientes.length = 0;//El arreglo incia vacío    
    this.basedeDatos.collection('clientes').get().subscribe((clientesDB)=>{
      console.log(clientesDB.docs)

      for(let i of clientesDB.docs){
        let cliente = i.data();//Datos del cliente
        cliente.id = i.id;//ID del cliente
        //cliente.ref=i.ref;
        this.listaClientes.push(cliente);
      }

    })

    
  }

}
