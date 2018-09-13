import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

function starRating(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
          return { 'starRange': true };
      }
      return null;
  };
}
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  [x: string]: any;
  productsForm:FormGroup;
  private sub:Subscription;
  constructor(private router:Router,private route:ActivatedRoute,private productService:ProductService,
    private fb:FormBuilder
    ) { 
     
      
    }
  products:Product;
  ngOnInit() {
    this.productsForm=this.fb.group({
      productName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      productCode:['',Validators.required],
      description:['',Validators.required],
      starRating:['',[Validators.required,starRating(0,5)]]
    });
    this.sub=this.route.params.subscribe(
      params=>{
        const id=+params['id'];
        this.getProduct(id);
      }
    );


  }
  getProduct(id:number):void{
    this.productService.getProductById(id).subscribe(
      (product:Product)=>this.displayProduct(product)
    );
  }
  displayProduct(product:Product):void{
    if(this.productsForm){
      this.productsForm.reset();
    }
    this.products=product
    this.productsForm.patchValue({
      productName:this.products.productName,
      productCode:this.products.productCode,
      description:this.products.description,
      starRating:this.products.starRating

    });
  }
  cancel(){
    return this.router.navigate(['/products']);
  }

  saveProduct(): void {
    
        // Copy over all of the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const p = { ...this.products, ...this.productsForm.value };
        const id=+this.route.snapshot.params['id']
        if (id === 0) {
          this.productService.createProduct(p)
            .subscribe(
              () => this.saveOnComplete(),
                         );
        } 
        else {
          this.productService.updateProduct(p)
            .subscribe(
              () => this.saveOnComplete(),
              
            );
        }
      }
       
    
  
saveOnComplete(){
  this.productsForm.reset();
  this.router.navigate(['/products']);
}
  

}
