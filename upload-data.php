<?php
    session_start();
    require 'koneksi.php';

    if(isset($_POST['upload-data'])){
        $eventdate = $_POST['eventdate'];
        $disastertype = $_POST['disastertype'];
        $province = $_POST['province'];
        $regency=$_POST['regency'];
        $area = $_POST['area'];
        $latitude = $_POST['latitude'];
        $longitude = $_POST['longitude'];
        $weather = $_POST['weather'];
        $chronology = $_POST['chronology'];
        $dead = $_POST['dead'];
        $missing = $_POST['missing'];
        $serious_wound = $_POST['serious_wound'];
        $minor_injuries = $_POST['minor_injuries'];
        $damage = $_POST['damage'];
        $losses = $_POST['losses'];
        $response = $_POST['response'];
        $source = $_POST['source'];
        $status = $_POST['status'];
        $level = $_POST['level'];
        $operatorID = $_POST['operatorID'];
    
        $result = "INSERT INTO tb_disasterlogs (id_logs, id_disastertype, eventdate, province, regency, area, latitude, longitude, weather, chronology, dead, missing, serious_wound, minor_injuries, damage, losses, response, photos, source, status, level, operator_id) 
        VALUES ('','$disastertype','$eventdate','$province','$regency','$area','$latitude','$longitude','$weather','$chronology','$dead', '$missing', '$serious_wound', '$minor_injuries', '$damage', '$losses', '$response','', '$source', '$status', '$level', '$operatorID')";  

        $upload = mysqli_query($koneksi, $result);

        if($upload){  
            echo "<script>
                        alert('Querry Successfully Executed!');
                </script>";
            sleep(2);
            header('Location: index.php');
            exit();            
        }
        else{
            die("Error : ".mysqli_error($koneksi));
        }
    }
?>