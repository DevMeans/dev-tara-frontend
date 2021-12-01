import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'ProgressBar', url: 'progress' },
        { titulo: 'grafica1', url: 'grafica1' }
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'usuarios', url: 'usuarios' },
        { titulo: 'producto', url: 'producto' },
        { titulo: 'resultante', url: 'resultante' },
        { titulo: 'ListarProducto', url: 'ListarProducto' },
        { titulo: 'ListarResultante', url: 'ListarResultante' }
      ]
    }
  ]
}
