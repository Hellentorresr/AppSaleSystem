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


@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    ProductComponent,
    SaleComponent,
    SaleHistoryComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }