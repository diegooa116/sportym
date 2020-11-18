import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router'
import { SignInService } from '../sign-in.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router, private sign:SignInService,private creadorFormulario: FormBuilder) { }
  //formularioLogin:FormGroup
  email:string='';
  password:string=''
  ngOnInit(): void {
   /* this.formularioLogin = this.creadorFormulario.group({ 
      email:['',Validators.compose([ //Con esto logramos que hasta que no se llene el formulario no se habilite el boton para enviarlo
        Validators.required, Validators.email
      ])],
      password:['',Validators.required]
    });*/
  }

  agregarUsuario(){
    this.sign.registroUsuario(this.email,this.password)
    .then((res)=>{
      this.router.navigate(['/login']);
    }).catch(err=>console.log('err',err.message))
  }

}
