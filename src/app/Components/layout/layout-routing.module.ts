import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { UserComponent } from './Pages/user/user.component';
import { ProductComponent } from './Pages/product/product.component';
import { SaleHistoryComponent } from './Pages/sale-history/sale-history.component';
import { ReportComponent } from './Pages/report/report.component';
import { SaleComponent } from './Pages/sale/sale.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent, //the parent component
  children: [
    { path: 'dashboard', component: DashboardComponent }, //url name and then the component
    { path: 'users', component: UserComponent },
    { path: 'products', component: ProductComponent },
    { path: 'sales', component: SaleComponent },
    { path: 'sales_history', component: SaleHistoryComponent },
    { path: 'reports', component: ReportComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
