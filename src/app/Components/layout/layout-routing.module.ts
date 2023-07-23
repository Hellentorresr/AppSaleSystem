import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { UserComponent } from './Pages/user/user.component';
import { ProductComponent } from './Pages/product/product.component';
import { SaleHistoryComponent } from './Pages/sale-history/sale-history.component';
import { ReportComponent } from './Pages/report/report.component';
import { SaleComponent } from './Pages/sale/sale.component';
import { rolGuard } from 'src/app/rol.guard';

const routes: Routes = [{
  path: '',
  component: LayoutComponent, //the parent component
  children: [
    { path: 'dashboard', component: DashboardComponent, data: { expectedRole: 'Admin' } }, //url name and then the component
    { path: 'users', component: UserComponent, canActivate: [rolGuard], data: { expectedRole: 'Admin' } },
    { path: 'products', component: ProductComponent, canActivate: [rolGuard], data: { expectedRole: ['Admin', 'Supervisor'] } },
    { path: 'sales', component: SaleComponent, canActivate: [rolGuard], data: { expectedRole: ['Admin', 'Supervisor', 'Employee'] } },
    { path: 'sales_history', component: SaleHistoryComponent, canActivate: [rolGuard], data: { expectedRole: ['Admin', 'Supervisor', 'Employee'] } },
    { path: 'reports', component: ReportComponent, canActivate: [rolGuard], data: { expectedRole: ['Admin', 'Supervisor'] } },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
