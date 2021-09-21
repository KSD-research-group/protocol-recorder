import { AfterViewInit, Component } from '@angular/core';
import { DownloadService } from './download.service';
import { NameFormComponent } from './name-form/name-form.component';
import { RecordingInfo } from './recorder/recorder.component';
import { CorrelatedRecordingInfo } from './retro-recorder/retro-recorder.component';
import { MatDialog } from '@angular/material/dialog';
import { PreferencesService } from './preferences/preferences.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  firstRecording?: RecordingInfo;

  constructor(
    private downloader: DownloadService,
    private dialog: MatDialog,
    private prefs: PreferencesService
  ) {}

  ngAfterViewInit() {
    this.openNameForm();
  }

  handleFirstRecording(recording: RecordingInfo) {
    this.firstRecording = recording;
  }

  handleSecondRecording(recording: CorrelatedRecordingInfo) {
    const sessionName = this.prefs.getName();
    if (this.firstRecording) {
      this.downloader.downloadJson(
        `${sessionName}-correlations`,
        recording.correlations
      );
      this.downloader.downloadVideo(
        `${sessionName}-sketching`,
        this.firstRecording.srcUrl
      );
      this.downloader.downloadVideo(
        `${sessionName}-retrospective`,
        recording.srcUrl
      );
    }
  }

  openNameForm() {
    const dialogRef = this.dialog.open(NameFormComponent, {
      restoreFocus: false,
      disableClose: true
    });
  }
}
