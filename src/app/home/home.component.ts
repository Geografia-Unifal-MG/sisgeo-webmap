import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  goTopBtnStyle = {
    'position': 'fixed',
    'bottom': '10px',
    'right': '25px',
    'cursor': 'pointer',
    'border-radius': '35px',
    'color': '#fff',
    'background-color': '#17a2b8',
    'border-color': '#17a2b8',
    'user-select': 'none',
    'border': '1px solid transparent',
    'padding': '.375rem .75rem',
    'font-size': '1rem',
    'line-height': '1.5',
    'outline': 'none',
    'opacity': '1'
  }

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('scrollPosition')) {
      const scrollTo = JSON.parse(localStorage.getItem('scrollPosition'));
      $("html, body").animate({ scrollTop: scrollTo }, 0);
      localStorage.removeItem('scrollPosition');
    } else if (this.router.url.substring(1).length > 0) {
        setTimeout(() => {
          document.querySelector(this.router.url.substring(1)).scrollIntoView(true);
        }, 200);
      }
  }

  goToProject(url) {
    const scrollPosition = window.pageYOffset;
    localStorage.setItem('scrollPosition', JSON.stringify(scrollPosition));
    this.router.navigate([url]);
  }
}
