import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
 @Input() rating=0;
  starWidth:number=0;
  constructor() { }

  ngOnInit() {
    this.starWidth=this.rating*75/5
  }

}
