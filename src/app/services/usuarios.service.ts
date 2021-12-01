import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { registerForm } from '../interfaces/register-form.iterface';
import { loginForm } from '../interfaces/login-form.inteface';
import { catchError, delay, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { usuario } from '../models/usuario';
import { cargarUsuarios } from '../interfaces/cargar-usuarios.interface';
import Swal from 'sweetalert2';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  // public uidUsu:any
  public usuario!: usuario
  constructor(private http: HttpClient, private router: Router,/*public usu:usuario*/) { }
  crearUsuario(formData: registerForm) {
    console.log('creando usuario')
    return this.http.post(`${base_url}/usuario`, formData)

  }
  get token(): string {
    return localStorage.getItem('token') || ''
  }
  get xuid(): string {
    return this.usuario.uid || ''
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || ''
    return this.http.get(`${base_url}/auth/renovarToken`, {
      headers: {
        'x-token': token
      }
    }).pipe(tap((resp: any) => {
      const { nombre, codigo, uid } = resp.usuario
      this.usuario = new usuario(nombre, codigo, '', uid)
      //this.usuario.imprimirUsuario()
      // console.log(resp.usuario)
      //   this.uidUsu=resp.usuario.uid
      console.log(this.usuario)
      localStorage.setItem('token', resp.token)
    }), map(resp => true),
      catchError(error => {
        console.log(error)
        return of(false)

      }


      )
    )
  }

  actualizarPerfil(data: { correo: string, nombre: string }) {
    console.log('este es el : ' + this.xuid)
    return this.http.put(`${base_url}/usuario/${this.xuid}`, data, {
      headers: {
        'x-token': this.token
      }
    })
  }

  login(formdata: loginForm) {
    return this.http.post(`${base_url}/auth`, formdata).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)

      })
    )
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  }
  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuario?desde=${desde}`
    return this.http.get<cargarUsuarios>(url, this.headers).pipe(
      map(resp => {
        const usuarios = resp.results.map(user => new usuario(
          user.nombre, user.codigo, '',  user.uid, user.estado
        ))
        return {
          total: resp.total,
          usuarios
        }
      })
    )
  }




}
