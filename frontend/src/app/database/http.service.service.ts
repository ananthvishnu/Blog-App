import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './db';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  private apiUrl = baseUrl;

  constructor(private _http: HttpClient) {}

  //  post the data
  post(url: String, data: any): Observable<any> {
    return this._http.post(this.apiUrl + url, data);
  }

  // get data from database
  getData(url: String): Observable<any> {
    return this._http.get(this.apiUrl + url);
  }

  // put
  putData(url: String, data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this._http.put(this.apiUrl + url, data, { headers: headers });
  }
  deleteData(url: String): Observable<any> {
    return this._http.delete(this.apiUrl + url);
  }
  postData(url: String, formData: FormData) {
    return this._http.put(`${this.apiUrl}` + url, formData);
  }
}
