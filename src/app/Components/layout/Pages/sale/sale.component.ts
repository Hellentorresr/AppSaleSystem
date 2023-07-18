
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
//Importing resources for the tables
import { MatTableDataSource } from '@angular/material/table';

import { Sale } from 'src/app/Interfaces/sale';
import { SaleService } from 'src/app/Services/sale.service';

import { Product } from 'src/app/Interfaces/product';
import { ProductService } from 'src/app/Services/product.service';
import { SaleDetail } from 'src/app/Interfaces/sale-detail';

import { UtilityService } from 'src/app/Reusable/utility.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  //properties
  productList: Product[] = [];
  productListFilter: Product[] = []; //to work with autocomplete
  productListToSale: SaleDetail[] = []; //list of products of a sale
  blockRegisterButton: boolean = false;
  selectedProduct!: Product; //from the autocomplete option and then gets redirect to productListToSale
  defaultPaymentMethod: string = 'cash'; // or credit card
  totalPaymentAmount: number = 0; //this var gets updated from 'productListToSale' if the user adds or deletes a product from the productListToSale

  productSaleForm: FormGroup;

  columnsTable: string[] = ['product', 'amount', 'price', 'total', 'action'];
  saleDetail = new MatTableDataSource(this.productListToSale);


  constructor(fb: FormBuilder, private _productService: ProductService, private _saleService: SaleService, private _utils: UtilityService) {


    this.productSaleForm = fb.group({
      product: ['', Validators.required],
      amount: ['', Validators.required],
    });


  }

  ngOnInit(): void {
    //getting products list to show it in the select
    this._productService.List().subscribe({
      next: (data) => {
        if (data.status) { //if status == true
          const list = data.value as Product[];
          this.productList = list.filter(p => p.active == 1 && p.stock > 0); //adding to this list only the products that are active and its stock greater than 0
        }
      },
      error: (error) => console.log('Error fetching products:', error)
    });

    //event that detects characters example: la for laptop, using the formControlName product
    this.productSaleForm.get('product')?.valueChanges.subscribe(value => {
      this.productListFilter = this.returnProductsByFilter(value);
    });
  }

  returnProductsByFilter(search: any): Product[] {
    //first search will be a string and then as we perform more searches this search var becomes an object
    const filteredValue = typeof search === 'string' ? search.toLowerCase() : search.name.toLowerCase();

    //returning the products' names that are being search
    return this.productList.filter(item => item.name.toLowerCase().includes(filteredValue));
  };

  //event tha shows the filter result
  showProducts(product: Product): string {
    return product.name;
  };

  //to temporarily store the selected product from the list
  productToSale(event: any) {
    this.selectedProduct = event.option.value;
  };

  //method to store the selected product in the table to complete the sale
  addProductToSale() {
    const _amount: number = this.productSaleForm.value.amount;
    const _price: number = parseFloat(this.selectedProduct.price);
    const _total: number = _amount * _price;

    const sale = {
      idProduct: this.selectedProduct.idProduct,
      productDescription: this.selectedProduct.name,
      amount: _amount,
      priceText: String(_price.toFixed(2)),
      totalText: String(_total.toFixed(2))
    };

    if (this.productListToSale.find(e => e.idProduct == sale.idProduct)) {
      this._utils.showAlert('The product already exists in the list', 'Error');

    } else {
      //updating this property
      this.totalPaymentAmount += _total;
      this.productListToSale.push(sale);
      //updating the table
      this.saleDetail = new MatTableDataSource(this.productListToSale);

      //resetting the form
      this.productSaleForm.patchValue({
        product: '',
        amount: ''
      });
    }
  }

  //to delete a product from the productlistTosale
  deleteProduct(saleDetail: SaleDetail) {
    this.totalPaymentAmount -= parseFloat(saleDetail.totalText);
    this.productListToSale = this.productListToSale.filter(p => p.idProduct != saleDetail.idProduct);//saving all the product that are not equal to saleDetail.idproduct

    //updating the table
    this.saleDetail = new MatTableDataSource(this.productListToSale);
  }

  //to generate the sale
  generateSale() {
    if (this.productListToSale.length > 0) {
      this.blockRegisterButton = true;
      const request: Sale = {
        paymentMethod: this.defaultPaymentMethod,
        totalText: String(this.totalPaymentAmount.toFixed(2)),
        saleDetails: this.productListToSale
      };

      //API calling
      this._saleService.Create(request).subscribe({
        next: (resp) => {
          if (resp.status) {
            //resetting the values
            this.totalPaymentAmount = 0.00;
            this.productListToSale = [];
            this.saleDetail = new MatTableDataSource(this.productListToSale);

            Swal.fire({
              icon: 'success',
              title: 'The sale has been registered successfully',
              text: `Number sale ${resp.value.documentNumber}`
            });

          } else {
            this._utils.showAlert('The sale could not be registered', 'Error');
          }
        },
        complete: () => this.blockRegisterButton = false,  //

        error: () => this._utils.showAlert('Unexpected error occurred', 'Error')
      });
    }
  }

}
