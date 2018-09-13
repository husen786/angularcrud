import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  _filterBy:string='';
  filteredProducts:Product[]=[];
  errorMessage=''
  get filterBy():string{
    return this._filterBy
  }
  set filterBy(value:string){
        this._filterBy=value;
        this.filteredProducts=this.filterBy?this.performFilter(this.filterBy):this.products
  }
  constructor(private productService:ProductService,private router:Router) { }
  products:Product[];
  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      products=>{
        this.products=products,
        this.filteredProducts=products
      },
      error => this.errorMessage = <any>error
    );
  }
  performFilter(listFilter:string):Product[]{
    listFilter=listFilter.toLocaleLowerCase();
    return this.products.filter(
      (product:Product)=>product.productName.toLocaleLowerCase().indexOf(listFilter)!==-1
    )

  }

  deleteProduct(id:number){
    this.productService.deleteProduct(id)
    .subscribe(
      () => this.onSaveComplete()
      
    );
    
  }
  onSaveComplete(){
    
    return this.router.navigate(['/products']);
  }

}
