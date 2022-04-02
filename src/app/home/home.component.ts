import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isCollapsed1 = true;
  public isCollapsed2 = false;
  public isCollapsed3 = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    (() => {
      let nav = document.getElementById('#nav');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 1.5) {
          nav!.classList.add("fixed-top");
          document.body.style.paddingTop = '70';
        } else {
          nav!.classList.remove("fixed-top");
          document.body.style.paddingTop = '0';
        }
      });
      console.log('Listner added');
    })()
  }

}
