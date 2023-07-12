//This module is accesable just inside the layout folder

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { UserComponent } from './Pages/user/user.component';
import { ProductComponent } from './Pages/product/product.component';
import { SaleComponent } from './Pages/sale/sale.component';
import { SaleHistoryComponent } from './Pages/sale-history/sale-history.component';
import { ReportComponent } from './Pages/report/report.component';
import { SharedModule } from 'src/app/Reusable/shared/shared.module';
import { ModalUserComponent } from './Model/modal-user/modal-user.component';//importing the shared module where all angular material are imported


@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    ProductComponent,
    SaleComponent,
    SaleHistoryComponent,
    ReportComponent,
    ModalUserComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule      //importing the shared module where all angular material are imported
  ]
})
export class LayoutModule { }
