<?php
if($_SERVER['HTTP_REFERER'] != 'http://concursando.sunsalesystem.com.br/'){
    echo '';
    return;
}

$url = "http://teste.sunsalesystem.com.br/api/concursando/provas/getProximaQuestoesProva?usuario=" . htmlspecialchars($_GET["usuario"]) . "&codigoProva=" . htmlspecialchars($_GET["codigoProva"]) . "&numeroQuestao=" . htmlspecialchars($_GET["numeroQuestao"]) . "";
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$resp = curl_exec($curl);

echo $resp;

?>