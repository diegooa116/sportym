import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiListadoClientesService {

  constructor(private http: HttpClient) { }
  baseurl = "http://127.0.0.1:8000"
  httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})
  
  obtenerListadoClientes(): Observable<any>{
    return this.http.get(this.baseurl + '/baseGym/',
    {headers: this.httpHeaders});
  }
  //selectCliente(){// Método para seleccionar los clientes que tenemos en nuestra tabla-clientes

  //}
  obtenerunCliente(id): Observable<any>{
    return this.http.get(this.baseurl + '/baseGym/' + id + '/',
    {headers: this.httpHeaders});
  }

  modificarunCliente(cliente):Observable<any>{
    const parametros = {nombre:cliente.nombre,
                        apellido:cliente.apellido,
                        celular:cliente.celular,
                        cedula:cliente.cedula,
                        email:cliente.email,
                        fechaNacimiento:cliente.fechaNacimiento };
    return this.http.put(this.baseurl + '/baseGym/' + cliente.id + '/', parametros,
    {headers: this.httpHeaders});
  }

  crearunCliente(cliente):Observable<any>{
    const parametros = {nombre:cliente.nombre,
                        apellido:cliente.apellido,
                        celular:cliente.celular,
                        cedula:cliente.cedula,
                        email:cliente.email,
                        fechaNacimiento:cliente.fechaNacimiento };
    return this.http.post(this.baseurl + '/baseGym/', parametros,
    {headers: this.httpHeaders});
  }

  eliminarunCliente(id):Observable<any>{
    return this.http.delete(this.baseurl + '/baseGym/'+ id + '/',
    {headers: this.httpHeaders});
  }

}
