<?php
$url = "http://teste.sunsalesystem.com.br/api/concursando/provas/getArquivoGabarito?codigoProva=" . htmlspecialchars($_GET["codigoProva"]);

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$resp = curl_exec($curl);

echo $resp;

?>