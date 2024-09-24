import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated:boolean=false;
  roles:any;
  username:any;
  accessToken!:any;
  constructor(private http:HttpClient,private router:Router) { }
  public login(username:string,password:string){
    let options={
      headers:new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    let params=new HttpParams().set("username",username)
      .set("password",password);
    return this.http.post("http://localhost:8080/auth/login",params,options)
  }

  loadProfile(data: any) {
    this.isAuthenticated=true;
    this.accessToken= data['access-token'];
    let decodeJwt:any=jwtDecode(this.accessToken);
    this.username=decodeJwt.sub;
    this.roles=decodeJwt.scope;
    window.localStorage.setItem("jwt-token",this.accessToken);

  }

  logout() {
    this.isAuthenticated=false;
    this.accessToken=undefined;
    this.roles=undefined;
    window.localStorage.removeItem("jwt-token");
    this.router.navigateByUrl("/login");
  }

  loadJwTokenFromLocalStorage() {
    let token=window.localStorage.getItem("jwt-token");
    if(token){
      this.loadProfile({"access-token":token});
      this.router.navigateByUrl("/anpr");
    }
  }
}
