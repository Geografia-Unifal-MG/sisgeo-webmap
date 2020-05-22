import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';

/**
 *  import terrabrasilis api from node_modules
 */
import * as Terrabrasilis from '../../../terrabrasilis-api/terrabrasilis';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Layer } from '../../entity/layer';
import { Utils } from '../../util/utils';
import { LocalStorageService } from '../../services/local-storage.service';
import { get } from 'lodash' 
import { isUndefined } from 'util';

@Component({
  selector: 'app-terrabrasilis-api',
  template: ``
})
export class TerrabrasilisApiComponent implements OnInit {
    /**
     * Terrabrasilis API module
     */
    private Terrabrasilis: any = Terrabrasilis;

    constructor(
        private dialog: MatDialog
        , private dom: DomSanitizer
        , private cdRef: ChangeDetectorRef
        , private localStorageService: LocalStorageService
    ) { }

    ////////////////////////////////////////////////
    //// Angular life cycle hooks
    ////////////////////////////////////////////////
    ngOnInit() {}

    ////////////////////////////////////////////////
    //// MapBuilder
    ////////////////////////////////////////////////
    public map(points: any, baselayers: any, overlayers: any ): void  {
        Terrabrasilis.map(points.latitude, points.longitude, 9)
            .addCustomizedBaseLayers(JSON.parse(JSON.stringify(baselayers)))
            .addCustomizedOverLayers(JSON.parse(JSON.stringify(overlayers)))
            // .addBaseLayers(JSON.parse(JSON.stringify(this.baselayers)))
            // .addOverLayers(JSON.parse(JSON.stringify(this.overlayers)))
            // .enableLegendAndToolToLayers()
            .enableZoomBox()
            //.enableDrawFeatureTool()
            .enableLayersControlTool()
            .enableScaleControlTool()
            .enableDisplayMouseCoordinates()
            // .enableInvalidateSize()
            .hideStandardLayerControl()
            .enableGeocodingTool();
    }

    getMap() {
        return this.Terrabrasilis.getCurrentlyMap();
    }

    ////////////////////////////////////////////////
    //// Layers interactions
    ////////////////////////////////////////////////
    layerOpacity(layerObject: any, event: any) {
        this.Terrabrasilis.setOpacityToLayer(layerObject, (event.value));
    }

    ////////////////////////////////////////////////
    //// Sidebar header tools
    ////////////////////////////////////////////////
    fullScreen() {
        Terrabrasilis.fullScreen();
    }

    drawSimpleShape() {
        this.showDialog('Terrabrasilis web application.');
    }

    resetMap() {
        Terrabrasilis.resetMap();
    }

    undo() {
        Terrabrasilis.undo();
    }

    redo() {
        Terrabrasilis.redo();
    }

    getFeatureInfo(event: any) {
        Terrabrasilis.addGetLayerFeatureInfoEventToMap(event);
    }

    showCoordinates(event: any) {
        Terrabrasilis.addShowCoordinatesEventToMap(event);
    }

    ////////////////////////////////////////////////
    //// Components
    ////////////////////////////////////////////////
    download(layer: Layer) {
        let download = '';
        layer.downloads.forEach((d: any) => {
            download += '<div><h5 class="card-title">Obter shapefile para ' + layer.title + '.</h5>' +
            '            <p class="card-text">' + d.name + ': ' + d.description + '</p>' +
            '            <a href="' + d.link + '" class="btn btn-primary btn-success">Download</a><div>';
        });

        const html =
        '<div class="container">' +
        '    <div class="card">' +
        '        <div class="card-body">' + download +
        '        </div>' +
        '    </div>' +
        '</div>';
        this.showDialog(html, "dialog.title.download");
    }

    getLegend(layer: any, urlOrCompleteSrcImgElement: boolean): Promise<any> {
      return this.localStorageService.getValue('translate').toPromise()
        .then((item: any) => {
            let language = get(JSON.parse(item), 'value', 'en')
            return Utils.getLegend(layer, urlOrCompleteSrcImgElement, language)
        });
    }


