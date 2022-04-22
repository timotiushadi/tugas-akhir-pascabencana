<?php
    $koneksi = mysqli_connect("localhost","ius","angelus25","db_disaster");
    if (mysqli_connect_errno()) {
        echo "Koneksi error ke MySQL: " . mysqli_connect_error();
        exit();
      }
?>