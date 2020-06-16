import * as Mapa from '../../leaflet-map-api/mapa';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Layer } from '../entity/layer';
import { Utils } from '../util/utils';
import { LocalStorageService } from './local-storage.service';
import { get } from 'lodash' 
import { isUndefined } from 'util';
import { Injectable } from '@angular/core';

@Injectable()
export class MapaService {

    constructor(
        private dialog: MatDialog
        , private dom: DomSanitizer
        , private localStorageService: LocalStorageService
    ) { }

    public map(points: any, baselayers: any, overlayers: any ): void  {
        Mapa.map(points.latitude, points.longitude, 9)
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
        return Mapa.getCurrentlyMap();
    }

    layerOpacity(layerObject: any, event: any) {
        Mapa.setOpacityToLayer(layerObject, (event.value));
    }

    fullScreen() {
        Mapa.fullScreen();
    }

    resetMap() {
        Mapa.resetMap();
    }

    undo() {
        Mapa.undo();
    }

    redo() {
        Mapa.redo();
    }

    getFeatureInfo(event: any) {
        Mapa.addGetLayerFeatureInfoEventToMap(event);
    }

    showCoordinates(event: any) {
        Mapa.addShowCoordinatesEventToMap(event);
    }

    /* era utilizado por um componente que foi removido, não foi removido porque pode ser util no futuro */
    getLegend(layer: any, urlOrCompleteSrcImgElement: boolean): Promise<any> {
      return this.localStorageService.getValue('translate').toPromise()
        .then((item: any) => {
            let language = get(JSON.parse(item), 'value', 'en')
            return Utils.getLegend(layer, urlOrCompleteSrcImgElement, language)
        });
    }

    enableLoading(dom?: string): void {
        Mapa.enableLoading(dom);
    }

    disableLoading(dom?: string): void {
        Mapa.disableLoading(dom);
    }

    reorderOverLayers(layers: any): void {
        Mapa.reorderOverLayers(layers);
    }

    getTerrabrasilisBaselayers(): any {
        return Mapa.getTerrabrasilisBaselayers();
    }

    deactiveLayer(layer: any): void {
        Mapa.deactiveLayer(layer);
    }

    deactiveBaselayer(layer: any): void {
        Mapa.deactiveBaselayer(layer);
    }

    activeLayer(layer: any): void {
        Mapa.activeLayer(layer);
    }

    isLayerActived(layer: any): boolean {
        return Mapa.isLayerActived(layer);
    }

    getLayerByName(layerName: string): any {
        return Mapa.getLayerByName(layerName);
    }

    getBaselayerByName(name: string): any {
        return Mapa.getBaselayerByName(name);
    }

    addGetLayerFeatureInfoEventToMap(event: any): void {
        Mapa.addGetLayerFeatureInfoEventToMap(event);
    }

    addShowCoordinatesEventToMap(event: any): void {
        Mapa.addShowCoordinatesEventToMap(event);
    }

    moveLayerToBack(layer: any): void {
        Mapa.moveLayerToBack(layer);
    }

    moveLayerToFront(layer: any) {
        Mapa.moveLayerToFront(layer);
    }

    showDialog(content: string, title?: string): void {
        const dialogRef = this.dialog.open(DialogComponent, { width : '500px' });
        if(!isUndefined(title))
            dialogRef.componentInstance.title = title;

        dialogRef.componentInstance.content = this.dom.bypassSecurityTrustHtml(content);
    }

    fitBounds(layer: Layer) {
        return Mapa.fitBounds(layer);
    }
}