import { Component, OnInit } from '@angular/core';

import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { StoreService } from '../../services/store.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  today: Date = new Date('2020-01-01');
  showProductDetail: boolean = false;
  productChosen: Product = {
    id: 0,
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: '',
  };
  limit:number=10;
  offset:number=0;
  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.getProductByPage();
    /* this.productsService.getAllProducts().subscribe((data) => {
      this.products = data;
    }); */
  }

  getProductByPage() {
    this.productsService.getProductByPage(this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;

    });
  }

  onAddToShoppingCart(product: Product) {
    //this.myShoppingCart.push(product);
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: number) {
    this.productsService.getProduct(id).subscribe((response) => {
      this.toggleProductDetail();
      this.productChosen = response;
    });
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'hola',
      price: 1000,
      description: 'adf',
      images: ['https://placeimg.com/640/480/people?r=0.0011571761752027232'],
      categoryId: 2,
    };

    this.productsService.create(product).subscribe((response) => {
      this.products.unshift(response);
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'otro titulo',
    };
    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe((response) => {
      console.log(response);
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products[productIndex] = response;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe((response) => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadMore(){
    this.getProductByPage();
  }

  readAndUpdate(){
    this.productsService.readAndUpdate().subscribe(response=>{
      console.log(response)
    })
  }
}
