import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallerService } from '../api-caller.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  //loginForm: FormGroup;

  login;
  password;
  phone;

  validation_messages = {
    'login': [
      { type: 'required', message: 'Необходимо ввести почту.' },
      { type: 'pattern', message: 'Введите правильную почту.' }
    ],
    'password': [
      { type: 'required', message: 'Необходимо ввести пароль.' },
      { type: 'minlength', message: 'Пароль не может быть короче 5 символов.' }
      // { type: 'pattern', message: 'Пароль должен содержать как минимум 1 заглавную букву, 1 строчную букву и 1 число.' }
    ],
  }

  error_code: number = 0;
  error_message: string = "";

  constructor(private api: ApiCallerService, public router: Router) {

    // this.loginForm = this.formBuilder.group({
    //   login: new FormControl('', Validators.compose([
    //     Validators.required,
    //     //Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
    //   ])),
    //   password: new FormControl('', Validators.compose([
    //     Validators.minLength(5),
    //     Validators.required,
    //     // Only Latin alphabet and numbers
    //     //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
    //   ]))
    // });
  }

  ngOnInit(): void { }

  onSubmit(login: any, password: any){
    var data = {
      "login":login,
      "password":password
    }
    var response = this.api.sendPostRequest(data, "/common/login")
    response.subscribe(data => {
      sessionStorage.setItem('token', JSON.stringify(data['payload']));
      console.log(data['payload']);
      this.router.navigateByUrl('/dashboard');
    }, error => {
      // Add if login and password is incorrect.
      this.api.errorHandler(error.status);
    })
  }

  register(login: any, password: any, phone: any){
    var data = {
      "login":login,
      "password":password,
      "phone":phone
    }
    var response = this.api.sendPostRequest(data, "/common/registration")
    response.subscribe(data => {
      sessionStorage.setItem('phone', phone);
      console.log(data['payload']);
      this.router.navigateByUrl('/verification');
    }, error => {
      // Add if login and password is incorrect.
      this.api.errorHandler(error.status);
    })
  }

}
