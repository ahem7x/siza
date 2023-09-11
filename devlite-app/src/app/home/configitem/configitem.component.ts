import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-configitem',
  templateUrl: './configitem.component.html',
  styleUrls: ['./configitem.component.scss']
})
export class ConfigitemComponent implements OnInit {


  @Input()
  label: string;

  @Input()
  icon: string;

  @Input()
  value: string;

  @Input()
  perspectiveValue: string;

  @Input()
  options: string[];

  @Input()
  readOnly: boolean;

  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  _value: string;

  constructor() { }

  ngOnInit() {
    this.calculateValue();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.calculateValue();
  }

  calculateValue() {
    if((!this.value || this.value === '') && (!this.options || this.options.includes('Prescriptive'))){
      this.value = 'Prescriptive';
    }

    if(!this.value){
      this._value = 'SELECT';
    }
    else if (this.value === 'Prescriptive') {
      if (this.perspectiveValue) {
        this._value = this.perspectiveValue;
      } else {
        this._value = 'SELECT';
      }
    } else {
      this._value = this.value;
    }
  }

  selectionChange($event) {
    this.onSelect.emit($event.value);
  }
}
