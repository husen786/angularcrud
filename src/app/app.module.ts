import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductData } from './product/product.data';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { SharedModule } from './shared/shared.module';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProducPipePipe } from './product/produc-pipe.pipe';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductEditGuard } from './product/product-edit/product-edit.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProducPipePipe,
    ProductEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(ProductData),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
     {path:'products',component:ProductListComponent},
     {path:'products/:id',component:ProductDetailComponent},
     {path:'',redirectTo:'products',pathMatch:'full'},
     {path:'products/:id/edit',canDeactivate:[ProductEditGuard],component:ProductEditComponent}
    ]),
    SharedModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
