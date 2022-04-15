<?php
    include 'koneksi.php';

        $uname = $_POST['username'];
        $password = $_POST['password'];
        
        $masuk = "SELECT * FROM `data_login_pegawai` where username='".$uname."' AND password='".$password."' limit 1";
    
        $result = mysqli_query($masuk);
        if(mysqli_num_rows($result)==1){
            echo "You have successfully logged in";
            exit();
        }
        else {
            echo "Something went wrong";
            exit();
        } 
?>