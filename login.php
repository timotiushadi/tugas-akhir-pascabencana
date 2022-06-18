<?php
    session_start();
    require 'koneksi.php';

    if(isset($_POST['login'])){
        $uname = $_POST['username'];
        $katasandi = $_POST['password'];
    
        $result = mysqli_query($koneksi, "SELECT * FROM tb_users WHERE username = '$uname' AND password = '$katasandi'");
        
        if(mysqli_num_rows($result) == 1){  
            
            $_SESSION["login"]=true;
            header("Location: index.php");
            exit();
        }
    
        $error = true;
        if(isset($error)){
            $_SESSION['error'] = 'Incorrect username or password';
            header("Location: index.php");
        };
    }
?>
