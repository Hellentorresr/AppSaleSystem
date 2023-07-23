import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UtilityService } from './Reusable/utility.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const util = inject(UtilityService);

  if (util.isAuth()) {
    return true;
  } else {
    util.showAlert('Unanthorired','Error')
    router.navigate(['login']);
    return false;
  }
};
