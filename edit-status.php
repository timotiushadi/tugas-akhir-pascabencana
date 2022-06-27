<?php
    require 'koneksi.php';

    $id = $_POST['id'];
    $status = $_POST['status'];

    $result = "UPDATE tb_disasterlogs SET status = '$status' WHERE id_logs = '$id'";  

    $upload = mysqli_query($koneksi, $result);

    if($upload){
        sleep(2);
        header('Location: index.php');
        exit();            
    }
    else{
        die("Error : ".mysqli_error($koneksi));
    }
?>