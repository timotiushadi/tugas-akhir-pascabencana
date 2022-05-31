<?php 

require './koneksi.php';

    $Ssql = "SELECT YEAR(eventdate) as year, 
    SUM(dead) AS dead_total, 
    SUM(missing) AS missing_total, 
    SUM(serious_wound) AS serious_woundTotal, 
    SUM(minor_injuries) AS minor_injuriesTotal 
    FROM v_disasterlogs_all WHERE YEAR(eventdate) >= year(CURRENT_TIMESTAMP) - 4 GROUP BY YEAR(eventdate) ORDER BY YEAR(eventdate) ASC";
    
    $Sresponse = mysqli_query($koneksi, $Ssql);
    
      if ( mysqli_num_rows($Sresponse) > 0) {
        $dateYear = array();
        $dead = array();
        $miss = array();
        $serious = array();
        $minor = array();
          while( $Srow = mysqli_fetch_assoc($Sresponse)){
            if (true) {
              $dateYear[] = $Srow['year'];
              $dead[] = $Srow['dead_total'];
              $miss[] = $Srow['missing_total'];
              $serious[] = $Srow['serious_woundTotal'];
              $minor[] = $Srow['minor_injuriesTotal'];

            }
          }

      $status = "1";
      $message = "success";
  } else {
    $status = "0";
    $message = "error";
    echo json_encode(array('status'=>$status, 'message'=>$message), JSON_PRETTY_PRINT);
  }
  ?>