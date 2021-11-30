<?php
if($_SERVER['HTTP_REFERER'] != 'http://concursando.sunsalesystem.com.br/'){
    echo '';
    return;
}

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$url = "http://teste.sunsalesystem.com.br/api/concursando/AlteraSenha?codigoUsuario=" . $request->codigo . '&novaSenha=' . $request->senha;

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$resp = curl_exec($curl);

echo $resp;

?>