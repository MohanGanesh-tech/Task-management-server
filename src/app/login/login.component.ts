import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})

export class LoginComponent implements OnInit {
  user: any;
  username!: string;
  password!: string;
  usermsg!: string;

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('accesstoken')
  }

  userLogin() {
    const newUser = {
      username: this.username,
      password: this.password
    }
    this.authservice.userLogin(newUser)
      .subscribe((data) => {
        this.user = data;
        window.localStorage.setItem('accesstoken', this.user.accessToken);
        window.localStorage.setItem('refreshtoken', this.user.refreshToken);
        console.log("userLogin() accesstoken: " + (localStorage.getItem('accesstoken')));
        console.log("userLogin() refreshtoken: " + (localStorage.getItem('refreshToken')));
        if (this.user.statuscode == 200) {
          this.router.navigateByUrl('/taskpage');
        }
        else {
          console.log("Incorrect createndial")
            this.usermsg = this.user.msg
        }
      })
  }

}
