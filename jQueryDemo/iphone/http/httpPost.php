<?php
include_once './HttpClient.class.php';
$url = $_POST['api_url'];
$data  = $_POST['post_data'];
$action  = $_POST['action'];
$result = null;

$bits = parse_url($url);
$host = $bits['host'];
$http = new HttpClient($host);
switch ($action) {
    case 'get':
    echo $http->quickGet($url);
    break;
    case 'post':
    $da = json_decode($data,true);
    echo $http->quickPost($url, $da);
    break;
    default:
    $result = array("errcode"=>"405","errmsg"=>"缺少参数");
    echo json_encode($result); 
    break;
}
?>