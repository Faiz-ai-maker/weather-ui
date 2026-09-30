import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherRecord } from '../models/weather-record';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl =
    'http://localhost:5180/api/weather';

  constructor(private http: HttpClient) { }

  getWeather(): Observable<WeatherRecord[]> {
    return this.http.get<WeatherRecord[]>(this.apiUrl);
  }
}