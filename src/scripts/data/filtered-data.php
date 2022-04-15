<?php
// $BASE_URL =  'https://smartpb.bpbd.jatimprov.go.id/beta/api/v1.php?table=v_disasterlogs_all&action=list';
// $USERNAME = 'pusdalops@bpbd.jatimprov.go.id';
// $PASSWORD = 'tangguh123';
// $APIKEY = '2aa30c85-656b-41fb-9e21-898ca32a95b7';

// $curl = curl_init();

// $ch = curl_init($BASE_URL);
// curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/xml', $additionalHeaders));
// curl_setopt($ch, CURLOPT_HEADER, false);
// curl_setopt($ch, CURLOPT_USERPWD, $USERNAME . ":" . $PASSWORD);
// // curl_setopt($ch, CURLOPT_TIMEOUT, 30);
// curl_setopt($ch, CURLOPT_POST, 1);
// curl_setopt($ch, CURLOPT_POSTFIELDS, $payloadName);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
// $return = curl_exec($ch);
// curl_close($ch);
$return = file_get_contents('data.json');

$json= json_decode($return);


$threeDays = date('Y-m-d h:i:s', strtotime('-3 days'));
$filteredArray = array();
foreach($json->data as $mydata)
{

  if($threeDays < $mydata->eventdate || $mydata->status == "BELUM") {
    array_push($filteredArray, $mydata);
  }
}
$data = json_encode($filteredArray, JSON_PRETTY_PRINT);


header("Content-Type: application/json");
echo $data;

?>


