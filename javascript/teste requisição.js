function Teste(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://concursando.sunsalesystem.com.br/PHP/teste.php");

    xhr.addEventListener("load", function() {
        if (xhr.status == 200) {
            alert('Sucesso')
        } else {
            alert('Erro');
        }
        removeLoader();
    }
    );

    xhr.send();
}