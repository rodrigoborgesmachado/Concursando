<?php
if($_SERVER['HTTP_REFERER'] != 'http://concursando.sunsalesystem.com.br/'){
    echo '';
    return;
}

$url = "http://teste.sunsalesystem.com.br/api/concursando/provas/getQuestoesProva?usuario=" . htmlspecialchars($_GET["usuario"]) . "&prova=" . htmlspecialchars($_GET["codigoProva"]) . "&codigoQuestao=" . htmlspecialchars($_GET["codigoQuestao"]);

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$resp = curl_exec($curl);

echo $resp;

?>