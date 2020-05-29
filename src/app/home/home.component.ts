import { Component, OnInit } from '@angular/core';

declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initjQuery();
  }

  initjQuery() {
    let scroll_link = $(".scroll");
    //smooth scrolling -----------------------
    scroll_link.click(function (e) {
      e.preventDefault();
      let url = $(".content").find($(this).attr("href")).offset().top;
      $("html, .content").animate(
        {
          scrollTop: url,
        },
        700
      );
      $(this).parent().addClass("active");
      $(this).parent().siblings().removeClass("active");
      return false;
    });

    $('.content').append('<div id="toTop" style="position: fixed;bottom: 10px;right: 25px;cursor: pointer;border-radius: 35px;"' + 
                          'class="toTop btn btn-info"><i class="fa fa-arrow-up"></i></div>');
    $(window).scroll(function () {
      if ($(this).scrollTop() != 0) {
        $('toTop').fadeIn();
      } else {
        $('toTop').fadeOut();
      }
    });
    $('#toTop').click(function () {
      $("html, .content").animate({ scrollTop: 0 }, 600);
      return false;
    });
  }

}
