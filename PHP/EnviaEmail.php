<?php
if($_SERVER['HTTP_REFERER'] != 'http://concursando.sunsalesystem.com.br/EsqueciSenha.html'){
    echo '';
    return;
}

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$url = "http://teste.sunsalesystem.com.br/api/email/enviar?isHtml=" . htmlspecialchars($_GET["isHtml"]);

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$headers = array(
	"Content-Type: application/json",
);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$data = <<<DATA
{
    "Destinatario": '$request->Destinatario',
    "Assunto": '$request->Assunto',
    "Texto": '$request->Texto'
}
DATA;
curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

$resp = curl_exec($curl);
echo $resp;

curl_close($curl);
?>