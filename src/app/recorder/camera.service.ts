import { Injectable } from '@angular/core';
import { Camera } from './camera';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  cameras: Record<string, Camera> = {};

  constructor() {}

  getCamera(id: string) {
    if (typeof this.cameras[id] === 'undefined') {
      this.cameras[id] = new Camera();
    }
    return this.cameras[id];
  }
}
