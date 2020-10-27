import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { ClientesComponent } from './clientes/clientes.component';

const routes: Routes = [
  {
    path: 'clientes', component:ClientesComponent
  },
  {
    path: 'agregar-cliente', component:AgregarClienteComponent //ruta para ir a la vista de agregar clientes
  },
  {
    path: 'agregar-cliente/:clienteID', component:AgregarClienteComponent //ruta para ir a la vista de editar clientes con parametro de id del cliente
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
