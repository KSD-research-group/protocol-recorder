import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  private step = 100;
  private size = 400;
  private name = 'no_name';

  sizeChange = new BehaviorSubject<number>(this.size);

  constructor() {}

  larger() {
    this.size += this.step;
    this.sizeChange.next(this.size);
  }

  smaller() {
    this.size -= this.step;
    this.sizeChange.next(this.size);
  }

  setName(name: string) {
    console.log('Set name', name);
    this.name = name;
  }

  getName() {
    console.log('Get name', this.name);
    return this.name;
  }
}
