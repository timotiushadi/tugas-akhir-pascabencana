<?php
    session_start();
    require 'koneksi.php';

    if(isset($_POST['login'])){
        $uname = $_POST['username'];
        $katasandi = $_POST['password'];
    
        $result = mysqli_query($koneksi, "SELECT * FROM data_login_pegawai WHERE username = '$uname' AND password = '$katasandi'");
        
        if(mysqli_num_rows($result) == 1){  
            
            $_SESSION["login"]=true;
            header("Location: index.php");
            exit();
        }
    
        $error = true;
    }
?>
