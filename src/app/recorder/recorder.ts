import { Subject } from 'rxjs';

export class Recorder {
  private recording: Blob[] = [];
  private mediaRecorder?: MediaRecorder;
  videoAvailable = new Subject<string>();

  constructor() {

  }

  startNewRecording(videoStream: MediaStream) {
    this.mediaRecorder = new MediaRecorder(videoStream, {
      videoBitsPerSecond : 2500000,
      mimeType: 'video/webm',
    });

    this.mediaRecorder.addEventListener('dataavailable', (e: any) =>
      this.handleStreamData(e)
    );

    this.mediaRecorder.addEventListener('stop', () =>
      this.createVideoFromStreamData()
    );
    this.recording = []; // Empty blob buffer
    this.mediaRecorder.start(1000);
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
    }
  }

  private handleStreamData(e: any) {
    this.recording.push(e.data);
  }

  private createVideoFromStreamData() {
    const url = URL.createObjectURL(
      new Blob(this.recording, { type: 'video/webm' })
    );
    this.videoAvailable.next(url);
  }
}
