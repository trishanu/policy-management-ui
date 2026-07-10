import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  username = '';
  password = '';

  errorMessage='';

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  login(){

    this.authService.login(this.username,this.password)
      .subscribe({

        next:()=>{

          this.router.navigate(['/dashboard']);

        },

        error:()=>{

          this.errorMessage="Invalid Username or Password";

        }

      });

  }

}