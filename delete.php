<?php
    session_start();
    require 'koneksi.php';

    if(isset($_POST['id'])){
        $id = $_POST['id'];
    
        $result = mysqli_query($koneksi, "SELECT * FROM tb_disasterlogs WHERE id_logs = '$id'");
        $delete = mysqli_query($koneksi, "DELETE FROM tb_disasterlogs WHERE id_logs = '$id'");
        if(mysqli_num_rows($result) == 1){  
            mysqli_query($koneksi,$delete);
            header("Location: index.php");
            exit();
        }
    }
?>
