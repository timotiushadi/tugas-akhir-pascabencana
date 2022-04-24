<?php

  session_start();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard Pemantauan Bencana</title>
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""/>
    <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.Default.css" />
    <link rel="stylesheet" href="./src/styles/style.css">
    <link rel="stylesheet" href="./src/styles/responsive.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
    <link rel="shortcut icon" href="#">
</head>
<body>

  <!-- Top navigation bar -->
  <header class="nav-bar">
    <div class="hamburger-menu">
      <a id="hamburger" class="hamburger-button" href="#" aria-label="navbar">☰</a>
    </div>
    <div class="header-logo">
      <img src="./src/public/image/bpbd-logo.png" alt="Logo BPBD Jatim">
    </div>
    <div class="header-name">
      <h1>Dashboard Pemantauan Pascabencana</h1>
    </div>
    <div class="modal-login" style="<?php 
                                      if(!isset($_SESSION["login"])){
                                        echo 'display:block;';
                                      }
                                      else{
                                        echo 'display:none;';
                                      } 
                                    ?>">
      <button id="show-login">Login</button>
    </div>
    <div class="modal-insert-data" style="<?php 
                                      if(isset($_SESSION["login"])){
                                        echo 'display:block;';
                                      }
                                      else{
                                        echo 'display:none;';
                                      } 
                                    ?>">
      <button id="show-form-insert-data">Tambah Data</button>
    </div>
    <div class="logout" style="<?php 
                                      if(isset($_SESSION["login"])){
                                        echo 'display:block;';
                                      }
                                      else{
                                        echo 'display:none;';
                                      } 
                                    ?>">
      <a href="logout.php"><button id="logout">Logout</button></a>
    </div>
  </header>

  <!-- hamburger-button navigation bar -->
  <div id="sidebar-nav" class="sidebar-nav" >
    <a href="#" class="sidebar-nav-item" id="layer-list">
      <img src="./src/public/image/icons8-home.svg" alt="Home">
      <p>Beranda</p>
    </a>

    <a href="#" class="sidebar-nav-item" id="disaster-list">
      <img src="./src/public/image/statistics.svg" alt="Disaster list">
      <p>Statistik</p>
    </a>

    <a href="#" class="sidebar-nav-item" id="disaster-list">
      <img src="./src/public/image/link.svg" alt="Disaster list">
      <p>Dashboard Pemantuan Bencana</p>
    </a>
  </div>

  <!-- layer list bar -->

  <div id="list-disaster" class="list-disaster">
    <div class="nav-header">Daftar Bencana</div>
    <div id="list-disaster-layer"></div>
  </div>

  <div id="drawer-leftbar" class="drawer-leftbar">
    <div class="nav-header">Jenis Bencana</div>
    <div id="drawer-leftbar-content"></div>

    <!-- <label for="vol">Filter Bencana :</label><br>
    <input type="range" id="slideBencana" name="vol" min="1" max="30"> -->
  </div>

<!-- Disaster detail bar -->
<div id="disaster-detail-container" class="disaster-detail">
  <div class="slide-up-button"><a href="#" id="toggle-disaster-slideup"><img src="./src/public/image/swipe-up.svg" alt=""></a></div>
  <div class="disaster-detail-content">
    <div class="close-container">
      <button id="close-disaster-detail-container" aria-label='Close' type='button' class="close-disaster-detail">X</button>
    </div>
    <div id="disaster" class="disaster"></div>
  </div>
</div>

<!-- Modal Login -->
<div class="popup">
  <div class="close-button">&times;</div>
    <div class="form">
      <form action="login.php" method="POST">
        <h2>Log In</h2>
        <div class="form-element">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Enter Username">
        </div>
        <div class="form-element">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter Password">
          <i class="bi bi-eye-slash" id="togglePassword"></i>
        </div>
        <div class="form-element">
          <input type="checkbox" id="rememberMe">
          <label for="rememberMe">Remember Me</label>
        </div>
        <div class="form-element">
          <button type="submit" name="login">Log In</button>
        </div>
        <div class="form-element">
          <a href="#">Forgot Password</a>
        </div>
      </form>
    </div>
</div>

