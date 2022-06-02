<?php 

    include '../../../../koneksi.php';

    $sql = "SELECT YEAR(eventdate) as year, 
    SUM(dead) AS dead_total, 
    SUM(missing) AS missing_total, 
    SUM(serious_wound) AS serious_woundTotal, 
    SUM(minor_injuries) AS minor_injuriesTotal 
    FROM v_disasterlogs_all WHERE YEAR(eventdate) >= year(CURRENT_TIMESTAMP) - 4 GROUP BY YEAR(eventdate) ORDER BY YEAR(eventdate) ASC";
    
    $response = mysqli_query($koneksi, $sql);
    
    if ( mysqli_num_rows($response) > 0) {
        $dateYear = array();
        $dead = array();
        $miss = array();
        $serious = array();
        $minor = array();
        while( $row = mysqli_fetch_assoc($response)){
            if (true) {
                $dateYear[] = $row['year'];
                $dead[] = $row['dead_total'];
                $miss[] = $row['missing_total'];
                $serious[] = $row['serious_woundTotal'];
                $minor[] = $row['minor_injuriesTotal'];

            }
        };
    };

    $result['year'] = $dateYear;
    $result['dead_total'] = $dead;
    $result['missing_total'] = $miss;
    $result['serious_woundTotal'] = $serious;
    $result['minor_injuriesTotal'] = $minor;

    echo json_encode($result, JSON_PRETTY_PRINT);

?>