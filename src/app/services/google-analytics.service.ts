import { Injectable } from '@angular/core';

declare let gtag:Function;

@Injectable({
  providedIn: 'root'
})

/*
    Com esse Service é possível rastrear eventos nos outros componentes para enviar ao google analytics. 
    Para futuras coletas de dados como quantidade de downloads de algumas layers, quantas vezes abriu o getFeatureInfo de
    uma determinada layer, etc. Basta importar o service no componente desejado e adicionar no constructor.
    Tuturial: https://medium.com/madhash/how-to-properly-add-google-analytics-tracking-to-your-angular-web-app-bc7750713c9e
*/

export class GoogleAnalyticsService {

  constructor() { }

  public eventEmitter(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null
  ){
    gtag('event', eventName, {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    })
  }
}