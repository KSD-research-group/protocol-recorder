import { Component, OnInit } from '@angular/core';
import { PreferencesService } from './preferences.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css'],
})
export class PreferencesComponent {
  constructor(private preferences: PreferencesService) {}
  larger() {
    this.preferences.larger();
  }
  smaller() {
    this.preferences.smaller();
  }
}
