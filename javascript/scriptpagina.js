function topo(){
	parent.scroll(0,0);
}

function stringToHash(string) {
                  
    var hash = 0;
      
    if (string.length == 0) return hash;
      
    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
      
    return hash;
}

function InserirUsuario(Nome, Email, Password, Datanascimento){
    var xhr = new XMLHttpRequest();

    Password = stringToHash(Password);
    var dados = JSON.stringify({Nome, Email, Password, Datanascimento});

    xhr.open("POST", "http://concursando.sunsalesystem.com.br/PHP/InsereUsuario.php");
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener("load", function() {
        var erroAjax = document.querySelector("#erro-ajax");
        if (xhr.status == 200) {
            alert('Usuário cadastrado com sucesso!');
            location.reload();
            topo();
            //sucesso!
        } else {
            alert('Não foi possível inserir o usuário');
            //erro!
        }
    }
    );

    xhr.send(dados);
}

function dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}

function InserirProva(Nomeprova, Local, Tipoprova, Dataaplicacao, Observacaoprova, Observacaogabarito, ProvaArquivo, Gabarito, CodigoUsuario){
    var xhr = new XMLHttpRequest();

    var dados = JSON.stringify({Nomeprova, Local, Tipoprova, Dataaplicacao, Observacaoprova, Observacaogabarito, CodigoUsuario, ProvaArquivo, Gabarito});
    console.log(dados);

    xhr.open("POST", "http://concursando.sunsalesystem.com.br/PHP/InsereProva.php");
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(dados);
    if (xhr.status == 200) {
        alert('Prova cadastrada com sucesso!');
        location.reload();
        topo();
        return JSON.parse(xhr.responseText);
    } else {
        alert('Não foi cadastrar a planta.');
        //erro!
        return null;
    }
}

function Login(login, pass){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://concursando.sunsalesystem.com.br/PHP/Logar.php?login=" + login + "&pass=" + stringToHash(pass), false);
    xhr.send(null);

    if(xhr.status === 200){
        return JSON.parse(xhr.responseText);
    }
    else{
        return null;
    }
}

function AbreUrlNewTab(url){
    window.open(url, '_blank').focus();

}