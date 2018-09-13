import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductEditComponent } from './product-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
  canDeactivate(
    component:ProductEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if(component.productsForm.dirty){
      return confirm(`Navigate away and lose all changes to prodcut?`);
    }
    return true;
  }
}
