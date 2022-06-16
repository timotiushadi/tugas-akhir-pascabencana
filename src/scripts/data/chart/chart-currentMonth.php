<?php 
    include '../../../../koneksi.php';

    $sql = "SELECT disastertype, 
    COUNT(*) AS disastertype_total 
    FROM v_disasterlogs_all 
    WHERE MONTH(eventdate) = MONTH(CURRENT_TIMESTAMP) 
    GROUP BY MONTH(eventdate), disastertype";
    
    $response = mysqli_query($koneksi, $sql);
    if ( mysqli_num_rows($response) > 0) {

        $disasterData =array();
        // $disastertype = array();
        // $disastertype_total = array();
        
        while($row = mysqli_fetch_assoc($response)){
            $disasterData[] = $row;
            // $disastertype[] = $row['disastertype'];
            // $disastertype_total[] = $row['disastertype_total'];
        }

        echo json_encode($disasterData, JSON_PRETTY_PRINT);
    }
?>