<?php
    include 'koneksi.php';
      $regenciesId = 0;

      if(isset($_POST['regen'])){
        $regenciesId = mysqli_real_escape_string($koneksi,$_POST['regen']); // Regency id
      }

      $regencies_array = array();

      if($regenciesId > 0){
          $sql = "SELECT id,name FROM districts WHERE regency_id=".$regenciesId;

          $result = mysqli_query($koneksi,$sql);
          
          while( $row = mysqli_fetch_array($result) ){
              $id = $row['id'];
              $name = $row['name'];
          
              $regencies_array[] = array("id" => $id, "name" => $name);
          }
      }

      // encoding array to json format
      echo json_encode($regencies_array);