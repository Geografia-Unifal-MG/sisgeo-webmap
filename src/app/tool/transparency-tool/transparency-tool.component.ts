import { Component, OnInit, ChangeDetectorRef, ViewContainerRef, ViewChild, Input, ElementRef } from '@angular/core';
import { ToolComponent } from '../tool-component-interface';
import { RegisterComponent } from '../../util/component-decorator';
import { TerrabrasilisApiComponent } from '../terrabrasilis-api/terrabrasilis-api.component';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Layer } from '../../entity/layer';
import { OnMount } from '../../core-modules/dynamic-html';

/**
 * TransparencyToolComponent
 * <app-transparency-tool  [shared]="layer"></app-transparency-tool>
 */
@Component({
  selector: 'app-transparency-tool',
  template: 
            `
            <dfn id="{{(layer.name | cleanWhiteSpace) + '_opacity'}}" class="layer-tool" attr.data-info="{{ 'tools.transparency' | translate }}" #innerContent >    
                <button class="btn" type="button" role="button" (click)="showSlider()">
                        <i class="material-icons md-dark">brightness_6</i>
                </button>
            </dfn>             
            <div *ngIf="show" class="transparency-slider">
                <div class="slider-back">
                    <button class="btn" type="button" role="button" (click)="hideSlider()">
                        <i class="material-icons md-dark">arrow_back</i>
                    </button>
                </div>             
                <div class="slider-bar">
                    <div class="budget-wrap">                        
                        <mat-slider class="w-100" color="primary" pressed thumbLabel [max]="max" [min]="min" [step]="step" value="{{ layer.opacity }}" (input)="layerOpacity(layer, $event)"></mat-slider>
                    </div>
                </div>                    
            </div>  
            <ng-content></ng-content> 
            `
})
@RegisterComponent
export class TransparencyToolComponent extends ToolComponent implements OnInit, OnMount {  
    layer:Layer;
    
    @Input() shared: any;  
    @ViewChild('innerContent', {static: true}) innerContent: ElementRef;
    
    dynamicOnMount(attr: Map<string, any>, innerHTML: string, el: any) {
        this.innerContent.nativeElement.innerHTML = innerHTML;    
        this.layer = this.shared;           
    }
    
    /**
     * Slider value
     */
    public max = 1;
    public min = 0;
    public step = 0.01;
    private show: boolean;
    
    constructor(private dialog: MatDialog, private dom: DomSanitizer, private cdRef: ChangeDetectorRef) {   
        super();
    }

    /**
     * TerraBrasilis
     */    
    private terrabrasilisApi: TerrabrasilisApiComponent = new TerrabrasilisApiComponent(this.dialog, this.dom, this.cdRef, null);

    ngOnInit() {
        this.layer = this.shared;
        this.show = false;
    }

    layerOpacity(layerObject:any, event:any) {
        this.layer.opacity = event.value;
        this.terrabrasilisApi.layerOpacity(layerObject, event);
    }

    showSlider() {
        this.handleToolButtons(false);
        this.show = true;
    }

    hideSlider() {
        this.handleToolButtons(true);
        this.show = false;
    }

    private handleToolButtons(display: boolean){
        var gridStack = $('#' + this.layer.name + '_opacity').parents('.grid-stack-item');
        gridStack.find("app-transparency-tool").find("button").toggle(display);

        //TODO: buscar as tools no banco
        gridStack.find("app-metadata-tool").toggle(display);
        gridStack.find("app-layer-download-tool").toggle(display);
        gridStack.find("fit-bounds-tool").toggle(display);
    }
}
