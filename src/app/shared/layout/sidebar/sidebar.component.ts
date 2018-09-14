import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  // timer: number = 0;
  // interval;

  // startTimer() {
  //   this.interval = setInterval(() => {
  //     this.timer++;
  //   },1000)
  // }

  // pauseTimer() {
  //   clearInterval(this.interval);
  // }

}
