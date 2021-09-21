export class CorrelationRecord {
  constructor(
    public tx: number,
    public sx: number,
    public ty: number,
    public sy: number,
    public ey: string
  ) {}
}

export class CorrelationRecorder {
  recording: CorrelationRecord[] = [];
  t0: number = 0;

  constructor(private video: HTMLVideoElement) {}

  start() {
    this.recording = [];
    this.t0 = Date.now();
    this.video.addEventListener('play', () => this.handlePlay());
    this.video.addEventListener('pause', () => this.handlePause());
    this.video.addEventListener('ended', () => this.handleEnded());
  }

  private handlePause() {
    this.recording.push(this.createRecord(0, 'pause'));
  }

  private handleEnded() {
    this.recording.push(this.createRecord(0, 'ended'));
  }

  private handlePlay() {
    this.recording.push(this.createRecord(1, 'play'));
  }

  createRecord(speed: number, eventName: string) {
    return new CorrelationRecord(
      Date.now() - this.t0,
      1,
      this.video.currentTime * 1000, // s to ms
      speed,
      eventName
    );
  }

  stop() {
    // TODO: remove listeners
    return this.recording;
  }
}
