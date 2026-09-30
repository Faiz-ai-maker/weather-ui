import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WeatherService } from '../../services/weatherservice';
import { WeatherRecord } from '../../models/weather-record';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherData: WeatherRecord[] = [];
  filteredData: WeatherRecord[] = [];

  loading = false;
  errorMessage = '';

  fromDate = '';
  toDate = '';

  minTempFilter: number | null = null;

  sortDateAsc = true;
  sortTempAsc = true;

  constructor(
    private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.loadWeather();
  }

  loadWeather(): void {

    this.loading = true;

    this.weatherService.getWeather()
      .subscribe({
        next: (response) => {

          this.weatherData = response;

          // LOAD GRID BY DEFAULT
          this.filteredData = [...response];

          this.loading = false;
        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Failed to load weather data';

          this.loading = false;
        }
      });
  }

  applyFilters(): void {

    this.filteredData = this.weatherData.filter(item => {

      const itemDate =
        new Date(item.date);

      const from =
        this.fromDate
          ? new Date(this.fromDate)
          : null;

      const to =
        this.toDate
          ? new Date(this.toDate)
          : null;

      const matchesDate =
        (!from || itemDate >= from) &&
        (!to || itemDate <= to);

      const matchesTemp =
        this.minTempFilter == null ||
        (item.maxTemperature ?? 0)
        >= this.minTempFilter;

      return matchesDate &&
             matchesTemp;
    });
  }

  clearFilters(): void {

    this.fromDate = '';
    this.toDate = '';
    this.minTempFilter = null;

    this.filteredData =
      [...this.weatherData];
  }

  sortByDate(): void {

    this.filteredData.sort((a, b) => {

      const dateA =
        new Date(a.date).getTime();

      const dateB =
        new Date(b.date).getTime();

      return this.sortDateAsc
        ? dateA - dateB
        : dateB - dateA;
    });

    this.sortDateAsc =
      !this.sortDateAsc;
  }

  sortByTemperature(): void {

    this.filteredData.sort((a, b) => {

      const tempA =
        a.maxTemperature ?? 0;

      const tempB =
        b.maxTemperature ?? 0;

      return this.sortTempAsc
        ? tempA - tempB
        : tempB - tempA;
    });

    this.sortTempAsc =
      !this.sortTempAsc;
  }
}