<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$url = "http://teste.sunsalesystem.com.br/api/concursando/InserirTeste";

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$headers = array(
	"Content-Type: application/json",
);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$var = $_SERVER['HTTP_REFERER'] . '|' . $_SERVER['REMOTE_ADDR'] . '|' . $_SERVER['HTTP_USER_AGENT'];
$data = <<<DATA
{
    "testeCampo": '$var'
}
DATA;

curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

$resp = curl_exec($curl);
echo $resp;

curl_close($curl);
?>