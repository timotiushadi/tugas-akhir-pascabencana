<?php
    session_start();
    require 'koneksi.php';

    if(isset($_POST['insert-data'])){
        $eventdate = $_POST['eventdate'];
        $province = $_POST['province'];
        $disastertype = $_POST['disastertype'];
        $regencycity = $_POST['regencycity'];
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
        $operator_id = $_POST['operator_id'];
    
        $result = mysqli_query("INSERT INTO data_disaster (id_logs, eventdate, province, disastertype, regencycity, area, latitude, longitude, weather, chronology, dead, missing, serious_wound, minor_injuries, damage, losses, response, source, status, level, operator_id)
        VALUES(NULL, $eventdate, $province, $disastertype, $regencycity, $area, $latitude, $longitude, $weather, $chronology, $dead, $missing, $serious_wound, $minor_injuries, $damage, $losses, $response, $source, $status, $level, $operatorid)");  

        if($result){  
            echo "<script>
                    setTimeout(function(){
                        alert('Querry Successfully Executed!'); 
                }, 2000)
            </script>";
            header("Location: index.php");
            exit();            
        }
        $error = true;
    }
?>