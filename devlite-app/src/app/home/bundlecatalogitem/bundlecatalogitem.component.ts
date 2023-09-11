import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bundle } from 'src/app/models/model';

@Component({
  selector: 'app-bundlecatalogitem',
  templateUrl: './bundlecatalogitem.component.html',
  styleUrls: ['./bundlecatalogitem.component.scss']
})
export class BundlecatalogitemComponent implements OnInit {

  @Input() selectedBundle: Bundle;
  @Input() bundle: Bundle;
  @Output() selected = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit() {
    
  }
  isSelected(){
    if(!this.selectedBundle.lang){
      return false;
    }
    if(this.bundle.lang.name === this.selectedBundle.lang.name &&
      this.bundle.lang.buildTool === this.selectedBundle.lang.buildTool &&
      this.bundle.web.os === this.selectedBundle.web.os &&
      this.bundle.web.name === this.selectedBundle.web.name &&
      this.bundle.app.os === this.selectedBundle.app.os &&
      this.bundle.app.name === this.selectedBundle.app.name &&
      this.bundle.db.os === this.selectedBundle.db.os &&
      this.bundle.db.name === this.selectedBundle.db.name
      ){
      return true;
    }else{
      return false;
    }
  }

  select(_bundle: Bundle){
    this.selected.emit(_bundle);
  }

}
