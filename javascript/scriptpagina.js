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

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
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

function logado(){
    return sessionStorage.getItem('CodigoUsuario') != -1;
}

function MontaHtmlProvas(lista){
    console.log(lista);
    var html = '';

    html+= `<div class="col-sm-12">
                <h2 style="text-align: center;">Provas</h2>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th><h4 style="text-align: center;display: none;">Codigo</h4></th>
                            <th><h4 style="text-align: center;">Prova</h4></th>
                            <th><h4 style="text-align: center;">Data/Ano</h4></th>
                            <th><h4 style="text-align: center;">Local</h4></th>
                            <th><h4 style="text-align: center;">Tipo</h4></th>
                            <th><h4 style="text-align: center;">Prova</h4></th>
                            <th><h4 style="text-align: center;">Gabarito</h4></th>
                            </tr>
                    </thread>
                    <tbody>
                `;
    
    for (i = 0;i<lista.length;i++){
        html += '<tr>';
        html += '   <td>';
        html += '       <h4 style="text-align: center;display: none;">' + lista[i].Codigo + '</h4>';
        html += '   </td>';
        html += '   <td>';
        html += '       <h4 style="text-align: center;">' + lista[i].Nomeprova + '</h4>';
        html += '   </td>';
        html += '   <td>';
        html += '       <h4 style="text-align: center;">' + lista[i].Dataaplicacao + '</h4>';
        html += '   </td>';
        html += '   <td>';
        html += '       <h4 style="text-align: center;">' + lista[i].Local + '</h4>';
        html += '   </td>';
        html += '   <td>';
        html += '       <h4 style="text-align: center;">' + lista[i].Tipoprova + '</h4>';
        html += '   </td>';
        html += '   <td>';
        html += '       <span class="input-group-addon">';
        html += `           <button type="button" class="btn btn-info" onclick="downloadURI('` + lista[i].ProvaArquivo + `', '` + lista[i].Nomeprova + `_PV.pdf')"><i class="glyphicon glyphicon-list-alt"></i></button>`;
        html += '       </span>';
        html += '   </td>';
        html += '   <td>';
        html += '       <span class="input-group-addon">';
        html += `           <button type="button" class="btn btn-info" onclick="downloadURI('` + lista[i].Gabarito + `', '` + lista[i].Nomeprova + `_GB.pdf')"><i class="glyphicon glyphicon-list-alt"></i></button>`;
        html += '       </span>';
        html += '   </td>';
        html += '</tr>';

    }

    html += `       </tbody>';
                </table>';
            </div>`;

    return html;
}

function InserirProva(Nomeprova, Local, Tipoprova, Dataaplicacao, Observacaoprova, Observacaogabarito, ProvaArquivo, Gabarito, CodigoUsuario){
    var xhr = new XMLHttpRequest();

    var dados = JSON.stringify({Nomeprova, Local, Tipoprova, Dataaplicacao, Observacaoprova, Observacaogabarito, CodigoUsuario, ProvaArquivo, Gabarito});

    xhr.open("POST", "http://concursando.sunsalesystem.com.br/PHP/InsereProva.php");
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(dados);
    if (xhr.status == 200) {
        alert('Prova cadastrada com sucesso!');
        location.reload();
        topo();
        return JSON.parse(xhr.responseText);
    } else {
        alert('Não foi possível incluir a prova.');
        //erro!
        return null;
    }
}

function AtualizaSenha(codigo, senha){
    var xhr = new XMLHttpRequest();

    senha = stringToHash(senha);
    var dados = JSON.stringify({codigo, senha});

    xhr.open("POST", "http://concursando.sunsalesystem.com.br/PHP/AtualizaSenha.php");
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener("load", function() {
        if (xhr.status == 200) {
            alert('Senha alterada com sucesso!');
            location.reload();
            topo();
            //sucesso!
        } else {
            alert('Não foi possível atualizar.');
            //erro!
        }
    }
    );

    xhr.send(dados);

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

function BuscarProvas(codigoUsuario){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://concursando.sunsalesystem.com.br/PHP/BuscarProvas.php?codigoUsuario=" + codigoUsuario, false);
    xhr.send(null);

    if(xhr.status === 200){
        return JSON.parse(xhr.responseText);
    }
    else{
        return null;
    }
}

function RegistraRecuperacao(email, guid){
    var xhr = new XMLHttpRequest();

    var dados = JSON.stringify({email, guid});

    xhr.open("POST", "http://concursando.sunsalesystem.com.br/PHP/RegistraRecuperaSenha.php");
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener("load", function() {
        if (xhr.status == 200) {
            console.log(xhr.response);
            EnviaEmailRecuperacao(email, guid);
            //window.close();
            //sucesso!
        } else {
            //erro!
        }
    }
    );

    xhr.send(dados);
}

function EnviaEmailRecuperacao(Destinatario, guid){
    var xhr = new XMLHttpRequest();

    var Assunto = 'Recuperação de senha - Concursando';
    var Texto = MontaHTMLRecuperaSenha(Destinatario, guid);
    var dados = JSON.stringify({Destinatario, Assunto, Texto});

    xhr.open("POST", "http://concursando.sunsalesystem.com.br/PHP/EnviaEmail.php?isHtml=true");
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener("load", function() {
        if (xhr.status == 200) {
            console.log(xhr.response);
            alert('Em até cinco minutos você receberá o email (confira o spam)!');
            //window.close();
            //sucesso!
            
        } else {
            //erro!
        }
    }
    );

    xhr.send(dados);
}

function AbreUrlNewTab(url){
    window.open(url, '_blank').focus();
}

function MontaHTMLRecuperaSenha(email, guid){
    return `<b>Link para recuperação da senha: http://concursando.sunsalesystem.com.br/RecuperaSenha.html?guid=` + guid + `&email=` + email;
}

function RecuperaSenha(email){
    var guid = CreateGuid();
    RegistraRecuperacao(email, guid);
}

function FinalizaRecuperaSenha(senha, guid, email){
    var xhr = new XMLHttpRequest();

    senha = stringToHash(senha);
    var dados = JSON.stringify({senha, guid, email});

    xhr.open("POST", "http://concursando.sunsalesystem.com.br/PHP/FinalizaRecuperaSenha.php");
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener("load", function() {
        if (xhr.status == 200) {
            console.log(xhr.response);
            alert("Senha alterada com sucesso!");
            window.close();
            //sucesso!
        } else {
            //erro!
        }
    }
    );

    xhr.send(dados);
}

function CreateGuid() {  
   function _p8(s) {  
      var p = (Math.random().toString(16)+"000000000").substr(2,8);  
      return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;  
   }  
   return _p8() + _p8(true) + _p8(true) + _p8();  
}  

function queryObj() {
    var result = {}, keyValuePairs = location.search.slice(1).split("&");
    keyValuePairs.forEach(function(keyValuePair) {
        keyValuePair = keyValuePair.split('=');
        result[decodeURIComponent(keyValuePair[0])] = decodeURIComponent(keyValuePair[1]) || '';
    });
    return result;
}