<?php
header("Refresh:0");
    session_start();
    require './koneksi.php';
    $id = intval($_GET['data']);
    $delete = mysqli_query($koneksi, "DELETE FROM tb_disasterlogs WHERE id_logs = $id");

    if ($koneksi->query($delete) === TRUE) {
        echo "Record deleted successfully";
        header("Location: index.php");
            exit();
    } else {
    echo "Error deleting record: " . $koneksi->error;
    }

?>
