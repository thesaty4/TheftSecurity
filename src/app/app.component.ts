import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  latitude = 0;
  longitude = 0;
  error = '';
  private map: any;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit() {
    this.loadGoogleMaps();
    this.trackLocation();
  }

  loadGoogleMaps() {
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(
      script,
      'src',
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDdD53FE2Hj5gSf6tTWlRbmJnpCxe7xHjU&callback=initMap'
    );
    this.renderer.appendChild(this.elementRef.nativeElement, script);
  }

  updateMarker() {
    if (this.map) {
      const marker = new google.maps.Marker({
        position: { lat: this.latitude, lng: this.longitude },
        map: this.map,
        title: 'Current Location',
      });
    }
  }

  trackLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.error = '';
          this.updateMarker();
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              this.error = 'User denied the request for Geolocation.';
              break;
            case error.POSITION_UNAVAILABLE:
              this.error = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              this.error = 'The request to get user location timed out.';
              break;
            default:
              this.error = 'An unknown error occurred.';
          }
        }
      );
    } else {
      this.error = 'Geolocation is not supported by this browser.';
    }
  }

  updateMap() {
    const mapContainer = this.renderer.createElement('div');
    this.renderer.setAttribute(mapContainer, 'id', 'map');
    this.renderer.appendChild(this.elementRef.nativeElement, mapContainer);

    const mapOptions = {
      center: { lat: this.latitude, lng: this.longitude },
      zoom: 14,
    };

    this.map = new google.maps.Map(mapContainer, mapOptions);
  }
}
