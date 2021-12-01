import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/models/usuario';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public usuarios: usuario[] = []
  public totalUsuarios: Number = 0
  public desde: number = 0
  public cargando: boolean = true
  public usuariosTemnp: usuario[] = []
  constructor(private usuariosServices: UsuariosService,
    private busquedaServices: BusquedaService) {

  }

  ngOnInit(): void {
    // this.cargando=true
    this.cargarusuarios()

  }


  cargarusuarios() {
    this.usuariosServices.cargarUsuarios(this.desde).subscribe(({ total, usuarios }) => {
      console.log()

      this.totalUsuarios = total
      if (usuarios.length !== 0) {
        this.usuarios = usuarios
      }
      this.cargando = false
      this.usuariosTemnp = usuarios
      console.log(this.usuarios)
      console.log(this.totalUsuarios)
    })
  }
  cambiarPagina(valor: number) {
    this.desde += valor
    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarusuarios();
    // this.cargando=false
  }
  buscar(termino: string) {
    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemnp
    }
    console.log(termino)
    return this.busquedaServices.buscar('usuarios', termino).subscribe(
      (resp: any) => {
        const usuarios = resp.results.map((user: any) => new usuario(
          user.nombre, user.codigo, '', user.uid))
        console.log(resp.results)
        this.usuarios = usuarios
      }
    )
  }
}
