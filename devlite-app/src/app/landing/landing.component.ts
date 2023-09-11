import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  items: any = [
    { name: '../../assets/standard-workflow.png' },
    { name: '../../assets/dashboard1.png' },
    { name: '../../assets/dashboard2.png' },
    { name: '../../assets/dashboard3.png' },
    { name: '../../assets/dashboard4.png' },
    { name: '../../assets/dashboard5.png' },
    { name: '../../assets/dashboard6.png' },
  ]
  constructor() {

  }

  ngOnInit() {
  }
}
