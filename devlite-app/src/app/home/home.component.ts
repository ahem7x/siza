import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatDialog, MatSnackBar } from '@angular/material';

export const AdminModuleList = [
  {
    label: 'Onboard',
    tabIndex: 1,
    routerLink: 'admin',
  },
  {
    label: 'Orchestrate',
    tabIndex: 2,
    routerLink: 'orchestrate',
  }
];

export const ModulesList = [
  {
    label: 'Dev Workbench',
    tabIndex: 1,
    routerLink: 'integrate',
  },
  {
    label: 'Orchestrate',
    tabIndex: 2,
    routerLink: 'orchestrate'
  },
  {
    label: 'Dashboard',
    tabIndex: 3,
    routerLink: 'dashboard'
  },
];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  modulesList: Array<any>;
  enteredButton = false;
  isMatMenuOpen = false;
  isMatMenu2Open = false;
  prevButtonTrigger;

  defaultData: any = null;


  constructor(private service: UserService, private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private ren: Renderer2, public dialog: MatDialog) {

    if (this.service.role === 'ADMIN') {
      this.modulesList = AdminModuleList;
    } else {
      this.modulesList = ModulesList;
    }

    this.service.defaultConfig.subscribe(_defaultData => {
      this.defaultData = _defaultData;
    });

  }

  ngOnInit() {
    console.log('Home Init()');
    if (this.router.url === '/home') {
      // navigate to collaborate only for now
      if (this.service.role === 'ADMIN') {
        this.router.navigate(['admin'], { relativeTo: this.route });
      } else {
        this.router.navigate(['integrate'], { relativeTo: this.route });
      }
    }
  }

  logout(): void {
    this.service.logout();
    this.router.navigate(['']);
  }

  getCurrentTabIndex() {
    if (this.service.role === 'ADMIN') {
      if (this.router.url === '/home/admin') {
        return 1;
      } else if (this.router.url === '/home/orchestrate') {
        return 2;
      } else if (this.router.url === '/home/dashboard') {
        return 3;
      } else { return 0; }
    } else {
      if (this.router.url === '/home/integrate') {
        return 1;
      } else if (this.router.url === '/home/orchestrate') {
        return 2;
      } else if (this.router.url === '/home/dashboard') {
        return 3;
      } else { return 0; }
    }
  }

  showError(errorMessage: string, action: string): void {
    this.snackBar.open(errorMessage, action, {
      duration: 5000,
    });
  }

  get username() {
    return this.service.username;
  }
}

