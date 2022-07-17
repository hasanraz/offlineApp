import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'offlineApp';
  profiles: any = [];
  offline: boolean;

  ngOnInit() {
   // this.profiles = [];
    window.addEventListener('online',  this.onNetworkStatusChange.bind(this));
    window.addEventListener('offline', this.onNetworkStatusChange.bind(this));
    if (!navigator.onLine) {
      this.profiles = JSON.parse(localStorage.getItem('pendingProfiles'));
      this.offline = !navigator.onLine;
    }
  }

  onNetworkStatusChange(): void {
    this.offline = !navigator.onLine;
    console.log('offline ' + this.offline);
    if (!this.offline) {
      this.profiles = [];
    }
  }

  addProfile() {

    let prof = {
      name: "Sample Profile",
      title: "Sample Job Role",
      detail: "sdjkfhkjsdf sdkfskdhf dsfklhsdkfh sdkfhsdkhf sdkfhksdhf sdkfhkdshf dskfhskdhf sdfkhkdshf sdkfhkdshf"
    }

    if (this.offline) {
      this.profiles.push(prof);
      localStorage.setItem('pendingProfiles', JSON.stringify(this.profiles));
    }

  }

}
