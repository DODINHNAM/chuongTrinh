import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Product } from 'src/app/entity/Product.model';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  listOfData: Product[] = [];
  listOfData1: Product[] = [];
  listOfData2: Product[] = [];
  data1: Product = new Product();
  data2: Product = new Product();
  data3: Product = new Product();
  data4: Product = new Product();
  data5: Product = new Product();
  data6: Product = new Product();
  pageSize = 9;
  pageIndex = 1;
  product:Product = null;
  controlArray: Map<string, any> = new Map<string, any>();
  controlArray1: Map<string, any> = new Map<string, any>();
  controlArray2: Map<string, any> = new Map<string, any>();
  totalPrice:number = 0;
  cart: Product[] = [];
  constructor(
    
    private categoryService: CategoryService,
    private brandService: BrandService,
    private productService: ProductService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
     // declare cart 
     const cart = localStorage.getItem('cart') || '';
     if (cart) {
       this.cart = JSON.parse(cart);
     }
     
     

    this.getProducts(this.pageIndex,this.pageSize,'productID','descend');
    this.getProductsPromotion(this.pageIndex,this.pageSize,'productPromotion','descend');
    this.getProductsByCategory(this.pageIndex,this.pageSize,'productID','descend', 1);
    
  }
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  getProducts(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null
  ) {
    this.controlArray.set('pageIndex', pageIndex);
    this.controlArray.set('pageSize', pageSize);
    this.controlArray.set('sortField', sortField);
    this.controlArray.set('sortOrder', sortOrder);
    // get product
    this.productService.getProducts(this.controlArray).subscribe(
      (data) => {
        if (data && data.results) {
          this.listOfData = data.results;
        }
      },
      (error) => {
        this.createNotification(
          'error',
          'Có lỗi xảy ra!',
          'Vui lòng liên hệ quản trị viên.'
        );
      }
    );
  }
  getProductsPromotion(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null
  ) {
    this.controlArray2.set('pageIndex', pageIndex);
    this.controlArray2.set('pageSize', pageSize);
    this.controlArray2.set('sortField', sortField);
    this.controlArray2.set('sortOrder', sortOrder);
    // get product
    this.productService.getProducts(this.controlArray2).subscribe(
      (data) => {
        if (data && data.results) {
          this.listOfData2 = data.results;
          this.product = this.listOfData2[0];
          
        }
      },
      (error) => {
        this.createNotification(
          'error',
          'Có lỗi xảy ra!',
          'Vui lòng liên hệ quản trị viên.'
        );
      }
    );
  }

  getProductsByCategory(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    category: number
  ) {
    this.controlArray1.set('pageIndex', pageIndex);
    this.controlArray1.set('pageSize', pageSize);
    this.controlArray1.set('sortField', sortField);
    this.controlArray1.set('sortOrder', sortOrder);
    this.controlArray1.set('categoryID', category);
    // get product
    this.productService.getProducts(this.controlArray1).subscribe(
      (data) => {
        if (data && data.results) {
          this.listOfData1 = data.results;
          this.data1 = this.listOfData1[0]
          this.data2 = this.listOfData1[1]
          this.data3 = this.listOfData1[2]
          this.data4 = this.listOfData1[3]
          this.data5 = this.listOfData1[4]
          this.data6 = this.listOfData1[5]
        }
      },
      (error) => {
        this.createNotification(
          'error',
          'Có lỗi xảy ra!',
          'Vui lòng liên hệ quản trị viên.'
        );
      }
    );
  }

  Dong_ho() {
    var ngay = document.getElementById("ngay");
    var gio = document.getElementById("gio");
    var phut = document.getElementById("phut");
    var giay = document.getElementById("giay");
    var ngay_hien_tai = new Date().getDate();
    var Gio_hien_tai = new Date().getHours();
    var Phut_hien_tai = new Date().getMinutes();
    var Giay_hien_tai = new Date().getSeconds();

    if((10- ngay_hien_tai) >= 0){
      ngay.innerHTML = (10- ngay_hien_tai).toString();
      gio.innerHTML = (24- Gio_hien_tai).toString();
      phut.innerHTML = (60-Phut_hien_tai).toString();
      giay.innerHTML = (60-Giay_hien_tai).toString();
      document.getElementById("btnKM").classList.add("d-flex");
      document.getElementById("btnKM").classList.remove("hiden");
    }else{
      ngay.innerHTML = "0";
      gio.innerHTML = "0";
      phut.innerHTML = "0";
      giay.innerHTML = "0";
      document.getElementById("btnKM").classList.add("hiden");
      document.getElementById("btnKM").classList.remove("d-flex");
    }
  }

 Dem_gio = setInterval(this.Dong_ho, 1000);

  addToCart(product:Product){
    let duplicate = false;
    this.cart.forEach((ele) => {
      if (ele.productID == product.productID ) {
        duplicate = true;
      }
    });
    // if no => add item
    if(!duplicate){
      product.quanlityBuy = 1;
      this.cart.push(product);
      this.updateCart();
      this.createNotification(
        'success',
        'Sản phẩm đã thêm vào giỏ hàng',
        ''
      );
    }else{
      this.createNotification(
        'info',
        'Sản phẩm đã có trong giỏ hàng',
        ''
      );
    }
  }

  updateCart() {
    this.totalPrice = 0;
    this.cart.forEach((ele) => {
      if(ele.productPromotion>0){
        this.totalPrice += ele.quanlityBuy * (ele.productPrice * (1-ele.productPromotion/100));
      }else{
        this.totalPrice += ele.quanlityBuy * ele.productPrice;
      }
    });
    localStorage.setItem('total', this.totalPrice.toString());
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }


 
}
