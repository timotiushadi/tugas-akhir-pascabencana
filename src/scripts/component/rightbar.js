class RightBar {
  static setDetailBar(marker, disasterMarker){
    const disasterDetail = document.querySelector('#disaster');
    let eventDate = disasterMarker.eventdate.split(" ");
    let disasterLevel = disasterMarker.level.charAt(0).toUpperCase() + disasterMarker.level.slice(1).toLowerCase();
    marker.addEventListener('click', function(event) {
      disasterDetail.innerHTML = `
          <div class="disaster-detail-logo">
            <img src="./src/public/image/disaster-icon/${disasterMarker.typeid}.svg" alt="Logo Bencana">
          </div>
          <h2 class="disaster-header">${disasterMarker.disastertype}</h2>
          <div class="disaster-detail-status-container disaster-detail-item">
            <h3>Status</h3>
            <div class="disaster-detail-status" style="background-color:${disasterMarker.status == "BELUM" ? 'red' : 'green'};">
            ${disasterMarker.status}
            </div>
          </div>
          <div class="disaster-time">
            <p><strong>${eventDate[0]}</strong></p>
            <p>${eventDate[1]}</p>
          </div>
          <div class="disaster-detail-item">
            <h3>Lokasi</h3>
            <p><strong>Area : </strong>${disasterMarker.area}</p>
            <p><strong>Kota : </strong>${disasterMarker.regency_city.split(' ').reverse().join(' ')}</p>
            <p><strong>Provinsi : </strong>Jawa Timur</p>
          </div>
          <div class="disaster-detail-item">
            <h3>Kerusakan</h3>
            <p><strong>Level         : </strong>Level ${disasterLevel}</p>
            <p><strong>Kerusakan     : </strong>${disasterMarker.damage}</p>
            <p><strong>Luka Ringan   : </strong>${disasterMarker.minor_injuries}</p>
            <p><strong>Luka Serius   : </strong>${disasterMarker.serious_wound}</p>
            <p><strong>Korban Jiwa   : </strong>${disasterMarker.losses}</p>
            <p><strong>Korban Hilang : </strong>${disasterMarker.missing}</p>
          </div>
          <div class="disaster-detail-item">
            <h3>Kronologi</h3>
            <p>${disasterMarker.chronology}</p>
          </div>
          <div class="disaster-detail-item">
            <h3>Respon</h3>
            <p>${disasterMarker.response}</p>
          </div>
      `;
    });
  }

  static setDetail(disasterMarker){
    const disasterDetail = document.querySelector('#disaster');
    let eventDate = disasterMarker.eventdate.split(" ");
    let disasterLevel = disasterMarker.level.charAt(0).toUpperCase() + disasterMarker.level.slice(1).toLowerCase();
    // if(disasterMarker.status == "SUDAH"){
      disasterDetail.innerHTML = `
          <div class="disaster-detail-logo">
            <img src="./src/public/image/disaster-icon/${disasterMarker.typeid}.svg" alt="Logo Bencana">
          </div>
          <h2 class="disaster-header">${disasterMarker.disastertype}</h2>
          <div class="disaster-detail-status-container disaster-detail-item">
            <h3>Status</h3>
            <div class="disaster-detail-status" style="background-color:${disasterMarker.status == "BELUM" ? 'red' : 'green'};">
            ${disasterMarker.status}
            </div>
            <h3>Level</h3>
            <div class="disaster-detail-status" style="background-color:${disasterLevel == "TINGGI" ? 'red' : "SEDANG" ? 'rgb(255, 165, 0)' : 'green'};">
            ${disasterLevel}
            </div>
          </div>
          <div class="disaster-time">
            <p><strong>${eventDate[0]}</strong></p>
            <p>${eventDate[1]}</p>
          </div>
          <div class="disaster-detail-item">
            <h3>Lokasi</h3>
            <p><strong>Area : </strong>${disasterMarker.area}</p>
            <p><strong>Kota : </strong>${disasterMarker.regency_city.split(' ').reverse().join(' ')}</p>
            <p><strong>Provinsi : </strong>Jawa Timur</p>
          </div>
          <div class="disaster-detail-item">
            <h3>Kerusakan</h3>
            <p><strong>Level         : </strong>Level ${disasterLevel}</p>
            <p><strong>Kerusakan     : </strong>${disasterMarker.damage}</p>
            <p><strong>Luka Ringan   : </strong>${disasterMarker.minor_injuries}</p>
            <p><strong>Luka Serius   : </strong>${disasterMarker.serious_wound}</p>
            <p><strong>Korban Jiwa   : </strong>${disasterMarker.losses}</p>
            <p><strong>Korban Hilang : </strong>${disasterMarker.missing}</p>
          </div>
          <div class="disaster-detail-item">
            <h3>Kronologi</h3>
            <p>${disasterMarker.chronology}</p>
          </div>
          <div class="disaster-detail-item">
            <h3>Respon</h3>
            <p>${disasterMarker.response}</p>
          </div>
          <div class="disaster-detail-item">
            <button type="button" class="popup-disaster-detail-button" id="sudahButton"">
              Ganti status ke Belum
            </button>
          </div>
      `;
      
    // }
    // else if (disasterMarker.status == "BELUM"){
    //   disasterDetail.innerHTML = `
    //       <div class="disaster-detail-logo">
    //         <img src="./src/public/image/disaster-icon/${disasterMarker.typeid}.svg" alt="Logo Bencana">
    //       </div>
    //       <h2 class="disaster-header">${disasterMarker.disastertype}</h2>
    //       <div class="disaster-detail-status-container disaster-detail-item">
    //         <h3>Status</h3>
    //         <div class="disaster-detail-status" style="background-color:${disasterMarker.status == "BELUM" ? 'red' : 'green'};">
    //         ${disasterMarker.status}
    //         </div>
    //         <h3>Level</h3>
    //         <div class="disaster-detail-status" style="background-color:${disasterLevel == "TINGGI" ? 'red' : "SEDANG" ? 'rgb(255, 165, 0)' : 'green'};">
    //         ${disasterLevel}
    //         </div>
    //       </div>
    //       <div class="disaster-time">
    //         <p><strong>${eventDate[0]}</strong></p>
    //         <p>${eventDate[1]}</p>
    //       </div>
    //       <div class="disaster-detail-item">
    //         <h3>Lokasi</h3>
    //         <p><strong>Area : </strong>${disasterMarker.area}</p>
    //         <p><strong>Kota : </strong>${disasterMarker.regency_city.split(' ').reverse().join(' ')}</p>
    //         <p><strong>Provinsi : </strong>Jawa Timur</p>
    //       </div>
    //       <div class="disaster-detail-item">
    //         <h3>Kerusakan</h3>
    //         <p><strong>Level         : </strong>Level ${disasterLevel}</p>
    //         <p><strong>Kerusakan     : </strong>${disasterMarker.damage}</p>
    //         <p><strong>Luka Ringan   : </strong>${disasterMarker.minor_injuries}</p>
    //         <p><strong>Luka Serius   : </strong>${disasterMarker.serious_wound}</p>
    //         <p><strong>Korban Jiwa   : </strong>${disasterMarker.losses}</p>
    //         <p><strong>Korban Hilang : </strong>${disasterMarker.missing}</p>
    //       </div>
    //       <div class="disaster-detail-item">
    //         <h3>Kronologi</h3>
    //         <p>${disasterMarker.chronology}</p>
    //       </div>
    //       <div class="disaster-detail-item">
    //         <h3>Respon</h3>
    //         <p>${disasterMarker.response}</p>
    //       </div>
    //       <div class="disaster-detail-item style="<?php 
    //                                                 if(isset($_SESSION["login"])){
    //                                                   echo 'display:block;';
    //                                                 }
    //                                                 else{
    //                                                   echo 'display:none;';
    //                                                 } 
    //                                               ?>">
    //         <button type="button" class="popup-disaster-update-button" id="sudahButton"">
    //           Ganti Status ke Sudah
    //         </button>
    //       </div>
    //   `;
    // };

    $('#sudahButton').click(function() {
      $.ajax({
        type: "POST",
        url: "../../../edit-status.php",
        data: {id:disasterMarker.id, status:"SUDAH"},
        success: function(response) {
          swal("Change Success", "Data has been changed!", "success");
        }
      })
    });

    // $('#belumButton').click(function() {
    //   $.ajax({
    //     type: "POST",
    //     url: "../../../edit-status.php",
    //     data: {id:disasterMarker.id, status:"BELUM"},
    //     success: function(response) {
    //       swal("Change Success", "Data has been changed!", "success");
    //     }
    //   })
    // });
  }
}

export default RightBar;