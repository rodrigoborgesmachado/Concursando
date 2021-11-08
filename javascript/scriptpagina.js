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
    return sessionStorage.getItem('logado') == '1';
}

function MontaHtmlProvasMobile(lista){
    return MontaHtmlProvasPc(lista);
}

function MontaHtmlProvasPc(lista){
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
                            <th><h4 style="text-align: center;">Questões</h4></th>
                            <th><h4 style="text-align: center;">Prova</h4></th>
                            <th><h4 style="text-align: center;">Gabarito</h4></th>
                            <th><h4 style="text-align: center;"></h4></th>
                            <th><h4 style="text-align: center;` + (ehAdmin() ? '' : 'display: none;') + `"></h4></th>
                            <th><h4 style="text-align: center;"></h4></th>
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
        html += '       <h4 style="text-align: center;">' + lista[i].QuantidadeQuestoesResolvidas + '/' + lista[i].QuantidadeQuestoesTotal + '</h4>';
        html += '   </td>';
        html += '   <td>';
        html += '       <span class="input-group-addon">';
        html += `           <button type="button" class="btn btn-info" onclick="BuscarProva('` + lista[i].Codigo + `', '` + lista[i].Nomeprova + `')"><i class="glyphicon glyphicon-list-alt"></i></button>`;
        html += '       </span>';
        html += '   </td>';
        html += '   <td>';
        html += '       <span class="input-group-addon">';
        html += `           <button type="button" class="btn btn-info" onclick="BuscarGabarito('` + lista[i].Codigo + `', '` + lista[i].Nomeprova + `')"><i class="glyphicon glyphicon-list-alt"></i></button>`;
        html += '       </span>';
        html += '   </td>';
        html += '   <td>';
        html += `       <button type="button" style="text-align: center;" class="btn btn-info" onclick="AbreListagemQuestoesProva('` + lista[i].Codigo + `', '` + lista[i].Nomeprova + `')">Questões</button>`;
        html += '   </td>';
        html += '   <td>';
        html += `       <button type="button" style="text-align: center;` + (ehAdmin() ? '' : 'display: none;') + `;" class="btn btn-info" onclick="adicionarQuestao('` + lista[i].Codigo + `', '` + lista[i].Nomeprova + `')">Adicionar Questões</button>`;
        html += '   </td>';
        html += '   <td>';
        html += `       <button type="button" style="text-align: center;" class="btn btn-info" onclick="fazerQuestoes('` + lista[i].Codigo + `')">` + (lista[i].QuantidadeQuestoesResolvidas > 0 ? 'Continuar' : 'Iniciar') + `</button>`;
        html += '   </td>';
        html += '</tr>';
        
    }

    html += `       </tbody>';
                </table>';
            </div>`;

    return html;
}

