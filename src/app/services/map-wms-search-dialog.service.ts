import { Injectable, Output, EventEmitter, Directive } from '@angular/core';

@Directive()
@Injectable()
export class MapWmsSearchDialogService {

  layer: any = {};
  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor() { }

  updateMapLayerFromWmsSearch(layer: any) {
    this.layer = layer;
    this.change.emit(this.layer);
  }

}
