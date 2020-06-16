import { Component, OnInit, ChangeDetectorRef, Input, ViewChild, ElementRef } from '@angular/core';
import { ToolComponent } from '../tool-component-interface';
import { RegisterComponent } from '../../util/component-decorator';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { OnMount } from '../../core-modules/dynamic-html';
import { isUndefined } from 'util';
import { DialogComponent } from '../../dialog/dialog.component';
import { MetadataService } from '../../services/metadata.service';
import { Layer } from '../../entity/layer';
import { Metadata } from '../../entity/metadata';

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
    @Input() shared: Layer;  
    @ViewChild('innerContent', {static: true}) innerContent: ElementRef;

    dynamicOnMount(attr: Map<string, any>, innerHTML: string) {
        this.innerContent.nativeElement.innerHTML = innerHTML;    
        this.layer = this.shared;           
    }

    constructor(private dialog: MatDialog, private dom: DomSanitizer, private cdRef: ChangeDetectorRef, private metadataService: MetadataService) { 
        super();
    }

    ngOnInit() {
        this.layer = this.shared;
    }

    getLayerInfo(layer: Layer) {

        this.metadataService.getMetadataById(layer.metadataId).subscribe((metadata: Metadata) => {
            this.cdRef.detectChanges();
    
            var htmlTable = '<table class="table-responsive table "><tr class="table-active"><th colspan="3">' + layer.title + '</th></tr>'
                            + ' <tr> <td><b>Layer</b></td><td colspan="2">' + layer.name + '</td></tr>'
                            + '<tr><td><b>Workspace</b></td><td colspan="2">' + layer.workspace + '</td></tr>'
                            + '<tr><td><b>Source</b></td><td colspan="2">' + layer.datasource.host + '</td></tr>'
                            + '<tr> <td><b>Data</b></td><td colspan="2">' + layer.date + '</td></tr>'; 
    
            if (metadata){
                if (metadata.projecao)
                    htmlTable += '<tr> <td><b>Projeção</b></td><td colspan="2">' + metadata.projecao + '</td></tr>';
                
                if (metadata.datumHorizontal)
                    htmlTable += '<tr> <td><b>Datum horizontal</b></td><td colspan="2">' + metadata.datumHorizontal + '</td></tr>';
    
                if (metadata.fonte)
                    htmlTable += '<tr> <td><b>Fonte do dado</b></td><td colspan="2">' + metadata.fonte + '</td></tr>';
    
                if (metadata.autor)
                    htmlTable += '<tr> <td><b>Autor(es)</b></td><td colspan="2">' + metadata.autor + '</td></tr>';
    
                if (metadata.informacoesAdicionais)
                    htmlTable += '<tr> <td><b>Informações adicionais</b></td><td colspan="2">' + metadata.informacoesAdicionais + '</td></tr>';
            }
    
            htmlTable = htmlTable.concat('</table>');
    
            this.showDialog(htmlTable, "dialog.title.metadata");  
        });  
    }

    showDialog(content: string, title?: string): void {
        const dialogRef = this.dialog.open(DialogComponent, { width : '500px' });
        if(!isUndefined(title))
            dialogRef.componentInstance.title = title;

        dialogRef.componentInstance.content = this.dom.bypassSecurityTrustHtml(content);
    }
}