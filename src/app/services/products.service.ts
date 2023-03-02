import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';
import { map, retry, switchMap } from 'rxjs/operators';
import { checkTime } from '../intercerptors/time.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private api = 'https://young-sands-07814.herokuapp.com/api/products';
  constructor(private http: HttpClient) {}

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.api, { params}) /* .pipe(retry(3)) */;
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  getProductByPage(limit: number, offset: number) {
    return this.http
      .get<Product[]>(`${this.api}/`, {
        params: { limit, offset }, context: checkTime() 
      })
      .pipe(
        map((products) =>
          products.map((item) => {
            return { ...item, taxes: this.calculateTaxe(item.price, 0.19),taxes2:this.calculateTaxe2(item.price,.10) };
          })
        )
      );
  }

  calculateTaxe(price: number, impuesto: number) {
    return price * impuesto;
  }

  calculateTaxe2(price: number, impuesto: number) {
    return price * impuesto;
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(`${this.api}`, dto);
  }

  update(id: number, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.api}/${id}`, dto);
  }

  delete(id: number) {
    return this.http.delete<boolean>(`${this.api}/${id}`);
  }

  readAndUpdate(){
    return this.getProduct(3)
    .pipe(switchMap((product:any)=>this.update(product.id,{title:(product.price).toString()})),)
    
  }

}