<!-- Add data Area -->
<div class="popup-insert">
  <div class="close-button-popup-insert">&times;</div>
    <div class="form-insert-data">
      <form action="upload-data.php" method="post">
        <h2>Tambah Data</h2>
        <div class="form-element">
          <label for="eventdate">Date</label>
          <input type="datetime-local" name="eventdate">
        </div>
        <div class="form-element">
          <label for="province">Province</label>
          <input type="text" name="province" value="Jawa Timur">
        </div>
        <div class="form-element">
          <label for="disastertype">Disaster Type</label>
          <select name="disastertype" id="disastertype">
            <option value="Gempa Bumi">Gempa Bumi</option>
            <option value="Letusan Gunung Berapi">Letusan Gunung Berapi</option>
            <option value="Tsunami">Tsunami</option>
            <option value="Tanah Longsor">Tanah Longsor</option>
            <option value="Banjir">Banjir</option>
            <option value="Banjir Bandang">Banjir Bandang</option>
            <option value="Kekeringan">Kekeringan</option>
            <option value="Angin Puting Beliung">Angin Puting Beliung</option>
            <option value="Kebakaran">Kebakaran</option>
            <option value="Kebakaran Hutan">Kebakaran Hutan</option>
            <option value="Gelombang Pasang">Gelombang Pasang</option>
            <option value="Abrasi">Abrasi</option>
            <option value="Kecelakaan Transportasi">Kecelakaan Transportasi</option>
            <option value="Kecelakaan Industri">Kecelakaan Industri</option>
            <option value="Laka Laut">Laka Laut</option>
            <option value="Kejadian Lain">Kejadian Lain</option>
            <option value="Angin Kencang">Angin Kencang</option>
            <option value="Banjir dan Tanah Longsor">Banjir dan Tanah Longsor</option>
            <option value="Banjir Rob">Banjir Rob</option>
            <option value="Gerakan Tanah">Gerakan Tanah</option>
            <option value="Pohon Tumbang">Pohon Tumbang</option>
            <option value="Erosi">Erosi</option>
            <option value="Kebakaran Lahan">Kebakaran Lahan</option>
            <option value="Gunung Api">Gunung Api</option>
          </select>
        </div>
        <div class="form-element">
          <label for="regencycity">Regency City</label>
          <input type="text" name="regencycity" placeholder="Kabupaten/Kota">
        </div>
        <div class="form-element">
          <label for="area">Area</label>
          <input type="text" name="area" placeholder="Detail Area">
        </div>
        <div class="form-element">
          <label for="latitude">Latitude</label>
          <input type="text" name="latitude" placeholder="0.000">
        </div>
        <div class="form-element">
          <label for="longitude">Longitude</label>
          <input type="text" name="longitude" placeholder="0.000">
        </div>
        <div class="form-element">
          <label for="weather">Weather</label>
          <input type="text" name="weather">
        </div>
        <div class="form-element">
          <label for="chronology">Chronology</label>
          <textarea name="chronology"></textarea>
        </div>
        <div class="form-element">
          <label for="dead">Dead</label>
          <input type="number" name="dead" placeholder="0">
        </div>
        <div class="form-element">
          <label for="missing">Missing</label>
          <input type="number" name="missing" placeholder="0">
        </div>
        <div class="form-element">
          <label for="serious_wounds">Serious Wounds</label>
          <input type="number" name="serious_wounds" placeholder="0">
        </div>
        <div class="form-element">
          <label for="minor_injuries">Minor_injuries</label>
          <input type="number" name="minor_injuries" placeholder="0">
        </div>
        <div class="form-element">
          <label for="damage">Damage</label>
          <input type="text" name="damage" placeholder="-">
        </div>
        <div class="form-element">
          <label for="losses">Losses</label>
          <input type="text" name="losses" placeholder="-">
        </div>
        <div class="form-element">
          <label for="response">Response</label>
          <textarea name="response"></textarea>
        </div>
        <div class="form-element">
          <label for="source">Source</label>
          <textarea name="source"></textarea>
        </div>
        <div class="form-element">
          <label for="status">Status</label>
          <select name="status" id="status">
            <option value="SUDAH">SUDAH</option>
            <option value="BELUM">BELUM</option>
          </select>
        </div>
        <div class="form-element">
          <label for="level">Level</label>
          <select name="level" id="level">
            <option value="RENDAH" SELECTED>RENDAH</option>
            <option value="MENENGAH">MENENGAH</option>
            <option value="TINGGI">TINGGI</option>
          </select>
        </div>
        <div class="form-element">
          <button type="submit" name="upload-data">Upload Data</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Filter Button -->
<div class="filter-button-area" id=filter-drawer>
  <button class="filter-button">
    <i class="bi-funnel" id="filter-btn"></i>
</div>

  <!-- Leaflet Map -->
  <main>
    <div id="map"></div>
  </main>

  <div class="chart-canvas">
    <div>
      <canvas id="myChart"></canvas>
    </div>
  </div>

  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
  integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
  crossorigin=""></scr>
  <script src="https://unpkg.com/leaflet.markercluster@1.3.0/dist/leaflet.markercluster.js"></script>
  <script src="app.js" type="module"></script>
</body>
</html>