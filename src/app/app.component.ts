import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './services/local-storage.service';

declare let gtag: Function;
/**
 * To use localStorage with angular:
 * 1 - https://github.com/zoomsphere/ngx-store
 * 2 - https://www.npmjs.com/package/@ngx-pwa/local-storage (**INSTALLED AND USING)
 * 
 * To use translate:
 * 1 - http://anthonygiretti.com/2018/04/23/getting-started-with-translation-in-angular-5-with-ngx-translate/
 * 2 - https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular-app-with-ngx-translate
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  imgPath: string = (process.env.ENV === 'production') ? ('/app/') : ('');

  public title: string = '';
  public type: string = '';
  private languageKey: string = "translate";

  constructor(private router: Router
    , private _translate: TranslateService
    , private localStorageService: LocalStorageService) {

    this.loadDefaultLanguage();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-164898157-1', { 'page_path': event.urlAfterRedirects });
      }
    })

  }

  ngOnInit() {
    this._translate.get('app.title').subscribe((translated: string) => {
      //this.title = this._translate.instant('app.title');
      //this.title = translated;
      //console.log(translated);
    });
  }

  onActivate(event) {
    $("html, body").animate({ scrollTop: 0 }, 100);
  }

  callLogin() {
    this.router.navigate(["login"]);
  }

  private loadDefaultLanguage(): void {
    this.localStorageService.getValue(this.languageKey).subscribe((item: any) => {
      let toUse = JSON.parse(item);
      //console.log(toUse);

      if (toUse === null) {
        this._translate.setDefaultLang('pt-br');
        this._translate.use('pt-br');
        return;
      }

      this._translate.setDefaultLang(toUse.value);
      this._translate.use(toUse.value);
    });
  }
}
