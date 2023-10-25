import { Component, OnInit } from '@angular/core';
import { UserService, UserProfile } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = null;
  password: string = null;
  sourceRoute: string = '1';

  constructor(private _service: UserService, private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.sourceRoute = this.route.snapshot.paramMap.get('type');
  }

  ngOnInit() {
    // if user is set, populate it
    this.username = this.route.snapshot.params['user'];
  }

  showError(errorMessage): void {
    this.snackBar.open(errorMessage, 'RETRY', {
      duration: 2000,
    });
  }

  login() {
    this._service.login(this.username, this.password, this.sourceRoute)
      .subscribe(
        (data) => {
          this._service.createUserDetails(data);
          const userdata = JSON.parse(localStorage.getItem('userdata')) || null;
          localStorage.setItem('userdata', JSON.stringify(userdata));
          if(this._service.role === 'ADMIN'){
            this.router.navigate(['home/admin'], { relativeTo: this.route.parent });
          }else{
            this.router.navigate(['home'], { relativeTo: this.route.parent });
          }
          
        },
        (err) => {
          console.log('Error ', err)
          this.showError('Invalid credentials provided!');
        }
      );
  }
}
