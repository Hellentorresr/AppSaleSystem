import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UtilityService } from './Reusable/utility.service';
import { LayoutRoutingModule } from './Components/layout/layout-routing.module';
import { Session } from './Interfaces/session';

export const rolGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const router = inject(Router);
  const util = inject(UtilityService);

  const expectedRol = route.data['expectedRole'];
  const token: any = localStorage.getItem('token');
 
 const { rolDescription } = util.extractTokenInformation(token);

  if (!util.isAuth() || !expectedRol.includes(rolDescription)){
    util.showAlert('You do not have permissions for this resource','Error');
    router.navigate(['pages']);
    return false;
  }
  return true;
};
