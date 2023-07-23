
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';//to receive data through this Modal

import { UtilityService } from 'src/app/Reusable/utility.service';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Interfaces/product';

import { ProductCategoryService } from 'src/app/Services/product-category.service';
import { ProductCategory } from 'src/app/Interfaces/product-category';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent implements OnInit {
  productForm: any;
  actionName: string = 'Create'; // as befault is create but also will be update
  actionButton: string = 'Save'; // could also be defined as Edit
  categoryList: ProductCategory[] = []; //to list the categories in a select to assign it to a product

  constructor(private actualModal: MatDialogRef<ModalProductComponent>,
    @Inject(MAT_DIALOG_DATA) public producData: Product, fb: FormBuilder,
    private _productService: ProductService, private _categoryService: ProductCategoryService, private _utilityService: UtilityService) {

    this.productForm = fb.group({
      name: ['', Validators.required],
      idCategory: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required],
      active: ['', Validators.required]
    });

    if (this.producData) { this.actionName = 'Edit', this.actionButton = 'Update' }; //if userData has values
  }

  /*The ngOnInit() method is a lifecycle hook that is called after the component has been initialized
   and its dependencies have been resolved. It is commonly used for initialization tasks or to fetch data from APIs.*/
  ngOnInit(): void {
    //getting the category list to show it in the select
    this._categoryService.List().subscribe({
      next: (data) => { if (data.status) this.categoryList = data.value },//if status == true
      error: (error) => console.error('Error fetching categories:', error)
    });

    //if the this.producData var has data, means that the modal it show Edit,
    if (this.producData) {
      this.productForm.patchValue({ //  method from FormGroup class. It is used to update the values of the form controls within a form group.
        name: this.producData.name,
        idCategory: this.producData.idCategory,
        stock: this.producData.stock,
        price: this.producData.price,
        active: this.producData.active.toString()
      });
    }
  }

  //method to update or create a product
  createUpdate_product() {
    const _product: Product = {
      idProduct: this.producData == null ? 0 : this.producData.idProduct,
      name: this.productForm.value.name,
      idCategory: this.productForm.value.idCategory,
      categoryDescription: '',
      stock: this.productForm.value.stock,
      price: this.productForm.value.price,
      active: parseInt(this.productForm.value.active)
    };

    if (this.producData) {//update , if this var is not null

      //API calling
      this._productService.Update(_product).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilityService.showAlert('The product has being updated successfully', 'Great!');
            this.actualModal.close('true');
          }
          else { this._utilityService.showAlert('The product was not updated', 'Error') }
        },

        error: () => this._utilityService.showAlert('Unexpected error occurred, please try again', 'Error')
      })


    } else {
      // create
      this._productService.Create(_product).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilityService.showAlert('The product has being created successfully', 'Great!');
            this.actualModal.close('true');

          }
          else { this._utilityService.showAlert('The product was not created', 'Error') }
        },

        error: () => this._utilityService.showAlert('Unexpected error occurred, please try again', 'Error')
      });
    }
  }

}
