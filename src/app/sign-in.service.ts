import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private afsAuth:AngularFireAuth) { }

  registroUsuario(email:string,password:string){
    return new Promise((resolve,reject)=>{
      this.afsAuth.createUserWithEmailAndPassword(email,password)
      .then(userData =>resolve(userData),
      err => reject(err));
    })
  }
}
