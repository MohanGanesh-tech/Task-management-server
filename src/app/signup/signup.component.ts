import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService]
})
export class SignupComponent implements OnInit {
  user: any;
  username!: string;
  phone!: string;
  email!: string;
  password!: string;
  usermsg!: string;

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    localStorage.removeItem('accesstoken')
  }

  userSignup() {
    const newUser = {
      username: this.username,
      phone: this.phone,
      email: this.email,
      password: this.password
    }
    this.authservice.userSignup(newUser)
      .subscribe((data) => {
        this.user = data;
        console.log(this.user);
        this.usermsg = this.user.msg
      })
  }

}
