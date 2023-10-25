import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from 'src/app/services/user.service';
import { Bundle, Org, DevWorkbenchInfo } from 'src/app/models/model';

@Component({
  selector: 'app-integrate',
  templateUrl: './integrate.component.html',
  styleUrls: ['./integrate.component.scss']
})
export class IntegrateComponent implements OnInit {

  org: Org;
  data: DevWorkbenchInfo;
  defaultData: any = null;
  configValues: any;
  
  selectedBundleId: String;

  filteredBundles: [Bundle];
  bundleStart: number = 0;
  
  repoStart: number = 0;
  loading:boolean;

  repos = [];
  filteredRepos = [];

  releaseDeploymentStrategy: string;

  constructor(private service: UserService, private router: Router, private snackBar: MatSnackBar) {
    this.releaseDeploymentStrategy = "Big Bang";
    this.service.defaultConfig.subscribe(_defaultData => {
      this.defaultData = _defaultData.integrateConfig;
    });
    this.loading = true;
  }


  ngOnInit() {
    this.org = JSON.parse(localStorage.getItem('orgData')) || null;
    this.data = this.org.devWorkbenchInfo;
    const _config = JSON.parse(localStorage.getItem('uiconfig')) || null;
    this.configValues = _config.integrateConfig;
    this.selectedBundleId = this.data.bundle._id;

    this.filteredBundles = this.configValues.bundle.slice(this.bundleStart, 12);

    this.loading = true;
    this.service.getRepos().subscribe(
      (response: any) => {
        this.repos = response.repos;
        this.filteredRepos = this.repos.slice(this.repoStart, 12);
        this.loading = false;
      },
      (err) => {
        console.log('Error ', err);
        this.loading = false;
        this.showError('Unable to get projects - '+err.error.message, 'RETRY');
      }
    );

  }

  showError(errorMessage: string, action: string): void {
    this.snackBar.open(errorMessage, action, {
      duration: 2000,
    });
  }

  isRepoSelected(repo: any){
    return (this.data.buName === repo.bu && this.data.projectName === repo.projectName && this.data.repository === repo.repository && this.data.branch === repo.branch)
  }

  selectRepo(repo:any){

    this.data.gitCodeUrl = repo.repositoryUrl;
    this.data.branch = repo.branch;

    // extra
    this.data.repository = repo.repository;
    this.data.projectId = repo.projectId;
    this.data.projectName = repo.projectName;
    this.data.buId = repo.buId;
    this.data.buName = repo.bu;
  }

  onPageChange(event: PageEvent){
    this.bundleStart = 12 * event.pageIndex;
    this.filteredBundles = this.configValues.bundle.slice(this.bundleStart, this.bundleStart+12);
  }

  onRepoPageChange(event: PageEvent){
    this.repoStart = 12 * event.pageIndex;
    this.filteredRepos = this.repos.slice(this.repoStart, this.repoStart+12);
  }

  saveDetails(): void {

    if (!this.data.gitCodeUrl) {
      this.showError('Git code URL is mandatory!', 'OK');
      return;
    }

    if (!this.data.branch) {
      this.showError('Branch is mandatory!', 'OK');
      return;
    }

    if(!this.data.bundle){
      this.showError('Please select a bundle!', 'OK');
      return;
    }

    // validate environment
    if (this.data.envType && this.data.envType.length > 0) {
      if (this.data.envType.includes('Development') && (!this.data.envConfig.devNoInstance || !this.data.envConfig.devTShirtSize)) {
        this.showError('Instance and environment size is mandatory for each selected environment.', 'OK');
        return;
      } else if (this.data.envType.includes('Test') && (!this.data.envConfig.testNoInstance || !this.data.envConfig.testTShirtSize)) {
        this.showError('Instance and environment size is mandatory for each selected environment.', 'OK');
        return;
      } else if (this.data.envType.includes('Staging') && (!this.data.envConfig.stagNoInstance || !this.data.envConfig.stagTShirtSize)) {
        this.showError('Instance and environment size is mandatory for each selected environment.', 'OK');
        return;
      } else if (this.data.envType.includes('Production') && (!this.data.envConfig.prodNoInstance || !this.data.envConfig.prodTShirtSize)) {
        this.showError('Instance and environment size is mandatory for each selected environment.', 'OK');
        return;
      } else {
        // nothing
      }
    } else {
      this.showError('Please select atleast one environment.', 'OK');
      return;
    }

    this.service.updateOrgDetails(this.org).subscribe(
      () => {
        var orgData = JSON.parse(localStorage.getItem('orgData')) || null;
        orgData.devWorkbenchInfo = this.data;
        localStorage.setItem('orgData', JSON.stringify(orgData));
        this.router.navigate(['home/orchestrate']);
      },
      (err) => {
        console.log('Error ', err);
        this.showError('Unable to save details', 'RETRY');
      }
    );
  }
}
