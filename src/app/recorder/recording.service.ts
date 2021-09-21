/// <reference types="@types/dom-mediacapture-record" />

import { Injectable } from '@angular/core';
import { Recorder } from './recorder';

@Injectable({
  providedIn: 'root',
})
export class RecordingService {
  recorders: Record<string, Recorder> = {};

  constructor() {}

  getRecorder(id: string) {
    if (typeof this.recorders[id] === 'undefined') {
      this.recorders[id] = new Recorder();
    }
    return this.recorders[id];
  }
}
