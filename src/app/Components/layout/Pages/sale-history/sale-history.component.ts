import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';

//Importing resources for the tables
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

import { ModalSaledetailsComponent } from '../../Model/modal-saledetails/modal-saledetails.component';

import { Sale } from 'src/app/Interfaces/sale';
import { SaleService } from 'src/app/Services/sale.service';
import { UtilityService } from 'src/app/Reusable/utility.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-sale-history',
  templateUrl: './sale-history.component.html',
  styleUrls: ['./sale-history.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class SaleHistoryComponent implements OnInit, AfterViewInit {
  //properties
  formSearch!: FormGroup;

  //label options
  searchOptions: any[] = [
    { value: 'date', description: 'By date' },
    { value: 'number', description: 'Sale number' }
  ]

  columnsTable: string[] = ['registrationDate', 'documentNumber', 'paymentMethod', 'total', 'action'];

  initialDta: Sale[] = [];
  dataListSale = new MatTableDataSource(this.initialDta);
  @ViewChild(MatPaginator) tablePaginator!: MatPaginator;


  constructor(private fb: FormBuilder, private _dialog: MatDialog, private _saleService: SaleService, private _util: UtilityService) {
    this.formSearch = this.fb.group({
      searchBy: ['date'],
      number: [''],
      startingDate: [''],
      endDate: ['']
    });

    //everytime changes clear the values
    this.formSearch.get('searchBy')?.valueChanges.subscribe(value => {
      this.formSearch.patchValue({
        startingDate: '',
        number: '',
        endDate: ''
      })
    });
  }
  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    this.dataListSale.paginator = this.tablePaginator;
  }

  filterDataTable(event: Event) {
    const valueFilter = (event.target as HTMLInputElement).value;

    this.dataListSale.filter = valueFilter.trim().toLowerCase();
  }

  //method to search and get the result from API
  //If by date request the data by date
  //if by number request the data by number
  //searching by date range or sale number
  searchSale() {
    let startingDate: string = '';
    let endDate: string = '';

    if (this.formSearch.value.searchBy === 'date') {
      startingDate = moment(this.formSearch.value.startingDate).format('DD/MM/YYYY');
      endDate = moment(this.formSearch.value.endDate).format('DD/MM/YYYY');
      
      if (startingDate === 'invalid date' || endDate === 'invalid date') {
        this._util.showAlert('Please enter start date and end date', 'Error');
        return;
      }
    }

    //API Calling
    this._saleService.History(this.formSearch.value.searchBy, this.formSearch.value.number, startingDate, endDate).subscribe({
      next: (data)=> {if(data.status)this.dataListSale = data.value; else this._util.showAlert('Please enter a value to search','Error')},

      error: () => this._util.showAlert('Unexpected error occured', 'Error')
    });
  }

  showSaledetail(_sale: Sale){
    this._dialog.open(ModalSaledetailsComponent,{
      data: _sale,
      disableClose: true,
      width: '700px'
    });
  }
}
