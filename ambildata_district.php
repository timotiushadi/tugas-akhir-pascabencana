<?php
  //   include 'koneksi.php';

  //   $regenciesId = $_POST['regen'];

  //   $sql = "SELECT * FROM districts WHERE regency_id=".$regenciesId;

  //   $result = mysqli_query($koneksi,$sql);

  //   $districts_array = array();

  //   while($row = mysqli_fetch_assoc($districs_data) ){
  //     $districtId = $row['id'];
  //     $district_name = $row['name'];
      
  //     $districts_array[] = array("id"=>$districtId, "name"=>$district_name);
  // }

  echo json_encode($districts_array, JSON_PRETTY_PRINT);

      $regenciesId = 0;

      if(isset($_POST['regen'])){
        $regenciesId = mysqli_real_escape_string($koneksi,$_POST['regen']); // department id
      }
      
      $districts_array = array();
      
      if($regenciesId > 0){
        $sql = "SELECT id,name FROM users WHERE department=".$regenciesId;
      
        $result = mysqli_query($koneksi,$sql);
      
        while( $row = mysqli_fetch_array($result) ){
            $id = $row['id'];
            $name = $row['name'];
      
            $districts_array[] = array("id" => $id, "name" => $name);
        }
      }
      // encoding array to json format
      echo json_encode($users_arr, JSON_PRETTY_PRINT);

?>