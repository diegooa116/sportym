import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { ClientesComponent } from './clientes/clientes.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { HttpClientModule} from  '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { PreciosComponent } from './precios/precios.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { SeleccionarClienteComponent } from './seleccionar-cliente/seleccionar-cliente.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EncabezadoComponent,
    ClientesComponent,
    AgregarClienteComponent,
    ListadoClientesComponent,
    RegisterComponent,
    PreciosComponent,
    InscripcionComponent,
    SeleccionarClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule
  ],
  providers: [
    AngularFireModule,
    AngularFireAuth,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
