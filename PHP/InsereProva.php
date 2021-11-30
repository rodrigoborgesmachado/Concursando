<?php
if(strpos($_SERVER['HTTP_REFERER'], 'http://concursando.sunsalesystem.com.br/') !== false){
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    
    $url = "http://teste.sunsalesystem.com.br/api/concursando/provas/CadastraProva";
    
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
        "Nomeprova": '$request->Nomeprova',
        "Local": '$request->Local',
        "Tipoprova": '$request->Tipoprova',
        "Dataaplicacao": '$request->Dataaplicacao',
        "ProvaArquivo": '$request->ProvaArquivo',
        "Gabarito": '$request->Gabarito',
        "Observacaoprova": '$request->Observacaoprova',
        "Observacaogabarito": '$request->Observacaogabarito',
        "CodigoUsuario": $request->CodigoUsuario
    }
    DATA;
    
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    
    $resp = curl_exec($curl);
    echo $resp;
    
    curl_close($curl);
}
?>