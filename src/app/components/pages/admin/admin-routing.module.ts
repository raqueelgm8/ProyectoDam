import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AnimalNuevoComponent } from './animal-nuevo/animal-nuevo.component';
import { ProductoNuevoComponent } from './producto-nuevo/producto-nuevo.component';


const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'animal-nuevo', component: AnimalNuevoComponent},
  {path: 'producto-nuevo', component: ProductoNuevoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
