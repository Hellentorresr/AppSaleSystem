import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';

//Importing resources for the tables
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalProductComponent } from '../../Model/modal-product/modal-product.component';
import { Product } from 'src/app/Interfaces/product';
import { ProductService } from 'src/app/Services/product.service';
import { UtilityService } from 'src/app/Reusable/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {
  //Properties
  columnsTable: string[] = ['name', 'descCategory', 'stock', 'price', 'status', 'actions'];
  initialData: Product[] = [];
  productListData = new MatTableDataSource(this.initialData);
  @ViewChild(MatPaginator) tablePagination!: MatPaginator;

  constructor(private dialog: MatDialog, private _productService: ProductService, private _utils: UtilityService) {}

  getProducts() {
    this._productService.List().subscribe({
      next: (data) => {
        if (data.status) this.productListData.data = data.value //if data is true
        else this._utils.showAlert('No data found', 'Error!');
      },

      error: (error: any) => console.error('Error fetching products:', error)
    });
  }

  ngOnInit(): void { this.getProducts(); }

  ngAfterViewInit(): void {
    this.productListData.paginator = this.tablePagination;
  }

  filterDataTable(event: Event) {
    const valueFilter = (event.target as HTMLInputElement).value;

    this.productListData.filter = valueFilter.trim().toLowerCase();
  }

  //to open modal
  newProduct() {
    this.dialog.open(ModalProductComponent, {
      disableClose: true  //Whether the user can use escape or clicking on the backdrop to close the modal.

    }).afterClosed().subscribe(result => { if (result === 'true') this.getProducts() }); //update list
  }

  updateProduct(product: Product) {
    this.dialog.open(ModalProductComponent, {
      disableClose: true,  //Whether the user can use escape or clicking on the backdrop to close the modal.
      data: product

    }).afterClosed().subscribe(result => { if (result === 'true') this.getProducts() }); //update list
  }

  deleteProduct(product: Product) {
    Swal.fire({
      title: 'Are you sure you want to proceed to delete de product?',
      text: product.name,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, save changes',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Close'

    }).then(result => {
      if (result.isConfirmed) {
        this._productService.Delete(product.idProduct).subscribe({
          next: (data) => {
            if (data.status) { this._utils.showAlert('The product has been deleted successfully', 'Ok!'); this.getProducts(); }
            else { this._utils.showAlert('The product was not deleted', 'Error'); }
          },
          error: () => this._utils.showAlert('An unexpected error occurred', 'Error')

        });
      }
    });
  }

}