    getLayerInfo(layer: any) {

        this.cdRef.detectChanges();
        const match = /gwc\/service\/wms/;

        const source = layer.datasource != null ?
            (match.test(layer.datasource.host) == true ?
                layer.datasource.host.replace('gwc/service/wms', 'ows') : layer.datasource.host) :
            layer.thirdHost;

        var htmlTable = '<table class="table-responsive table "><tr class="table-active"><th colspan="3">' + layer.title + '</th></tr>'
                        + ' <tr> <td><b>Layer</b></td><td colspan="2">' + layer.name + '</td></tr>'
                        + '<tr><td><b>Workspace</b></td><td colspan="2">' + layer.workspace + '</td></tr>'
                        + '<tr><td><b>Source</b></td><td colspan="2">' + source + '</td></tr>'
                        + '<tr> <td><b>Data</b></td><td colspan="2">' + layer.date + '</td></tr>'; 

        if (layer.metadata){
            if (layer.metadata.projecao)
                htmlTable += '<tr> <td><b>Projeção</b></td><td colspan="2">' + layer.metadata.projecao + '</td></tr>';
            
            if (layer.metadata.datumHorizontal)
                htmlTable += '<tr> <td><b>Datum horizontal</b></td><td colspan="2">' + layer.metadata.datumHorizontal + '</td></tr>';

            if (layer.metadata.fonte)
                htmlTable += '<tr> <td><b>Fonte do dado</b></td><td colspan="2">' + layer.metadata.fonte + '</td></tr>';

            if (layer.metadata.autor)
                htmlTable += '<tr> <td><b>Autor(es)</b></td><td colspan="2">' + layer.metadata.autor + '</td></tr>';

            if (layer.metadata.informacoesAdicionais)
                htmlTable += '<tr> <td><b>Informações adicionais</b></td><td colspan="2">' + layer.metadata.informacoesAdicionais + '</td></tr>';
        }

        htmlTable = htmlTable.concat('</table>');

        this.showDialog(htmlTable, "dialog.title.metadata");
    }

    ////////////////////////////////////////////////
    //// General tools
    ////////////////////////////////////////////////
    enableLoading(dom?: string): void {
        Terrabrasilis.enableLoading(dom);
    }

    disableLoading(dom?: string): void {
        Terrabrasilis.disableLoading(dom);
    }

    reorderOverLayers(layers: any): void {
        Terrabrasilis.reorderOverLayers(layers);
    }

    getTerrabrasilisBaselayers(): any {
        return Terrabrasilis.getTerrabrasilisBaselayers();
    }

    deactiveLayer(layer: any): void {
        Terrabrasilis.deactiveLayer(layer);
    }

    deactiveBaselayer(layer: any): void {
        Terrabrasilis.deactiveBaselayer(layer);
    }

    activeLayer(layer: any): void {
        Terrabrasilis.activeLayer(layer);
    }

    isLayerActived(layer: any): boolean {
        return Terrabrasilis.isLayerActived(layer);
    }

    getLayerByName(layerName: string): any {
        return Terrabrasilis.getLayerByName(layerName);
    }

    getBaselayerByName(name: string): any {
        return Terrabrasilis.getBaselayerByName(name);
    }

    addGetLayerFeatureInfoEventToMap(event: any): void {
        Terrabrasilis.addGetLayerFeatureInfoEventToMap(event);
    }

    addShowCoordinatesEventToMap(event: any): void {
        Terrabrasilis.addShowCoordinatesEventToMap(event);
    }

    moveLayerToBack(layer: any): void {
        Terrabrasilis.moveLayerToBack(layer);
    }

    moveLayerToFront(layer: any) {
        Terrabrasilis.moveLayerToFront(layer);
    }

    ////////////////////////////////////////////////
    //// General use dialog
    ////////////////////////////////////////////////
    showDialog(content: string, title?: string): void {
        const dialogRef = this.dialog.open(DialogComponent, { width : '500px' });
        if(!isUndefined(title))
            dialogRef.componentInstance.title = title;

        dialogRef.componentInstance.content = this.dom.bypassSecurityTrustHtml(content);
    }

    /**
     * Enable or disable TimeDimension tool for one layer.
     * @param layer A layer with time dimension available.
     */
    onOffTimeDimension(layer: Layer) {
        // verify if layer is raster or vector type and use it to set aggregate times value.
        Terrabrasilis.onOffTimeDimension(layer.name, layer.isAggregatable /*aggregateTimes*/);
    }

    fitBounds(layer: Layer) {
        return Terrabrasilis.fitBounds(layer);
    }

    ////////////////////////////////////////////////
    //// Private methods
    ////////////////////////////////////////////////
}
