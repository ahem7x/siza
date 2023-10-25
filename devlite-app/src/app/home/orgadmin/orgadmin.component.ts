import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { find, findIndex } from 'lodash';
import { User, Release, Product, Org, BusinessUnit } from '../../models/model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orgadmin',
  templateUrl: './orgadmin.component.html',
  styleUrls: ['./orgadmin.component.scss']
})
export class OrgadminComponent implements OnInit {

  username: String;
  password: String;

  bu: String;
  product: String;
  releaseName: String;
  version: String;

  businessUnit: BusinessUnit;
  users: [User];
  products: [Product];
  releases: [Release];

  selectedBU: String;
  selectedProduct: String;

  org: Org = JSON.parse(localStorage.getItem('orgData')) || null;

  defaultData: any = null;
  configValues = JSON.parse(localStorage.getItem('uiconfig')) || null;

  showPassword = {};
  configureBU: boolean;

  constructor(private service: UserService, private snackBar: MatSnackBar, private router: Router) {
    this.service.defaultConfig.subscribe(_defaultData => {
      this.defaultData = _defaultData;
    });

    this.users = this.service.orgUsers;
  }

  ngOnInit() {
  }

  selectBU(buName: String) {
    this.businessUnit = this.org.businessUnits.filter(bu => bu.name === buName)[0];
    this.selectedBU = buName;
    this.products = this.businessUnit.products;
  }

  selectProduct(pName: String) {
    this.selectedProduct = pName;
    this.releases = this.products.filter(p => p.name === pName)[0].releases;
  }

  addUser() {
    this.service.createOrgUser(this.username, this.password).subscribe(
      (data: any) => {
        if (this.users) {
          this.users.push({ username: this.username });
        } else {
          this.users = [{ username: this.username }];
        }
        this.username = '';
      },
      (err) => {
        console.log('Error ', err);
        this.showError('Unable to save details', 'RETRY');
      }
    );
  }

  deleteUser(user: User) {
    this.service.deleteOrgUser(user._id).subscribe(
      (data: any) => {
        const index = findIndex(this.users, { _id: user._id });
        this.users.splice(index, 1);
        this.service.orgUsers = this.users;
      },
      (err) => {
        console.log('Error ', err);
        this.showError('Unable to delete user', 'RETRY');
      }
    );
  }

  addBU() {
    this.org.businessUnits.push({ name: this.bu });
    this.bu = '';
  }

  deleteBU(buName: String) {
    const index = findIndex(this.org.businessUnits, { name: buName });
    this.org.businessUnits.splice(index, 1);
    this.selectedBU = null;
    this.businessUnit = null;
  }

  addProduct() {
    if (this.products) {
      this.products.push({
        name: this.product
      });
    } else {
      this.businessUnit.products  = [{
        name: this.product
      }];
      this.products = this.businessUnit.products;
    }
    this.product = '';
  }

  deleteProduct(pName: String) {
    const index = findIndex(this.products, { name: pName });
    this.products.splice(index, 1);
  }

  addRelease() {
    if(this.releases){
      this.releases.push({
        name: this.releaseName,
        version: this.version
      });
    }else{
      var product:Product = find(this.products, { name: this.selectedProduct });
      product.releases = [{
        name: this.releaseName,
        version: this.version
      }];
      this.releases = product.releases;
    }
    

    this.releaseName = '';
    this.version = '';
  }

  deleteRelease(name: String, version: String) {
    const index = findIndex(this.releases, { name, version });
    this.releases.splice(index, 1);
  }

  showError(errorMessage: string, action: string): void {
    this.snackBar.open(errorMessage, action, {
      duration: 2000,
    });
  }

  setToolInfo(group: string, tool: string, value: string): void{
    this.org[group][tool].value = value;
    this.org[group][tool].deployment = '';
    this.org[group][tool].license = '';
    this.org[group][tool].username = '';
    this.org[group][tool].url = '';
    this.org[group][tool].certificate = '';
    this.org[group][tool].password = '';
  }

  updateOrg() {

    if(this.org.businessUnits.length <= 0 ||
      !(this.org.businessUnits[0].products && this.org.businessUnits[0].products.length > 0)||
      !(this.org.businessUnits[0].products[0].releases && this.org.businessUnits[0].products[0].releases.length > 0)){
      this.showError('Please define atleast one business unit with a product and release.', 'RETRY');
      return;
    }

    this.service.updateOrgDetails(this.org).subscribe(
      (data: any) => {
        this.org = data.doc;
        localStorage.setItem("orgData", JSON.stringify(this.org));
        this.showError('Organization information updated successfully. ', 'OK');

        // navigate to orchestrate
        setTimeout(()=>this.router.navigate(["/home/orchestrate"]),3000);
      },
      (err) => {
        console.log('Error ', err);
        this.showError('Unable to save details', 'RETRY');
      }
    );
  }
}