function MontaQuestoes(lista, prova){
    var html = '';

    html+= `<div class="col-sm-12">
                <h2 style="text-align: center;">Prova - ${prova}</h2>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th><h4 style="text-align: center;display: none;">Codigo</h4></th>
                            <th><h4 style="text-align: center;">Número</h4></th>
                            <th><h4 style="text-align: center;">Descrição</h4></th>
                            <th><h4 style="text-align: center;">Matéria</h4></th>
                            <th><h4 style="text-align: center;"></h4></th>
                            <th><h4 style="text-align: center;"></h4></th>
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
        html += '       <h4 style="text-align: center;">' + lista[i].Numeroquestao + '</h4>';
        html += '   </td>';
        html += '   <td>';
        html += '       <h4 style="text-align: center;">' + (lista[i].Campoquestao.length < 30 ? lista[i].Campoquestao : lista[i].Campoquestao.substring(0, 30) + '...') + '</h4>';
        html += '   </td>';
        html += '   <td>';
        html += '       <h4 style="text-align: center;">' + lista[i].Materia + '</h4>';
        html += '   </td>';
        html += '   <td>';
        html += `       <button type="button" style="text-align: center;" class="btn btn-info" onclick="informa('` + lista[i].Campoquestao + `')">Visualizar</button>`;
        html += '   </td>';
        html += '   <td>';
        html += `       <button type="button" style="text-align: center;" class="btn btn-info" onclick="fazerQuestoes('` + lista[i].Codigo + `')">Responder</button>`;
        html += '   </td>';
        html += '</tr>';
    }

    html += `       </tbody>';
                </table>';
            </div>`;

    return html;
}

function adicionarQuestao(prova, descricao){
    window.open('http://concursando.sunsalesystem.com.br/InsereQuestao.html?Prova=' + prova + '&Descricao=' + descricao, '_blank');
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
    xhr.open("GET", "http://concursando.sunsalesystem.com.br/PHP/Logar.php?login=" + login + "&pass=" + stringToHash(pass));
    
    xhr.addEventListener("load", function() {
        removeLoader();
        if (xhr.status == 200) {
            var retorno = JSON.parse(xhr.responseText);
            if(retorno.Sucesso)
            {
                sessionStorage.setItem('logado', '1');
                sessionStorage.setItem('usuario', login);
                sessionStorage.setItem('admin', retorno.Admin);
                sessionStorage.setItem('CodigoUsuario', retorno.CodigoUsuario);
                console.log(retorno.CodigoUsuario);

                $("#modalLogar").modal('hide');
                document.location.reload(true);
            }
            else{
                alerta("Login Inválido!");
                document.getElementById('UserPassword').value = '';
                document.getElementById('logar').disabled = false;
            }
        } else {
            alert('Não foi possível atualizar.');
            //erro!
        }
    }
    );

    xhr.send(null);
}

function BuscarProvas(codigoUsuario){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://concursando.sunsalesystem.com.br/PHP/BuscarProvas.php?codigoUsuario=" + codigoUsuario);

    xhr.addEventListener("load", function() {
        if (xhr.status == 200) {
            if(navigator.platform == 'Win32'){
                document.getElementById('espacoProvas').innerHTML = MontaHtmlProvasPc(JSON.parse(xhr.responseText).lista);
            }
            else{
                document.getElementById('espacoProvas').innerHTML = MontaHtmlProvasMobile(JSON.parse(xhr.responseText).lista);
            }
        } else {
            //erro!
        }
        removeLoader();
    }
    );

    xhr.send();
}

function BuscarQuestoes(codigoProva, prova){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://concursando.sunsalesystem.com.br/PHP/BuscarQuestoesProva.php?codigoProva=" + codigoProva);

    xhr.addEventListener("load", function() {
        if (xhr.status == 200) {
            document.getElementById('espacoQuestoes').innerHTML = MontaQuestoes(JSON.parse(xhr.responseText).lista, prova);
        } else {
            alert('Erro ao buscar questões');
        }
        removeLoader();
    }
    );

    xhr.send();
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

function BuscarProva(codigo, nomeProva){
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "http://concursando.sunsalesystem.com.br/PHP/BuscarArquivoProva.php?codigoProva=" + codigo);
    xhr.setRequestHeader('Content-Type', 'application/json');
    openLoader();

    xhr.addEventListener("load", function() {
        if (xhr.status == 200) {

            console.log(JSON.parse(xhr.response).Arquivo);
            downloadURI(JSON.parse(xhr.response).Arquivo, nomeProva + '_prova.pdf');
            //sucesso!
        } else {
            //erro!
        }
        removeLoader()
    }
    );

    xhr.send();
}

function BuscarGabarito(codigo, nomeProva){
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "http://concursando.sunsalesystem.com.br/PHP/BuscarArquivoGabarito.php?codigoProva=" + codigo);
    xhr.setRequestHeader('Content-Type', 'application/json');
    openLoader();

    xhr.addEventListener("load", function() {
        if (xhr.status == 200) {
            downloadURI(JSON.parse(xhr.response).Arquivo, nomeProva + '_gabarito.pdf');
            //sucesso!
        } else {
            //erro!
        }
        removeLoader()
    }
    );

    xhr.send();
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

function ehAdmin(){
    return sessionStorage.getItem('admin') == '1';
}