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
  // const disasterList = document.querySelector('#disaster-list');
  const listDisaster = document.querySelector('#drawer-leftbar-content');
  const listDisasterLayer = document.querySelector('#list-disaster');
  const filterDrawer = document.querySelector('#filter-drawer');
  const chartCanvas = document.querySelector('#chart-canvas');
  
  // Set Bounds
  var southWest = L.latLng(-10.05574698293434, 109.1537005018748),
  northEast = L.latLng(-4.413385106027282, 116.98480463800202),
  bounds = L.latLngBounds(southWest, northEast);

  // Array disaster / level
  const arrayDisaster =  ["tornado","flood" ,"landslide" ,"earthquake" ,"highsurf" ,"drought" ,"wildfire" ,"incident" , "highwind" ,"volcano"];
  const arrayLevel = ["rendah","sedang","tinggi"];

  const map = L.map('map', {zoomControl: false, attributionControl: false, maxBounds: bounds
  }).setView([-7.89102904, 112.6698802], 8).setZoom(9).setMinZoom(9);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.control.zoom({
    position:'bottomright'
  }).addTo(map);

  map.doubleClickZoom.disable();

  let tornadorendahLayer = L.featureGroup();
  map.addLayer(tornadorendahLayer);
  let tornadosedangLayer = L.featureGroup();
  map.addLayer(tornadosedangLayer);
  let tornadotinggiLayer = L.featureGroup();
  map.addLayer(tornadotinggiLayer);

  let floodrendahLayer = L.featureGroup();
  map.addLayer(floodrendahLayer);
  let floodsedangLayer = L.featureGroup();
  map.addLayer(floodsedangLayer);
  let floodtinggiLayer = L.featureGroup();
  map.addLayer(floodtinggiLayer);

  let landsliderendahLayer = L.featureGroup();
  map.addLayer(landsliderendahLayer);
  let landslidesedangLayer = L.featureGroup();
  map.addLayer(landslidesedangLayer);
  let landslidetinggiLayer = L.featureGroup();
  map.addLayer(landslidetinggiLayer);
  
  let earthquakerendahLayer = L.featureGroup();
  map.addLayer(earthquakerendahLayer);
  let earthquakesedangLayer = L.featureGroup();
  map.addLayer(earthquakesedangLayer);
  let earthquaketinggiLayer = L.featureGroup();
  map.addLayer(earthquaketinggiLayer);

  let tsunamirendahLayer = L.featureGroup();
  map.addLayer(tsunamirendahLayer);
  let tsunamisedangLayer = L.featureGroup();
  map.addLayer(tsunamisedangLayer);
  let tsunamitinggiLayer = L.featureGroup();
  map.addLayer(tsunamitinggiLayer);

  let highsurfrendahLayer = L.featureGroup();
  map.addLayer(highsurfrendahLayer);
  let highsurfsedangLayer = L.featureGroup();
  map.addLayer(highsurfsedangLayer);
  let highsurftinggiLayer = L.featureGroup();
  map.addLayer(highsurftinggiLayer);

  let droughtrendahLayer = L.featureGroup();
  map.addLayer(droughtrendahLayer);
  let droughtsedangLayer = L.featureGroup();
  map.addLayer(droughtsedangLayer);
  let droughttinggiLayer = L.featureGroup();
  map.addLayer(droughttinggiLayer);

  let wildfirerendahLayer = L.featureGroup();
  map.addLayer(wildfirerendahLayer);
  let wildfiresedangLayer = L.featureGroup();
  map.addLayer(wildfiresedangLayer);
  let wildfiretinggiLayer = L.featureGroup();
  map.addLayer(wildfiretinggiLayer);

  let incidentrendahLayer = L.featureGroup();
  map.addLayer(incidentrendahLayer);
  let incidentsedangLayer = L.featureGroup();
  map.addLayer(incidentsedangLayer);
  let incidenttinggiLayer = L.featureGroup();
  map.addLayer(incidenttinggiLayer);

  let volcanorendahLayer = L.featureGroup();
  map.addLayer(volcanorendahLayer);
  let volcanosedangLayer = L.featureGroup();
  map.addLayer(volcanosedangLayer);
  let volcanotinggiLayer = L.featureGroup();
  map.addLayer(volcanotinggiLayer);

  let highwindrendahLayer = L.featureGroup();
  map.addLayer(highwindrendahLayer);
  let highwindsedangLayer = L.featureGroup();
  map.addLayer(highwindsedangLayer);
  let highwindtinggiLayer = L.featureGroup();
  map.addLayer(highwindtinggiLayer);

  let firstTime = true;

  let checkBoxDisaster = document.getElementsByClassName("nav-item");
  for (var i = 0; i < checkBoxDisaster.length; ++i) {
    let getId = checkBoxDisaster[i].childNodes[3].control;
    console.log(getId);
  }

  async function getData() {
    const disaster = await DisasterData.getAllDisaster();
    return disaster;
  }

  map.on('click', function(e) {
    swal.fire({
      title: 'Get Coordinate',
      text: "Latitude : " + e.latlng.lat.toFixed(3) + " Longitude : " + e.latlng.lng.toFixed(3),
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Copy to clipboard'
    }).then((result) => {
      if (result.isConfirmed) {
        copyText(e.latlng.lat.toFixed(3),e.latlng.lng.toFixed(3));
        Swal.fire(
          'Copied to Clipboard',
          "<h3 id='copyText'>Latitude : " + e.latlng.lat.toFixed(3) + "<br>Longitude :  " + e.latlng.lng.toFixed(3) +"</h3>",
          'success'
        )
      }
    })
  });

  function updateMarker() {
    getData().then((disaster) => {
      if(!firstTime) {
        disaster.forEach((item) => {
          let layerRendah = item.typeid.toLowerCase() + 'rendahLayer';
          eval(layerRendah).clearLayers();
          let layerSedang = item.typeid.toLowerCase() + 'sedangLayer';
          eval(layerSedang).clearLayers();
          let layer = item.typeid.toLowerCase() + 'tinggiLayer';
          eval(layer).clearLayers();
        });
      }
      showMarker(map, disaster);
      detailButtonClicked(map,disaster);
      deleteButtonClicked(map,disaster);
      updateButtonClicked(map,disaster);
      LeftBar.showDisasterList(disaster);
      LeftBar.showDisasterCheckbox();
      LeftBar.showLevelCheckbox();
      checkboxDisaster();
      checkboxLevelDisaster();
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
      let Cluster;
      if(disasterMarker.level == "RENDAH"){
        Cluster = disasterMarker.typeid.toLowerCase() + disasterMarker.level.toLowerCase() +"Layer";
      }
      else if(disasterMarker.level == "SEDANG"){
        Cluster = disasterMarker.typeid.toLowerCase() + disasterMarker.level.toLowerCase() +"Layer";
      }
      else if(disaster.level == "TINGGI"){
        Cluster = disasterMarker.typeid.toLowerCase() + disasterMarker.level.toLowerCase() +"Layer" ;
      }

      let MarkerCluster = eval(Cluster);
      
      let marker = L.marker(disasterMarker.pos, {
            icon: L.icon({
                iconUrl: disasterMarker.iconUrl,
                iconSize: [25, 25],
                iconAnchor: [15, 1]
            }),
            draggable:true
        }).addTo(MarkerCluster),
        popUp = new L.Popup({ autoClose: true, closeOnClick: false })
                .setContent(disasterMarker.popup)
                .setLatLng(disasterMarker.pos);
        map.addLayer(marker);
        marker.bindPopup(popUp);
        marker.dragging.disable();
    });
  }

  function deleteRow(id){
    swal.fire({
      title: 'Are u sure?',
      text: "IDLogs "+id+" akan terhapus",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "I'm sure"
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        $.ajax({
          type:'GET',
          url: '../tugas-akhir-pascabencana/delete.php',
          dataType: "html",
          data:{data:id},
          success: function(){
            swal.fire(
              'Deleted Data',
              "Log ID " + id +  " Terhapus",
              'success'
            );
            setTimeout(function(){
              location.reload();
            }, 1500)
          }
        });
      }
      else{
        swal.fire("Hapus data gagal")
      }
    }) 
  }

  function updateStatus(id, value){
    console.log(id, value);
    if(value == "SELESAI"){
      value = "BELUM";
    }
    else{
      value = "SELESAI";
    }
    swal.fire({
      title: 'Changing Status',
      text: "Status IDLogs "+id+" akan diubah",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "I'm sure"
    })
    .then((willUpdate) => {
      if (willUpdate.isConfirmed) {
        
        $.ajax({
          type:'GET',
          url: '../tugas-akhir-pascabencana/edit-status.php',
          dataType: "html",
          data:{id:id, status:value},
          success: function(){
            swal.fire(
              'Updated Data',
              "Log ID " + id +  " Terubah",
              'success');
            setTimeout(function(){
              location.reload();
            }, 1500)
          }
        });
      } else {
        swal.fire("Ubah data gagal");
      }
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

  function deleteButtonClicked(map, disaster) {
    map.on('popupopen', function() {
      let button = document.querySelectorAll('.popup-disaster-delete-button');
      disaster.forEach((marker, i) => {
      
        let getButtonId = '#delete-button-' + marker.id_logs;
        let popUpOpen = document.querySelector(`${getButtonId}`);
        if(popUpOpen != null) {
          popUpOpen.addEventListener('click', function () {
            RightBar.setDetail(marker);
            for(let i =0; i <button.length; i++){
              deleteRow(marker.id_logs);
              button[i].classList.remove('active');
            }
            popUpOpen.classList.add('active');
          });
        }
      });
    });
  }

  function updateButtonClicked(map, disaster) {
    map.on('popupopen', function() {
      let x;
      let button = document.querySelectorAll('.popup-disaster-update-button');
      disaster.forEach((marker, i) => {     
        let getButtonId = '#update-button-' + marker.id_logs;
        let popUpOpen = document.querySelector(`${getButtonId}`);
        if(popUpOpen != null) {
          popUpOpen.addEventListener('click', function () {
            RightBar.setDetail(marker);
            for(let i =0; i <button.length; i++){
              updateStatus(marker.id_logs, marker.status);
              button[i].classList.remove('active');
            }
            popUpOpen.classList.add('active');
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
          arrayLevel.forEach((level) => {
            map.removeLayer(eval(getId.id+level+"Layer"));
          });
          arrayDisaster.splice(arrayDisaster.findIndex((arrayDisaster) => arrayDisaster === getId.id), 1);
        } else {
          arrayLevel.forEach((level) => {
            map.addLayer(eval(getId.id+level+"Layer"));
          });
          arrayDisaster.push(getId.id);
        }
      });
    }
  }

  function checkboxLevelDisaster() {
    let checkboxLevelDisaster = document.getElementsByClassName("nav-item-level");
    for (var i = 0; i < checkboxLevelDisaster.length; ++i) {
      let getLevel = checkboxLevelDisaster[i].childNodes[3].control;
      getLevel.addEventListener('click', function() {
        if (!this.checked) {
          arrayDisaster.forEach((disaster) => {
            map.removeLayer(eval(disaster+getLevel.id+"Layer"));
          });
          arrayLevel.splice(arrayLevel.findIndex((arrayLevel) => arrayLevel === getLevel.id), 1);
        } else {
          arrayDisaster.forEach((disaster) => {
            map.addLayer(eval(disaster+getLevel.id+"Layer"));
          });
          arrayLevel.push(getLevel.id);
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

  // filterDrawer.addEventListener('click', function (event) {
  //   if(listDisasterLayer.classList.contains('list-disaster-open')){
  //     listDisasterLayer.classList.toggle('list-disaster-open');
  //     disasterList.classList.remove('sidebar-nav-item-active')
  //   }
  //   drawerLeftBar.classList.toggle('leftbar-open');
  //   layerList.classList.toggle('sidebar-nav-item-active')
  //   event.stopPropagation();
  // });

  // filterDrawer.addEventListener('click', function (event) {
  //   if(drawerLeftBar.classList.contains('leftbar-open')){
  //     drawerLeftBar.classList.toggle('leftbar-open');
  //     layerList.classList.remove('sidebar-nav-item-active')
  //   }
  //   listDisasterLayer.classList.toggle('list-disaster-open');
  //   disasterList.classList.toggle('sidebar-nav-item-active')
  //   event.stopPropagation();
  // });

  filterDrawer.addEventListener('click', function(event) {
    if(listDisasterLayer.classList.contains('list-disaster-open') && drawerLeftBar.classList.contains('leftbar-open')){
      // listDisasterLayer.classList.toggle('list-disaster-open');
      drawerLeftBar.classList.toggle('leftbar-open');
    }
    // listDisasterLayer.classList.toggle('list-disaster-open');
    drawerLeftBar.classList.toggle('leftbar-open');
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

}

document.querySelector("#show-login").addEventListener("click", function(event) {
  document.querySelector(".popup").classList.add("active");
});

document.querySelector(".popup .close-button").addEventListener("click", function(event) {
  document.querySelector(".popup").classList.remove("active");
})

document.querySelector("#show-form-insert-data").addEventListener("click", function(event) {
  document.querySelector(".popup-insert").classList.add("active");
});

document.querySelector(".popup-insert .close-button-popup-insert").addEventListener("click", function(event) {
  document.querySelector(".popup-insert").classList.remove("active");
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

function copyText(x,y) {
  navigator.clipboard.writeText(x +" , "+ y);
} 

export default main;