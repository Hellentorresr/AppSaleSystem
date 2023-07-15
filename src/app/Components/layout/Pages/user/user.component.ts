/*ngAfterViewInit() is a lifecycle hook that is called after the component's view and child views have been initialized.*/
//ViewChild is a decorator that allows you to access a child component, directive, or DOM element from within a parent component.

import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';

//Importing resources for the tables
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalUserComponent } from '../../Model/modal-user/modal-user.component';
import { User } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/Services/user.service';
import { UtilityService } from 'src/app/Reusable/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {
  //properties
  columnsTable: string[] = ['fullName', 'email', 'rolDescription', 'status', 'accions'];
  initialData: User[] = [];
  userListData = new MatTableDataSource(this.initialData);

  @ViewChild(MatPaginator) tablePagination!: MatPaginator;

  constructor(private dialog: MatDialog, private _userService: UserService, private _util: UtilityService) { }


  getUser() {
    this._userService.List().subscribe({
      next: (data) => {
        if (data.status) this.userListData.data = data.value //if data is true
        else this._util.showAlert('No data found', 'Error!');
      },

      error: (error: any) => console.error('Error fetching users:', error)
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  ngAfterViewInit(): void {
    this.userListData.paginator = this.tablePagination;
  }

  filterDataTable(event: Event) {
    const valueFilter = (event.target as HTMLInputElement).value;

    this.userListData.filter = valueFilter.trim().toLowerCase();
  }

  //to open modal
  newUser() {
    this.dialog.open(ModalUserComponent, {
      disableClose: true  //Whether the user can use escape or clicking on the backdrop to close the modal.

    }).afterClosed().subscribe(result => { if (result === 'true') this.getUser() }); //update list
  }

  updateUser(user: User) {
    this.dialog.open(ModalUserComponent, {
      disableClose: true,  //Whether the user can use escape or clicking on the backdrop to close the modal.
      data: user

    }).afterClosed().subscribe(result => { if (result === 'true') this.getUser() }); //update list
  }

  deleteUser(user: User) {
    Swal.fire({
      title: 'Are you sure you want to proceed to delete de user?',
      text: user.fullName,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, save changes',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Close'

    }).then(result => {
      if (result.isConfirmed) {
        this._userService.Delete(user.idUser).subscribe({
          next: (data) => {
            if (data.status) { this._util.showAlert('The user has been deleted successfully', 'Ok!'); this.getUser(); }
            else { this._util.showAlert('The user was not deleted', 'Error'); }
          },
          error: () => this._util.showAlert('An unexpected error occurred', 'Error')

        });
      }

    });
  }
}
