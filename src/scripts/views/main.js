import DisasterData from "../data/disaster-data.js";
import LeftBar from "../component/leftbar.js";
import RightBar from "../component/rightbar.js";

const main = () => {
  const main = document.querySelector('main');
  const disasterDetail = document.querySelector('#disaster');
  const hamburgerButton = document.querySelector('#hamburger');
  const drawerLeftBar = document.querySelector('#drawer-leftbar');
  const closeButton = document.querySelector('#close-disaster-detail-container');
  const sideBarNav = document.querySelector('#sidebar-nav');
  const layerList = document.querySelector('#layer-list');
  const disasterList = document.querySelector('#disaster-list');
  const listDisaster = document.querySelector('#drawer-leftbar-content');
  const listDisasterLayer = document.querySelector('#list-disaster');
  
  // Set Bounds
  var southWest = L.latLng(-8.83378746919662, 109.94008798843964),
  northEast = L.latLng(-6.197166277748323, 115.35535361833975),
  bounds = L.latLngBounds(southWest, northEast);

  const map = L.map('map', {zoomControl: false, attributionControl: false, maxBounds: bounds
  }).setView([-7.646919, 112.899925], 8).setZoom(9).setMinZoom(9);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.control.zoom({
    position:'bottomright'
  }).addTo(map);

  map.doubleClickZoom.disable();
  // markerClusterGroup
  //featureGroup
  let tornadoLayer = L.featureGroup();
  map.addLayer(tornadoLayer);
  let floodLayer = L.featureGroup();
  map.addLayer(floodLayer);
  let landslideLayer = L.featureGroup();
  map.addLayer(landslideLayer);
  let earthquakeLayer = L.featureGroup();
  map.addLayer(earthquakeLayer);
  let tsunamiLayer = L.featureGroup();
  map.addLayer(tsunamiLayer);
  let highsurfLayer = L.featureGroup();
  map.addLayer(highsurfLayer);
  let droughtLayer = L.featureGroup();
  map.addLayer(droughtLayer);
  let wildfireLayer = L.featureGroup();
  map.addLayer(wildfireLayer);
  let incidentLayer = L.featureGroup();
  map.addLayer(incidentLayer);
  let volcanoLayer = L.featureGroup();
  map.addLayer(volcanoLayer);
  let highwindLayer = L.featureGroup();
  map.addLayer(highwindLayer);

  let firstTime = true;

  async function getData() {
    const disaster = await DisasterData.getAllDisaster();
    return disaster;
  }

  function updateMarker() {
    getData().then((disaster) => {
      if(!firstTime) {
        disaster.forEach((item) => {
          let layer = item.typeid.toLowerCase() + 'Layer';
          eval(layer).clearLayers();
        });
      }
      showMarker(map, disaster);
      detailButtonClicked(map,disaster);
      LeftBar.showDisasterList(disaster);
      LeftBar.showDisasterCheckbox();
      checkboxDisaster();
    });
    firstTime = false;
  }

  updateMarker();
  setInterval(updateMarker, setDelay(30));

  function setDelay(minute) {
    return minute * 60000;
  }

  //show marker
  function showMarker(map, disaster){
    disaster.forEach((disasterMarker) => {
      let MarkerCluster = eval(disasterMarker.typeid.toLowerCase() + "Layer" );
      let marker = L.marker(disasterMarker.pos, {
            icon: L.icon({
                iconUrl: disasterMarker.iconUrl,
                iconSize: [25, 25],
                iconAnchor: [15, 1]
            }),
            draggable:true
        }).addTo(MarkerCluster),
        popUp = new L.Popup({ autoClose: false, closeOnClick: false })
                .setContent(disasterMarker.popup)
                .setLatLng(disasterMarker.pos);
        map.addLayer(marker);
        marker.bindPopup(popUp);
        marker.dragging.disable();
    });
  }


  //detail button event
  function detailButtonClicked(map, disaster) {
    map.on('popupopen', function() {
      let button = document.querySelectorAll('.popup-disaster-detail-button');
      disaster.forEach((marker, i) => {
        let getButtonId = '#detail-button-' + marker.id_logs;
        let popUpOpen = document.querySelector(`${getButtonId}`);
        let disasterDetailContainer = document.querySelector('#disaster-detail-container');
        if(popUpOpen != null) {
          popUpOpen.addEventListener('click', function () {
            RightBar.setDetail(marker);
            for(let i =0; i <button.length; i++){
              button[i].classList.remove('active');
            }
            popUpOpen.classList.add('active');
            if(!disasterDetailContainer.classList.contains('disaster-open')){
              disasterDetailContainer.classList.toggle('disaster-open');
             }
          });
        }
      });
    });
  }

  // Memunculkan icon sesuai checkbox
  function checkboxDisaster() {
    let checkBoxDisaster = document.getElementsByClassName("nav-item");
    for (var i = 0; i < checkBoxDisaster.length; ++i) {
      let getId = checkBoxDisaster[i].childNodes[3].control;
      getId.addEventListener('click', function() {
        if (!this.checked) {
          map.removeLayer(eval(getId.id));
        } else {
          map.addLayer(eval(getId.id));
        }
      });
    }
  }

  hamburgerButton.addEventListener('click', function (event) {
    sideBarNav.classList.toggle('sidebar-nav-open');
    if(drawerLeftBar.classList.contains('leftbar-open')) {
      drawerLeftBar.classList.toggle('leftbar-open');
    }
    if(listDisasterLayer.classList.contains('list-disaster-open')) {
      listDisasterLayer.classList.toggle('list-disaster-open');
    }
    event.stopPropagation();
  });

  layerList.addEventListener('click', function (event) {
    if(listDisasterLayer.classList.contains('list-disaster-open')){
      listDisasterLayer.classList.toggle('list-disaster-open');
      disasterList.classList.remove('sidebar-nav-item-active')
    }
    drawerLeftBar.classList.toggle('leftbar-open');
    layerList.classList.toggle('sidebar-nav-item-active')
    event.stopPropagation();
  });

  disasterList.addEventListener('click', function (event) {
    if(drawerLeftBar.classList.contains('leftbar-open')){
      drawerLeftBar.classList.toggle('leftbar-open');
      layerList.classList.remove('sidebar-nav-item-active')
    }
    listDisasterLayer.classList.toggle('list-disaster-open');
    disasterList.classList.toggle('sidebar-nav-item-active')
    event.stopPropagation();
  });


  // main.addEventListener('click', function (event) {
  //   const disasterDetailContainer = document.querySelector('#disaster-detail');
  //   if (disasterDetailContainer.classList.contains('disaster-open')) {
  //     disasterDetailContainer.classList.remove('disaster-open');
  //   }
  //   if (sideBarNav.classList.contains('sidebar-nav-open')) {
  //     sideBarNav.classList.remove('sidebar-nav-open');
  //     drawerLeftBar.classList.remove('leftbar-open');
  //     listDisasterLayer.classList.remove('list-disaster-open');
  //   }
  //   event.stopPropagation();
  // });

  closeButton.addEventListener('click', function (event) {
  const disasterDetailContainer = document.querySelector('#disaster-detail-container');
    disasterDetailContainer.classList.remove('disaster-open');
    disasterDetailContainer.classList.remove('slide-up');
    event.stopPropagation();
  });

  const disasterSlideup = document.querySelector('#toggle-disaster-slideup');
  disasterSlideup.addEventListener('click', function(event){
    const disasterDetailContainer = document.querySelector('#disaster-detail-container');
    disasterDetailContainer.classList.toggle('slide-up');
    event.stopPropagation();
  });

//   var values = [1, 3, 20, 7, 30];
// // $('#slider1').on('input', e => $('span').text(values[e.target.value]));
// const slideButton = document.querySelector('#slideBencana');
// slideButton.addEventListener("change", function(event) {
//   // console.log(event.target.value);
//   console.log(values[event.target.name]);

// });

}

document.querySelector("#show-login").addEventListener("click", function(event) {
  document.querySelector(".popup").classList.add("active");
});

document.querySelector(".popup .close-button").addEventListener("click", function(event) {
  document.querySelector(".popup").classList.remove("active");
})

const togglePassword = document.querySelector("#togglePassword");
        const password = document.querySelector("#password");

togglePassword.addEventListener("click", function () {
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    
    // toggle the icon
    this.classList.toggle("bi-eye");
});

// prevent form submit
const form = document.querySelector("form");
form.addEventListener('submit', function (e) {
    e.preventDefault();
});

export default main;
/*
  Jenis Bencana :
  typeid /disastertype

  TORNADO / Angin Puting Beliung
  FLOOD / Banjir
  LANDSLIDE / Tanah Longsor
  EARTHQUAKE / Gempa Bumi
  TSUNAMI / Tsunami
  HIGHSURF / Gelombang Tinggi
  DROUGHT / Kekeringan
  WILDFIRE / Kebakaran Hutan
  INCIDENT / Kejadian Lain
  VOLCANO / Letusan Gunung Api
  HIGHWIND / Angin Kencang

*/