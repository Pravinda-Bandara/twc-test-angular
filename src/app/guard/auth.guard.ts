import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const value = localStorage.getItem('userInfo');
  if (value) {
    return true;
  } else {
    const routerService = inject(Router);
    return routerService.createUrlTree(['/login']);
  }
};
