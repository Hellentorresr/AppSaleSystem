import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';

//Importing resources for the tables
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
//To export to excel
import * as XLSX from 'xlsx';

import { Sale } from 'src/app/Interfaces/sale';
import { SaleService } from 'src/app/Services/sale.service';
import { UtilityService } from 'src/app/Reusable/utility.service';
import { Report } from 'src/app/Interfaces/report';

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
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class ReportComponent implements OnInit {
  //Properties
  formFilter!: FormGroup;
  saleListReport: Report[] = [];
  columnsTable: string[] = ['registrationDate', 'documentNumber', 'paymentMethod', 'total', 'product', 'amount', 'cost', 'totalProduct'];
  dataSaleReport = new MatTableDataSource(this.saleListReport);
  @ViewChild(MatPaginator) tablePaginator!: MatPaginator;

  constructor(private fb: FormBuilder, private _saleService: SaleService, private _util: UtilityService) {
    this.formFilter = this.fb.group({
      startingDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSaleReport.paginator = this.tablePaginator;
  }

  searchSales() {
    let startingDate: string = '';
    let endDate: string = '';

    startingDate = moment(this.formFilter.value.startingDate).format('DD/MM/YYYY');
    endDate = moment(this.formFilter.value.endDate).format('DD/MM/YYYY');

    if (startingDate === 'invalid date' || endDate === 'invalid date') {
      this._util.showAlert('Please enter start date and end date', 'Error');
      return;
    }

    //api calling
    this._saleService.Report(startingDate, endDate).subscribe({
      next: (data) => {
        if (data.status) { this.saleListReport = data.value; this.dataSaleReport = data.value }
        else { this.saleListReport = []; this._util.showAlert('No data found', 'Error') }
      },
      error: () => this._util.showAlert('Unexpected error occured', 'Error')
    });
  }

  exportExcel() {
    const wb = XLSX.utils.book_new();

    //saving data
    const ws = XLSX.utils.json_to_sheet(this.saleListReport);

    //passing the book, then the sheet and then the sheet's name
    XLSX.utils.book_append_sheet(wb, ws, 'Report');

    //how to dowload the excel file
    XLSX.writeFile(wb, 'SaleReport.xlsx');
  }

}
