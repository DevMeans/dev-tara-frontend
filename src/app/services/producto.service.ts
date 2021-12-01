import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, tap } from 'rxjs/operators'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient, private router: Router) {

  }
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  crearProducto(formdata: any) {
    console.log('creando producto')
    return this.http.post(`${base_url}/producto`, formdata, this.headers)
  }
  crearProductoResultante(formdata: any) {
    console.log('creando productoResultante'),
      console.log(formdata)
    return this.http.post(`${base_url}/PResultantes`, formdata, this.headers)
  }
  listarProduco() {
    const url = `${base_url}/producto`;
    return this.http.get(url, this.headers).pipe(
      map((resp:any) => resp.results)
    )
  }
  listarResultante() {
    const url = `${base_url}/PResultantes`;
    return this.http.get(url, this.headers).pipe(
      map((resp:any) => resp.results)
    )
  }
  eliminarProducto(_id:string) {
    const url = `${base_url}/producto/${_id}`;
    return this.http.delete(url, this.headers);
  }
  eliminarResultante(_id:string) {
    const url = `${base_url}/PResultantes/${_id}`;
    return this.http.delete(url, this.headers);
  }
  cargarUsuarios(desde: number = 0) {

  }
}
