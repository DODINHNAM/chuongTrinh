import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Category } from 'src/app/entity/Category.model';
import { Product } from 'src/app/entity/Product.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';
import { Router } from '@angular/router';
import { Review } from 'src/app/entity/Review.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  validateForm!: FormGroup;
  productId: string;
  listOfCategory: Category[] = [];
  listOfData: Product[] = [];
  controlArray: Map<string, any> = new Map<string, any>();
  listOfData1: Product[] = [];
  controlArray1: Map<string, any> = new Map<string, any>();
  controlArray2: Map<string, any> = new Map<string, any>();
  listOfData2: Review[] = [];
  listOfData4: Product[] = [];
  controlArray4: Map<string, any> = new Map<string, any>();
  product = new Product();
  review = new Review();
  pageSize = 5;
  pageIndex = 1;
  totalPrice:number = 0;
  totalReview: number = 0;
  cart: Product[] = [];
  constructor(
    route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private reviewService: ReviewService,
    private brandService: BrandService,
    private modal: NzModalService,
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private notification: NzNotificationService
  ) {
    route.params.subscribe((val) => {
      this.productId = this.activatedRoute.snapshot.params.id;
    });
  }

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      reviewStar: [0, [Validators.required]],
      reviewMessage: [null, [Validators.required]],
    });
    // declare cart 
    const cart = localStorage.getItem('cart') || '';
    if (cart) {
      this.cart = JSON.parse(cart);
    }

    this.controlArray2.set('pageIndex', this.pageIndex);
    this.controlArray2.set('pageSize', this.pageSize);
    this.controlArray2.set('sortField', 'reviewID');
    this.controlArray2.set('sortOrder', 'ascend');
    this.controlArray2.set('productId', this.productId);
    this.controlArray2.set('status', 1);

    this.getCategories();
    this.getProducts(1, 4, 'productQuantily', 'ascend');
    this.getProductsSold(1, 4, 'productQuantitySold', 'descend');
    this.getReviews(this.controlArray2)
    this.getDetailProduct(this.productId);
  }
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
  getCategories() {
    this.categoryService.getAllCategory().subscribe(
      (data) => {
        if (data && data.results) {
          this.listOfCategory = data.results;
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

  getProductsSold(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null
  ) {
    this.controlArray4.set('pageIndex', pageIndex);
    this.controlArray4.set('pageSize', pageSize);
    this.controlArray4.set('sortField', sortField);
    this.controlArray4.set('sortOrder', sortOrder);
    // get product
    this.productService.getProducts(this.controlArray4).subscribe(
      (data) => {
        if (data && data.results) {
          this.listOfData4 = data.results;
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

  getReviews(param: any) {
    this.reviewService.getReviews(this.controlArray2).subscribe(
      (data) => {
        if (data && data.results) {
          this.listOfData2 = data.results;
          this.totalReview = data.rowCount;
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

  getDetailProduct(id) {
    this.productService.getProduct(id).subscribe(
      (data) => {
        if (data && data.result) {
          this.product = data.result;
        }
      },
      (error) => {
        this.createNotification(
          'error',
          'Có lỗi xảy ra!',
          'Vui lòng liên hệ quản trị viên.'
        );
      },
      ()=>{
        this.getProductsByCategory(1,6,'productID', 'descend',this.product.category.categoryID);
      }
    );
  }



  submitForm(review :Review){
    const userAuth = localStorage.getItem('auth') || '';
    const userName = localStorage.getItem('username') || '';
    const userId = localStorage.getItem('userId') || '';
    if (userAuth) {
      review.product = this.product;
      review.reviewName = userName;
      review.userId = userId;
      this.reviewService.saveReview(review).subscribe(
        
        (data) => {
          if (data && data.result) {
            window.location.href = `/product-detail/`+this.productId;
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
      
    } else {
      this.modal.confirm({
        nzTitle: 'Bạn cần đăng nhập để đánh giá!',
        nzContent: '',
        nzOkText: 'Đăng nhập',
        nzOkType: 'primary',
        nzOkDanger: false,
        nzOnOk: () => {
          window.location.href = `/login/1/`+this.productId;
        },
        nzCancelText: 'Ở lại',
        nzOnCancel: () => console.log('Cancel'),
      });
    }
  }

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

  onPageIndexChange(value: number): void {
    this.controlArray.set('pageIndex', value);
    this.getReviews(this.controlArray);
  }
  onPageSizeChange(value: number): void {
    this.controlArray.set('pageSize', value);
    this.getReviews(this.controlArray);
  }
}
