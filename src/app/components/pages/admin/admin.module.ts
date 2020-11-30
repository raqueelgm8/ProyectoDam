import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AnimalNuevoComponent } from './animal-nuevo/animal-nuevo.component';
import { ProductoNuevoComponent } from './producto-nuevo/producto-nuevo.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { CambiarEstadoPedidoComponent } from './cambiar-estado-pedido/cambiar-estado-pedido.component';
import { CambiarEstadoSolicitudComponent } from './cambiar-estado-solicitud/cambiar-estado-solicitud.component';


@NgModule({
  declarations: [AdminComponent, AnimalNuevoComponent, ProductoNuevoComponent, EditarUsuarioComponent, CambiarEstadoPedidoComponent, CambiarEstadoSolicitudComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    NgxMatSelectSearchModule,
    NgSelectModule,
  ]
})
export class AdminModule { }
