import { Component, OnInit } from '@angular/core';
import { AdalService } from 'adal-angular4';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{Response} from '../Models/ResponseModel';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {AlertService} from '../Services/alert.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profile:any;
  user:any;
  token:string;
  IsShowProfile:boolean;
  IsShowDrop:boolean;
  NationalityData:any;
  jsonData:any;
  constructor(private adalService:AdalService,private router:Router,private http:HttpClient,
    private alertService:AlertService) { }

  public httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Cache-Control': 'no-cache'
    });

  ngOnInit() {
    if(!this.adalService.userInfo.authenticated){
      this.router.navigateByUrl('');
    } 
    console.log(this.adalService.userInfo);
    this.jsonData=this.adalService.userInfo;
    this.IsShowProfile=false;    
    this.ShowMyProfile();
  }

  public logout(){
    this.adalService.logOut();
  }

  public getToken(){
    return "Bearer "+ this.adalService.userInfo.token;
  }

  public options={headers:{"Authorization":this.getToken()}};

  public getMyProfile(){    
    return this.http.get(environment.apiUrl+"GetUserProfile",this.options)
    .pipe(
      map(x => {
       const response = new Response();
       response.Create(x['success'], x['message'], x['result']);
       return response;
    }));
  }

  public ShowMyProfile(){
    if(!this.adalService.userInfo.authenticated || !this.adalService.userInfo.loginCached){
      this.router.navigateByUrl('');
    }
    else{
      this.getMyProfile().subscribe((data)=>{
        if(data.Success){
          this.IsShowProfile=true;
          this.profile=data.Result;
        }
        else{
          this.alertService.error(data.Message);
        }
      },error=>{
        this.alertService.error(error);
      });
    }
  }

  private GetNationalityData(){
    return this.http.get(environment.apiUrl+"GetNationality",this.options)
    .pipe(
      map(x => {
       const response = new Response();
       response.Create(x['success'], x['message'], x['result']);
       return response;
    }));
  }

  public GetNationality(){
    this.GetNationalityData().subscribe((data)=>{
      if(data.Success){
        this.IsShowDrop=true;
        this.NationalityData=data.Result;
      }
      else{
        this.alertService.error(data.Message);
      }
    },error=>{
      this.alertService.error(error);
    });
  }
}
