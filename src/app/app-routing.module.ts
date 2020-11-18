import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { ClientesComponent } from './clientes/clientes.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { PreciosComponent } from './precios/precios.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:'', redirectTo:'inscripcion',pathMatch:'full'
  },
  {
    path:'inscripcion', component:InscripcionComponent
  },
  {
    path: 'listado-clientes', component:ListadoClientesComponent
  },
  {
    path: 'register', component:RegisterComponent
  },
  {
    path: 'clientes', component:ClientesComponent
  },
  {
    path: 'agregar-cliente', component:AgregarClienteComponent //ruta para ir a la vista de agregar clientes
  },
  {
    path:'precios', component:PreciosComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
