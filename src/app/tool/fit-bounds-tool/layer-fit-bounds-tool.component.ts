import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Layer } from '../../entity/layer';
import { RegisterComponent } from '../../util/component-decorator';
import { ToolComponent } from '../tool-component-interface';
import { OnMount } from '../../core-modules/dynamic-html';
import { MapaService } from '../../services/mapa.service';

/**
 * LayerFitBoundsToolComponent
 * <fit-bounds-tool  [shared]="layer"></fit-bounds-tool>
 */
@Component({
  selector: 'fit-bounds-tool',
  template: `
              <dfn class="layer-tool" attr.data-info="{{ 'tools.fitBounds' | translate }}" #innerContent>
                <button type="button" class="btn" *ngIf="layer !== null" (click)="fitBounds(layer)"><i class="material-icons md-dark ">zoom_out_map</i></button>
                <ng-content></ng-content> 
              </dfn>
            `
})
@RegisterComponent
export class LayerFitBoundsToolComponent extends ToolComponent implements OnInit, OnMount {
  layer:Layer;

  @Input() shared: any;  
  @ViewChild('innerContent', {static: true}) innerContent: ElementRef;
  
  dynamicOnMount(attr: Map<string, any>, innerHTML: string, el: any) {
    this.innerContent.nativeElement.innerHTML = innerHTML;    
    this.layer = this.shared;
  }
  
  constructor(private mapaService: MapaService) { 
    super();        
  }

  ngOnInit() {      
    this.layer = this.shared;
  }

  fitBounds() {
    this.mapaService.fitBounds(this.layer);
  }
}