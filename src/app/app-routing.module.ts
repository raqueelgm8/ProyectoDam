import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) },
  { path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) },
  { path: 'adopciones', loadChildren: () => import('./components/pages/adopciones/adopciones.module').then(m => m.AdopcionesModule) },
  { path: 'productos', loadChildren: () => import('./components/pages/productos/productos.module').then(m => m.ProductosModule) },
  { path: 'registro', loadChildren: () => import('./components/pages/registro/registro.module').then(m => m.RegistroModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
