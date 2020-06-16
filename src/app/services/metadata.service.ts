import {throwError as observableThrowError,  Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Constants } from '../util/constants';
import { Metadata } from '../entity/metadata'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class MetadataService {
  private hostApi = Constants.TERRABRASILIS_BUSINESS_API_HOST;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * API: GET metadata/{id}
   */
  public getMetadataById(id: string): Observable<Metadata> {
    return this.http.get<Metadata>(this.hostApi + 'metadata/' + id, httpOptions)
                .pipe(
                    map(res => res),
                    catchError(err => observableThrowError(err.message))
                );
  }
}