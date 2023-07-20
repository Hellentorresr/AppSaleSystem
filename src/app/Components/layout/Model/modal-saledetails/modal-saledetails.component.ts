//Inject. is used to receive information from another component

import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';//to receive data through this Modal

import { Sale } from 'src/app/Interfaces/sale';
import { SaleDetail } from 'src/app/Interfaces/sale-detail';

@Component({
  selector: 'app-modal-saledetails',
  templateUrl: './modal-saledetails.component.html',
  styleUrls: ['./modal-saledetails.component.css']
})
export class ModalSaledetailsComponent {
  //properties
  //properties to build a Sale data type
  registrationDate: string = '';
  documentNumber: string = '';
  paymentMethod: string = '';
  total: string = '';
  saleDetails: SaleDetail[] = [];

  //columns
  tableColumns: string[] = ['product', 'quantity', 'price', 'total'];

  constructor(@Inject(MAT_DIALOG_DATA) public _sale: Sale) {
    this.registrationDate = _sale.registrationDate!;
    this.documentNumber = _sale.documentNumber!;
    this.paymentMethod = _sale.paymentMethod;
    this.total = _sale.totalText;
    this.saleDetails = _sale.saleDetails
  }
}
