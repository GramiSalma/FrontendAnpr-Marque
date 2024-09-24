import { Component, OnInit } from '@angular/core';  // Ajout de OnInit
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {   // Implémentation de OnInit
  formLogin!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  // Utilisation de ngOnInit pour initialiser formLogin
  ngOnInit() {
    this.formLogin = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("")
    });
  }

  handleLogin() {
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.authService.loadProfile(data);
        this.router.navigateByUrl("/anpr");
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
