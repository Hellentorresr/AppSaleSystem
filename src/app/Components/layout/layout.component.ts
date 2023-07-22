import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/Interfaces/menu';

import { MenuService } from 'src/app/Services/menu.service';
import { UtilityService } from 'src/app/Reusable/utility.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  menuList: Menu[] = [];
  userEmail: string = '';
  userRol: string = '';
  userName:string='';
  constructor(private router: Router, private _menuService: MenuService, private _util: UtilityService) {

  }


  ngOnInit(): void {
    const user = this._util.getUserSession();
    if (user) {
      this.userEmail = user.email;
      this.userRol = user.rolDescription;
      this.userName = user.fullName;
      // this.token // i have to store the token in the localStorage

      this._menuService.List(user.idUser).subscribe({
        next: (data) => {
          if (data.status) {
            this.menuList = data.value;
           // console.log(this.menuList);
          }
        },

        error: (error) => console.log(`Error fetching user's menus`, error)
      })
    }
  }

  //function to log out user
  logOutUser() {
    this._util.deleteSession();
    this.router.navigate(['login'])
  }
}
