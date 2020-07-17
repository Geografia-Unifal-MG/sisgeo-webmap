import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  scroll() {
    $("html, .content").animate({ scrollTop: $(document).height() * 1000}, 0.1);
  }

  goToSection(url) {
    if (localStorage.getItem('scrollPosition')) {
      localStorage.removeItem('scrollPosition');
    }
    document.querySelector('#' + url).scrollIntoView();
  }
}