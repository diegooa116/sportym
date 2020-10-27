import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sportym';
  usuario:User;
  simboloCargando: boolean = true;
  constructor(public auth: AngularFireAuth){//Si algo sale mal recordar cambiar de public a private
  
    this.auth.user.subscribe((usuario)=>{
        this.simboloCargando = false;
        this.usuario=usuario;
        console.log(usuario);
    })

  }  
}
