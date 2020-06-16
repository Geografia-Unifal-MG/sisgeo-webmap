import {throwError as observableThrowError,  Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Constants } from '../util/constants';
import { Download } from '../entity/download';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class DownloadService {
  private hostApi = Constants.TERRABRASILIS_BUSINESS_API_HOST;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * API: GET download/{id}
   */
  public getDownloadById(id: string): Observable<Download> {
    return this.http.get<Download>(this.hostApi + 'download/' + id, httpOptions)
                .pipe(
                    map(res => res),
                    catchError(err => observableThrowError(err.message))
                );
  }
}