import {Component, OnInit, OnDestroy} from '@angular/core';
import {RaspiService} from './raspi.service';
import {Position} from './position';
import {Status} from './status';
import {Order} from './order';
import {SignalsComponent} from './signals.component';
import * as L from 'leaflet';
//import * as M from 'leaflet.markercluster'
   import 'style-loader!leaflet/dist/leaflet.css';
   import {MesureString} from './mesureString';
   import {Subscription} from "rxjs";
   import {TimerObservable} from "rxjs/observable/TimerObservable";
   import {HttpClientModule} from '@angular/common/http';
@Component({


    selector: 'app-leaflet',
    styleUrls: ['./Maps.component.css'],

     template: `
       <div>
         <div>Usine 4.0 Saint Gobain Sully</div>
         <div>
         <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
         integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
         crossorigin=""/>
      <!-- Déclaration du conteneur de la carte avec l'id "frugalmap" -->
      <div id="frugalmap">

      </div>

         </div>
       </div>
     `, providers: [RaspiService]

})

export class MapsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private sub: Subscription;
  positions: Position;
  selectedPosition: Position;
  status: Status;

    signaux: MesureString[];
     private tick: string;
     constructor(private raspiService: RaspiService) {console.log('Maps')}
   ngOnInit(): void {


    const myfrugalmap = L.map('frugalmap', {minZoom: 19, maxZoom: 28}).setView([47.76105, 2.36758], 18);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map | Saint Gobain Sully'
    }).addTo(myfrugalmap);

var markers ;
markers = new L.LayerGroup().addTo(myfrugalmap);

    let timer = TimerObservable.create(0, 10000);  
  let chemin = [null, null, null, null];
  console.log(chemin);
    this.subscription = timer.subscribe(t => {
    this.raspiService.Localize().subscribe(
      result => { 
        this.positions = result;
       
      })});
      
       this.sub=this.raspiService.Localize().subscribe(
      posiiii => { 
            markers.clearLayers();
            PermuterChemin();
            AffichageChemin();
          });


   // let mar = L.marker([x0 + xpo * px - 0.16 * px, y0 + ypo * py - 0.16 * py], {icon: greenIcon});
    //    let m2=L.marker([x0 + xpo * px - 0.16 * px, y0 + ypo * py - 0.16 * py], {icon: redIcon});
   


    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    const LeafIcon = L.Icon.extend({
      options: {
          shadowUrl: 'http://192.168.4.1/leaf-shadow.png',
          iconSize:     [38, 95],
          shadowSize:   [50, 64],
          iconAnchor:   [22, 94],
          shadowAnchor: [4, 62],
          popupAnchor:  [-3, -76]
      }
  });

  const point = new LeafIcon({iconUrl: 'http://192.168.4.1/point.png'});
  const greenIcon = new LeafIcon({iconUrl: 'http://192.168.4.1/leaf-green.png'}),
      redIcon = new LeafIcon({iconUrl: 'http://192.168.4.1/leaf-red.png'}), //https://leafletjs.com/examples/custom-icons/
      orangeIcon = new LeafIcon({iconUrl: 'http://192.168.4.1/leaf-orange.png'}); //http://192.168.4.1


         // chemin : C:\wamp\www\A
         const imageUrl = 'http://192.168.4.1/abc.jpg';
         const imageBounds =  L.latLngBounds([47.76060, 2.36620], [47.76180, 2.36900]);


      L.imageOverlay(imageUrl, imageBounds).addTo(myfrugalmap);
   

   }

ngOnDestroy() {
    this.subscription.unsubscribe();
    //this.sub.unsubscribe();
  }}


function PermuterChemin(){

let j=0;
while (j<3){
  if(this.chemin[j] != null) {this.chemin[j]=this.chemin[j+1];}
  j++;
}
this.chemin[j]=this.positions;
}
    function AffichageChemin() {
      let x0 = 47.761488100;
      let y0 = 2.367695100;
      let px = 0.0000047816;
      let py = 0.000007895;
      let xpo = this.chemin[3].x;
      let ypo = this.chemin[3].y;
      console.log(this.chemin[3])
      L.marker([x0 + xpo * px - 0.16 * px, y0 + ypo * py - 0.16 * py], {icon: this.greenIcon}).addTo(this.myfrugalmap);
      let k = 0;
         while ( k < 3 ) {
          console.log(this.chemin[k]); // il n'affiche rien
L.marker(this.chemin[k], {icon: this.redIcon}).addTo(this.myfrugalmap);
k++;
    }


  }




