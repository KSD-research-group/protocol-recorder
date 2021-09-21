import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  private createAnchor() {
    const a = document.createElement('a');
    a.setAttribute('style', 'display: none;');
    const body = document.getElementsByTagName('body')[0];
    return a;
  }

  downloadVideo(name: string, localUrl: string) {
    this.download(`${name}.webm`, localUrl);
  }

  downloadJson(name: string, object: any) {
    var dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(object));
    this.download(`${name}.json`, dataStr);
  }

  private download(filename: string, content: string) {
    const a = this.createAnchor();
    a.setAttribute('download', filename);
    a.setAttribute('href', content);
    a.click();
  }
}
