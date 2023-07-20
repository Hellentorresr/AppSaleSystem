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
import { SharedModule } from 'src/app/Reusable/shared/shared.module';//importing the shared module where all angular material are imported
import { ModalUserComponent } from './Model/modal-user/modal-user.component';
import { ModalProductComponent } from './Model/modal-product/modal-product.component';
import { ModalSaledetailsComponent } from './Model/modal-saledetails/modal-saledetails.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    ProductComponent,
    SaleComponent,
    SaleHistoryComponent,
    ReportComponent,
    ModalUserComponent,
    ModalProductComponent,
    ModalSaledetailsComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule      //importing the shared module where all angular material are imported
  ]
})
export class LayoutModule { }
