import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiListadoPreciosService {

  constructor(private http: HttpClient) { }
  baseurl = "http://127.0.0.1:8000"
  httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})

  obtenerListadoPrecios(): Observable<any>{
    return this.http.get(this.baseurl + '/precios/',
    {headers: this.httpHeaders});
  }

  obtenerunPrecio(id): Observable<any>{
    return this.http.get(this.baseurl + '/precios/' + id + '/',
    {headers: this.httpHeaders});
  }

  modificarunPrecio(precio): Observable<any>{
    const body = {nombre:precio.nombre,
                  costo:precio.costo,
                  duracion:precio.duracion,
                  tipoDuracion:precio.tipoDuracion}
    return this.http.put(this.baseurl + '/precios/' + precio.id + '/',body,
    {headers: this.httpHeaders});
  }

  crearunPrecio(precio): Observable<any>{
    const body = {nombre:precio.nombre,
                  costo:precio.costo,
                  duracion:precio.duracion,
                  tipoDuracion:precio.tipoDuracion}
    return this.http.post(this.baseurl + '/precios/', body,
    {headers: this.httpHeaders});
  }
}


