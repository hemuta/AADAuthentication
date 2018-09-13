import { Component, OnInit } from '@angular/core';
import { AdalService } from 'adal-angular4';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private adalService:AdalService,private router: Router) { }

  ngOnInit() {
    this.adalService.handleWindowCallback();
    if(this.adalService.userInfo.authenticated){
      this.router.navigateByUrl("/home");
    }
  }

  public login(){
    this.adalService.login();
  }

  public logout(){
    this.adalService.logOut();
  }

  get authenticated():boolean{
    return this.adalService.userInfo.authenticated;
  }
}
