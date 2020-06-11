import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { OnMount } from '../../core-modules/dynamic-html';
import { ToolComponent } from '../tool-component-interface';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Layer } from '../../entity/layer';
import { DownloadService } from '../../services/download.service';
import { isUndefined } from 'util';
import { DialogComponent } from '../../dialog/dialog.component';

/**
 * LayerDownloadToolComponent
 * <app-layer-download-tool  [shared]="layer"></app-layer-download-tool>
 */
@Component({
    selector: 'app-layer-download-tool',
    template: `
                <dfn class="layer-tool" attr.data-info="{{ 'tools.download' | translate }}" #innerContent>
                <button type="button" class="btn" *ngIf="layer.downloadId" (click)="download(layer)"><i class="material-icons md-dark">cloud_download</i></button>
                <ng-content></ng-content>
                </dfn>
            `
})
export class LayerDownloadToolComponent extends ToolComponent implements OnInit, OnMount {  
    @Input() shared: any;  
    @ViewChild('innerContent', {static: true}) innerContent: ElementRef;

    private downloadService: DownloadService;

    dynamicOnMount(attr: Map<string, any>, innerHTML: string, el: any) {
        this.innerContent.nativeElement.innerHTML = innerHTML;    
        this.layer = this.shared;
    }
    
    constructor(private dialog: MatDialog, private dom: DomSanitizer, private cdRef: ChangeDetectorRef, downloadService: DownloadService) {
        super();
        this.downloadService = downloadService;
    }

    ngOnInit() {    
        this.layer = this.shared;
    }

    download(layer: Layer) {
        this.downloadService.getDownloadById(layer.downloadId).subscribe(download => {
            const html =
            '<div class="container">' +
            '    <div class="card">' +
            '        <div class="card-body">' +
            '           <div><h5 class="card-title">Obter ' + layer.title + '</h5>' +
            '               <p class="card-text">' + download.name + ': ' + download.description + '</p>' +
            '               <a href="' + download.link + '" class="btn btn-primary btn-success">Download</a><div>' +
            '           </div>' +
            '    </div>' +
            '</div>';
            this.showDialog(html, "dialog.title.download");            
        });	
    }

    showDialog(content: string, title?: string): void {
        const dialogRef = this.dialog.open(DialogComponent, { width : '500px' });
        if(!isUndefined(title))
            dialogRef.componentInstance.title = title;

        dialogRef.componentInstance.content = this.dom.bypassSecurityTrustHtml(content);
    }
}