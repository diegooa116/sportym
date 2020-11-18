import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formularioLogin:FormGroup
  datosCorrectos: boolean = true;
  mensajeError:string;
  constructor(private creadorFormulario: FormBuilder, public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.formularioLogin = this.creadorFormulario.group({ 
      email:['',Validators.compose([ //Con esto logramos que hasta que no se llene el formulario no se habilite el boton para enviarlo
        Validators.required, Validators.email
      ])],
      password:['',Validators.required]
    });
  }

  ingresarUsuario(){
    if(this.formularioLogin.valid){
      this.datosCorrectos = true;
      this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email,this.formularioLogin.value.password).then((usuario)=>{//Pasamos los parametros caputados en email y password
        console.log(usuario); 
      }).catch((error)=>{
        this.datosCorrectos = false;
        this.mensajeError = error.message;
      })
    }else{
      this.datosCorrectos = false;
      this.mensajeError = "Revisa que los datos sean los correctos"
    }
    

  }

}
