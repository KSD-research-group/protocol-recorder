import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CorrelationRecord,
  CorrelationRecorder,
} from './correlation-recorder';
import { RecordingInfo } from '../recorder/recorder.component';

export class CorrelatedRecordingInfo {
  constructor(
    public video: HTMLVideoElement,
    public srcUrl: string,
    public correlations: CorrelationRecord[]
  ) {}
}

@Component({
  selector: 'app-retro-recorder',
  templateUrl: './retro-recorder.component.html',
  styleUrls: ['./retro-recorder.component.css'],
})
export class RetroRecorderComponent implements OnInit {
  @Input() recording?: HTMLVideoElement;
  @Output() recordingAvailable = new EventEmitter<CorrelatedRecordingInfo>();

  private corrRecorder?: CorrelationRecorder;

  constructor() {}

  ngOnInit(): void {}

  start() {
    if (this.recording) {
      this.corrRecorder = new CorrelationRecorder(this.recording);
      this.corrRecorder.start();
    }
  }

  stop(recording: RecordingInfo) {
    if (this.corrRecorder) {
      const correlations = this.corrRecorder.stop();
      this.recordingAvailable.next(
        new CorrelatedRecordingInfo(
          recording.video,
          recording.srcUrl,
          correlations
        )
      );
    }
  }
}
