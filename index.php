<?php
    include 'koneksi.php';
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
</head>
<body>

  <!-- Top navigation bar -->
  <header class="nav-bar">
    <div class="hamburger-menu">
      <a id="hamburger" class="hamburger-button" href="#" aria-label="navbar">☰</a>
    </div>
    <div class="header-logo">
      <img src="./src/public/image/bpbd-logo.png" alt="Logo BPBD J atim">
    </div>
    <div class="header-name">
      <h1>Dashboard Pemantauan Pascabencana</h1>
    </div>
    <div class="modal-login">
      <button id="show-login">Login</button>
    </div>
  </header>

  <!-- hamburger-button navigation bar -->
  <div id="sidebar-nav" class="sidebar-nav" >
    <a href="#" class="sidebar-nav-item" id="layer-list">
      <img src="./src/public/image/layers.svg" alt="Map Layer">
      <p>Beranda</p>
    </a>

    <a href="./statistik.html" class="sidebar-nav-item" id="disaster-list">
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
      <form class="form-input" action="kirim.php" method="POST">
        <h2>Log In</h2>
        <div class="form-element">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Enter Username">
        </div>
        <div class="form-element">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter Password">
        </div>
        <div class="form-element">
          <input type="checkbox" id="rememberMe">
          <label for="rememberMe">Remember Me</label>
        </div>
        <div class="form-element">
          <button>Sign in</button>
        </div>
        <div class="form-element">
          <a href="#">Forgot Password</a>
        </div>
      </form>
    </div>
</div>

<!-- Filter Button -->
<div>
  <button class="filter-button">
</div>

  <!-- Leaflet Map -->
  <main>
    <div id="map"></div>
  </main>


  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
  integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
  crossorigin=""></script>
  <script src="https://unpkg.com/leaflet.markercluster@1.3.0/dist/leaflet.markercluster.js"></script>
  <script src="app.js" type="module"></script>
</body>
</html>