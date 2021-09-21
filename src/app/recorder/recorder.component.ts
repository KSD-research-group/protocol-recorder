import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { PreferencesService } from '../preferences/preferences.service';
import { Camera } from './camera';
import { CameraService } from './camera.service';
import { Recorder } from './recorder';
import { RecordingService } from './recording.service';

export class RecordingInfo {
  constructor(public video: HTMLVideoElement, public srcUrl: string) {}
}

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css'],
})
export class RecorderComponent implements AfterViewInit {
  @ViewChild('video') video!: ElementRef;
  @Input() expanded?: boolean;
  @Input() id!: string;
  @Output() recordingAvailable = new EventEmitter<RecordingInfo>();
  @Output() recordingStarted = new EventEmitter();

  recording = false;
  playbackUrl: string | null = null;
  playing = false;
  cameraOn = false;
  recorder?: Recorder;
  camera?: Camera;

  constructor(
    private recorderFac: RecordingService,
    private cameraFac: CameraService,
    private preferences: PreferencesService
  ) {}

  ngAfterViewInit(): void {
    this.video.nativeElement.addEventListener('pause', () => {
      this.playing = false;
      console.log('video paused');
    });
    this.video.nativeElement.addEventListener('ended', () => {
      this.playing = false;
      console.log('video ended');
    });
    this.preferences.sizeChange.subscribe((size) => {
      console.log('update size', size);
      this.video.nativeElement.style.width = `${size}px`;
      this.video.nativeElement.style.height = `${size * 0.75}px`;
    });
  }

  toggleCamera(event: MouseEvent) {
    event.stopPropagation();
    if (!this.cameraOn) {
      this.startCamera();
    } else {
      this.stopCamera();
    }
  }

  private async startCamera() {
    this.cameraOn = true;
    this.pauseVideo();
    this.camera = this.cameraFac.getCamera(this.id);
    await this.camera.startCamera();
    this.video.nativeElement.srcObject = this.camera.getStream();
    this.video.nativeElement.muted = true;
  }

  private stopCamera() {
    this.cameraOn = false;
    this.video.nativeElement.srcObject = null;
    this.camera && this.camera.stopCamera();
  }

  toggleRecording(event: MouseEvent) {
    event.stopPropagation();
    if (!this.recording) {
      this.startRecording();
    } else {
      this.stopRecording();
    }
  }

  private startRecording() {
    const stream = this.camera && this.camera.getStream();
    if (stream) {
      this.recorder = this.recorderFac.getRecorder(this.id);
      this.recorder.startNewRecording(stream);
      this.recorder.videoAvailable.subscribe((url) =>
        this.handleRecording(url)
      );
      this.recording = true;
      this.recordingStarted.next();
    }
  }

  private handleRecording(url: string) {
    this.playbackUrl = url;
    this.recordingAvailable.next(
      new RecordingInfo(this.video.nativeElement, url)
    );
  }

  private stopRecording() {
    if (this.recorder) {
      this.recorder.stopRecording();
    }
    this.recording = false;
  }

  togglePlay(event: MouseEvent) {
    event.stopPropagation();
    if (!this.playing) {
      this.playVideo();
    } else {
      this.pauseVideo();
    }
  }

  private playVideo() {
    if (this.cameraOn) this.stopCamera();

    const video = this.video.nativeElement;
    if (video.src !== this.playbackUrl) {
      video.src = this.playbackUrl;
    }

    video.play();
    video.muted = false;

    this.playing = true;
  }

  private pauseVideo() {
    this.video.nativeElement.pause();
    this.playing = false;
  }
}
