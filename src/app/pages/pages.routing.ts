import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AuthGuard } from '../guards/auth.guard';
import { UsuariosComponent } from './matenimientos/usuarios/usuarios.component';
import { ProductosComponent } from './matenimientos/productos/productos.component';
import { ProductoResultanteComponent } from './matenimientos/producto-resultante/producto-resultante.component';
import { ListarProductosComponent } from './matenimientos/listar-productos/listar-productos.component';
import { ListarResultanteComponent } from './matenimientos/listar-resultante/listar-resultante.component';



const routes: Routes = [

  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica1', component: Grafica1Component },
      { path: 'producto', component: ProductosComponent },
      { path: 'resultante', component: ProductoResultanteComponent },
      { path: 'ListarProducto', component: ListarProductosComponent },
      { path: 'ListarResultante', component: ListarResultanteComponent },
      { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios De aplicacion' } }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
