import { Component, OnInit } from '@angular/core';
//
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router'; //This router will allow us to redirect the user to other pages
import { Login } from 'src/app/Interfaces/login'; //importing the defined login schema
import { UserService } from 'src/app/Services/user.service'; // HTTP CRUD requests
import { UtilityService } from 'src/app/Reusable/utility.service';
import { UsertwoService } from 'src/app/Services/usertwo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: any;
  hidePassword: boolean = true;
  showLoading: boolean = false;

  //injecting dependencies
  constructor(fb: FormBuilder, private router: Router, private _userService: UsertwoService, private _utility: UtilityService) {

    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  get fc() {
    return this.loginForm.controls;//retorning all the instances = properties
  }

  ngOnInit(): void { }

  Login() {

    this.showLoading = true;

    const request: Login = { email: this.loginForm.value.email, password: this.loginForm.value.password }

    this._userService.Login(request).subscribe({
      next: (data) => {
        if (data.status) {
          this._utility.saveUserSession(data.value.token);  //if status is true store it in the local storage
          this.router.navigate(["pages"]);
        }
        else {
          this._utility.showAlert(data.message, 'Opps!');
        }
      },

      complete: () => this.showLoading = false,

      error: () => { this._utility.showAlert('An error occurred', 'Opps!'); }
    });
  }
}
