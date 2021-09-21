import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../preferences/preferences.service';

@Component({
  selector: 'app-name-form',
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.css'],
})
export class NameFormComponent implements OnInit {
  name?: string;
  closable = false;

  constructor(private prefs: PreferencesService) {}

  ngOnInit(): void {}

  change(event: any) {
    console.log(event);
    this.name = event.currentTarget.value;
    if (this.name && this.name.length > 0) {
      this.closable = true;
    }
  }

  setName() {
    this.prefs.setName(this.name || '');
  }
}
