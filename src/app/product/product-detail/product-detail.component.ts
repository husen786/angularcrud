import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private router:Router,private productService:ProductService,private route:ActivatedRoute) { }
  
  products:Product;
  ngOnInit() {
    const id=+this.route.snapshot.params['id'];
    this.productService.getProductById(id).subscribe(
      (products:Product)=>this.products=products

    )
  }
  cancel(){
    return this.router.navigate(['/productlist'])
  }

}
