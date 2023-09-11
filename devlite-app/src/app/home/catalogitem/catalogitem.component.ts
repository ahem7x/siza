import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-catalogitem',
  templateUrl: './catalogitem.component.html',
  styleUrls: ['./catalogitem.component.scss']
})
export class CatalogitemComponent implements OnInit {

  @Input()
  label: string;

  @Input()
  options: string[];

  @Input()
  cols: Number = 4;

  @Input()
  icons: string[];

  @Input()
  multiple: boolean;

  @Input()
  value: any;

  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  selected: string[] = [];

  select(option) {
    if (this.selected.includes(option)) {
      // remove
      const index = this.selected.indexOf(option);
      if (index > -1) {
        this.selected.splice(index, 1);
      }
    } else {
      // add
      if (!this.multiple) {
        // remove/clear the list
        this.selected = [];
      }
      this.selected.push(option);
    }

    if (this.multiple) {
      this.onSelect.emit(this.selected);
    } else {
      this.onSelect.emit(this.selected[0]);
    }
  }

  constructor() { }

  ngOnInit() {
    // default prescriptive
    if (this.options.includes('Prescriptive') && (this.value === '' || !this.value)) {
      this.selected.push('Prescriptive');
    }

    if (this.multiple && this.value) {
      const value: string[] = this.value as string[];
      value.forEach(element => {
        this.selected.push(element);
      });
    } else {
      this.selected.push(this.value as string);
    }
  }

}
