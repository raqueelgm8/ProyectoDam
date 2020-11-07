import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuardGuard } from 'src/app/shared/admin-guard.guard';
import { GuardGuard } from 'src/app/shared/guard.guard';
import { AdminComponent } from './admin/admin.component';
import { AnimalNuevoComponent } from './animal-nuevo/animal-nuevo.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ProductoNuevoComponent } from './producto-nuevo/producto-nuevo.component';


const routes: Routes = [
  {path: '', component: AdminComponent, canActivate: [AdminGuardGuard]},
  {path: 'animal-nuevo', component: AnimalNuevoComponent, canActivate: [AdminGuardGuard]},
  {path: 'producto-nuevo', component: ProductoNuevoComponent, canActivate: [AdminGuardGuard]},
  {path: 'editar-usuario', component: EditarUsuarioComponent, canActivate: [GuardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
