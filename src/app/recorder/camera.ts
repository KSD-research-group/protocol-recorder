export class Camera {
  private cameraStream: MediaStream | null = null;

  async startCamera() {
    this.cameraStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
  }

  stopCamera() {
    if (this.cameraStream) {
      this.cameraStream.getTracks().forEach((track) => track.stop());
      this.cameraStream = null;
    }
  }

  getStream() {
    return this.cameraStream;
  }
}
