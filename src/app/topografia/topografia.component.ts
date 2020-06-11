import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topografia',
  templateUrl: './topografia.component.html',
  styleUrls: ['./topografia.component.css']
})
export class TopografiaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initjQuery();
  }

  initjQuery() {
    $('.content').append('<div id="toTop" style="position: fixed; display:none;bottom: 10px;right: 25px;cursor: pointer;border-radius: 35px;"' + 
                          'class="toTop btn btn-info"><i class="fa fa-arrow-up"></i></div>');

    $('.content').scroll(function () {
      if ($(this).scrollTop() != 0) {
        $('#toTop').fadeIn();
      } else {
        $('#toTop').fadeOut();
      }
    });
    $('#toTop').click(function () {
      $("html, .content").animate({ scrollTop: 0 }, 50);
      return false;
    });
  }

}
