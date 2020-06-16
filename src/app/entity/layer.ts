import * as _ from 'lodash';
import { Subdomain } from './subdomain';
import { Tool } from './tool';
import { Datasource } from './datasource';

/**
 * Layer define the parameters to mount automatically the layers (Baselayer and Overlayer)
 */
export class Layer {

    constructor(id: string) {
        this.id = id;
    }
    id = '';
    name = '';
    title = '';
    description = '';
    workspace = '';
    opacity = 0.9;
    baselayer = false;
    active = false;
    enable = false;
    legendURL = '';
    date = '';
    metadataId = '';
    downloadId = '';

    datasource: Datasource = null;
    tools: Tool[] = [];
    subdomains: Subdomain[] = [];

    thirdHost = '';

    /**
     * UI Controllers
     */
    uiOrder = 0;
    stackOrder = 0;
    isRemovable = false;
    hasTranslate = false;
    isAggregatable = false;

    public static of(l: any): Layer {
        return new Layer(l.id)
                    .addName(l.name)
                    .addTitle(l.title)
                    .addWorkspace(l.workspace)
                    .addOpacity(0.9)
                    .addDatasource(l.datasource)
                    .addTools(l.tools)
                    .isBaselayer(l.baselayer)
                    .isActive(l.active)
                    .isEnable(l.enabled)
                    .isTranslatable(true)
                    .addStackOrder(l.stackOrder)
                    .isTranslatable(l.hasTranslate)
                    .addDate(l.date);
    }

    addTitle(title: string) {
        this.title = title;
        return this;
    }

    addLegendURL(legendURL: string) {
        this.legendURL = legendURL;
        return this;
    }

    addName(name: string) {
        this.name = name;
        return this;
    }

    addDescription(description: string) {
        this.description = description;
        return this;
    }

    addWorkspace(workspace: string) {
        this.workspace = workspace;
        return this;
    }

    addOpacity(opacity: number) {
        this.opacity = opacity;
        return this;
    }

    isBaselayer(baselayer: boolean) {
        this.baselayer = baselayer;
        return this;
    }

    isActive(active: boolean) {
        this.active = active;
        return this;
    }

    isEnable(enable: boolean) {
        this.enable = enable;
        return this;
    }

    addDatasource(datasource: Datasource) {
        this.datasource = datasource;
        return this;
    }

    addSubdomains(subdomains: Subdomain[]) {
        this.subdomains = subdomains;
        return this;
    }

    addTools(tools: Tool[]) {
        this.tools = tools;
        return this;
    }

    addToolsByIds(toolIds: string[]){
        for (let i = 0; i < toolIds.length; i++) {
            var tool = Tool.getTool(toolIds[i]);
            if (tool) {
                this.tools.push(tool);
            }
        }
        return this;
    }    

    addThirdHost(thirdHost: string) {
        this.thirdHost = thirdHost;
        return this;
    }

    addStackOrder(stackOrder: number) {
        this.stackOrder = stackOrder;
        this.uiOrder = stackOrder;
        return this;
    }

    addDate(date: string) {
        this.date = date != null ? new Date(date).toLocaleDateString('pt-br') : '';
        return this;
    }

    addDownloadId(downloadId: string){
        this.downloadId = downloadId;
        return this;
    }

    addMetadataId(metadataId: string){
        this.metadataId = metadataId;
        return this;
    }

    isTranslatable(hasTranslate: boolean) {
        this.hasTranslate = hasTranslate;
        return this;
    }

    willRemove(isRemovable: boolean) {
        this.isRemovable = isRemovable;
        return this;
    }

    convertToJson(layer: Layer): string {
        return JSON.stringify(layer);
    }
}