import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapeamento',
  templateUrl: './mapeamento.component.html',
  styleUrls: ['./mapeamento.component.css']
})
export class MapeamentoComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
