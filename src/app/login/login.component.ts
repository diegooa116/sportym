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

  ngOnInit(): void {// Validaciones para los input email y password donde el email es requerido además, de ser de tipo email.El password es solo requerido
    this.formularioLogin = this.creadorFormulario.group({ 
      email:['',Validators.compose([ 
        Validators.required, Validators.email
      ])],
      password:['',Validators.required]
    });
  }

  ingresarUsuario(){
    if(this.formularioLogin.valid){// Siempre que el formulario de login sea válido
      this.datosCorrectos = true;// La variable booleana es verdadera
      this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email,this.formularioLogin.value.password).then((usuario)=>{//Pasamos los parametros caputados en email y password
        console.log(usuario); // una vez termine permitirá el ingreso (si es correcto) o lo denegara mostrando un mensaje de error
      }).catch((error)=>{// En caso de error 
        this.datosCorrectos = false; //La variable booleana es falsa
        this.mensajeError = error.message;// La variable mensajeError es igual a error.message
      })
    }else{//Si el formulario es invalido 
      this.datosCorrectos = false;//La variable booleana es falsa
      this.mensajeError = "Revisa que los datos sean los correctos"//Mensaje en caso de que el formulario sea falso
    }


  }

}