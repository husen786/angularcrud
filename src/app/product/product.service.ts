import {Injectable} from '@angular/core';
import { Product } from './product';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn:'root'
})
export class ProductService{
  
   constructor(private http:HttpClient){

   }
   url='api/products';
   getAllProducts():Observable<Product[]>{
       return this.http.get<Product[]>(this.url)
       .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );;
   }
   getProductById(id:number):Observable<Product>{
      const url=`api/products/${id}`
      return this.http.get<Product>(url).
      pipe(
          tap(data=>console.log(JSON.stringify(data))),
          catchError(this.handleError)
      );
   }
   createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    product.id = null;
    return this.http.post<Product>(this.url, product, { headers: headers })
    .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        
      );
      
  }
   updateProduct(product:Product):Observable<Product>{
       const headers=new HttpHeaders({'Content-Type':'application/json'});
       const url=`api/products/${product.id}`;
       return this.http.put<Product>(url,product,{headers:headers})
   }

   deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.url}/${id}`;
    return this.http.delete<Product>(url, { headers: headers })
      
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}