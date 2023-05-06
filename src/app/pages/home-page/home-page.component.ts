import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  desc:string = 'Populator is an online website where you can find current inforamtion, statistics and calculations about the population of humans in the United States today and in the future.'
  btnTxt:string = ''

  ngOnInit(): void {
    setTimeout(()=>{
      this.btnTxt = 'Start now!'
    },12500)
  }
}
