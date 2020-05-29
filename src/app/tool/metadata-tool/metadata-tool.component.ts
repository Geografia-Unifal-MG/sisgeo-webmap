import { Component, OnInit, ChangeDetectorRef, Input, ViewChild, ElementRef } from '@angular/core';
import { ToolComponent } from '../tool-component-interface';
import { RegisterComponent } from '../../util/component-decorator';
import { TerrabrasilisApiComponent } from '../terrabrasilis-api/terrabrasilis-api.component';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { OnMount } from '../../core-modules/dynamic-html';

/**
 * MetadataToolComponent
 * <app-metadata-tool [shared]="layer"></app-metadata-tool>
 */
@Component({
  selector: 'app-metadata-tool',
  template: 
            `
            <dfn class="layer-tool" attr.data-info="{{ 'tools.metadata' | translate }}">
              <button type="button" class="btn" (click)="getLayerInfo(layer)">
                <i class="material-icons md-dark">info</i>
              </button>
            </dfn>
            `  
})
@RegisterComponent
export class MetadataToolComponent extends ToolComponent implements OnInit, OnMount {  
  @Input() shared: any;  
  @ViewChild('innerContent', {static: true}) innerContent: ElementRef;
  
  dynamicOnMount(attr: Map<string, any>, innerHTML: string, el: any) {
      this.innerContent.nativeElement.innerHTML = innerHTML;    
      this.layer = this.shared;           
  }

  constructor(private dialog: MatDialog, private dom: DomSanitizer, private cdRef: ChangeDetectorRef) { 
      super();
  }

  /**
   * TerraBrasilis
   */
  private terrabrasilisApi: TerrabrasilisApiComponent = new TerrabrasilisApiComponent(this.dialog, this.dom, this.cdRef, null);

  ngOnInit() {
    this.layer = this.shared;
    //console.log("MetadataToolComponent OnInit", this.layer);
  }

  getLayerInfo(layer:any) {
    this.terrabrasilisApi.getLayerInfo(layer);
  }
}
