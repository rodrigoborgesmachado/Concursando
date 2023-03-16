function topo(){
	parent.scroll(0,0);
}

function MontaOrdemLetras(i){
    var retorno = '';
    switch(i){
        case 0: 
            retorno = 'A';
            break;

        case 1: 
            retorno = 'B';
            break;

        case 2: 
            retorno = 'C';
            break;

        case 3: 
            retorno = 'D';
            break;    

        case 4: 
            retorno = 'E';
            break;    
        default:
            retorno = 'F';
            break;    
    }
    
    return retorno;
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

function showImageUri(div, uri){
    document.getElementById(div).src = URL.createObjectURL(dataURLtoFile(uri, 'anexo'));
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

function usuarioLogado(){
    return sessionStorage.getItem('CodigoUsuario');
}

function MontaHtmlProvasMobile(lista){
    return MontaHtmlProvasPc(lista);
}

function MontaHtmlProvasPc(lista){
    var html = '';

    html+= `<div class="col-sm-1">`;
    html+= `</div>`;
    html+= `<div class="col-sm-11">`;
    for (i = 0;i<lista.length;i++){
        html += `<div class="row">`;
        html += '   <div class="col-sm-2">';
        html += '       <h4 style="text-align: left;display: none;">Codigo</h4>';
        html += `   </div>`;
        html += '   <div class="col-sm-4">';
        html += '       <h4 style="text-align: center;display: none;">' + lista[i].Codigo + '</h4>';
        html += `   </div>`;
        html += `</div>`;
        html += `<div class="row">`;
        html += '   <div class="col-sm-2">';
        html += '       <h4 style="text-align: left;"><b>Prova</b></h4>';
        html += `   </div>`;
        html += '   <div class="col-sm-4">';
        html += '       <h4 style="text-align: center;"><b>' + lista[i].Nomeprova + '</b></h4>';
        html += `   </div>`;
        html += `</div>`;
        html += `<div class="row">`;
        html += '   <div class="col-sm-2">';
        html += '       <h4 style="text-align: left;">Local</h4>';
        html += `   </div>`;
        html += '   <div class="col-sm-4">';
        html += '       <h4 style="text-align: center;">' + lista[i].Local + '</h4>';
        html += `   </div>`;
        html += `</div>`;
        html += `<div class="row">`;
        html += '   <div class="col-sm-2">';
        html += '       <h4 style="text-align: left;">Data/Ano</h4>';
        html += `   </div>`;
        html += '   <div class="col-sm-4">';
        html += '       <h4 style="text-align: center;">' + lista[i].Dataaplicacao + '</h4>';
        html += `   </div>`;
        html += `</div>`;
        html += `<div class="row">`;
        html += '   <div class="col-sm-2">';
        html += '       <h4 style="text-align: left;">Tipo</h4>';
        html += `   </div>`;
        html += '   <div class="col-sm-4">';
        html += '       <h4 style="text-align: center;">' + lista[i].Tipoprova + '</h4>';
        html += `   </div>`;
        html += `</div>`;
        html += `<div class="row">`;
        html += '   <div class="col-sm-2">';
        html += '       <h4 style="text-align: left;">Banca</h4>';
        html += `   </div>`;
        html += '   <div class="col-sm-4">';
        html += '       <h4 style="text-align: center;">' + lista[i].Banca + '</h4>';
        html += `   </div>`;
        html += `</div>`;
        html += `<div class="row">`;
        html += '   <div class="col-sm-2">';
        html += '       <h4 style="text-align: left;">Questões</h4>';
        html += `   </div>`;
        html += '   <div class="col-sm-4">';
        html += '       <h4 style="text-align: center;">' + lista[i].QuantidadeQuestoesResolvidas + '/' + lista[i].QuantidadeQuestoesTotal + '</h4>';
        html += `   </div>`;
        html += `</div>`;
        html += `<div class="row">`;
        html += '   <div class="col-sm-4">';
        html += '       <h4 style="text-align: left;">Prova</h4>';
        html += `   </div>`;
        html += '   <div class="col-sm-4">';
        html += `           <button type="button" class="btn btn-info" onclick="BuscarProva('` + lista[i].Codigo + `', '` + lista[i].Nomeprova + `')"><i class="glyphicon glyphicon-list-alt"></i></button>`;
        html += `   </div>`;
        html += `</div>`;
        html += `<div class="row">`;
        html += '   <div class="col-sm-4">';
        html += '       <h4 style="text-align: left;">Gabarito</h4>';
        html += `   </div>`;
        html += '   <div class="col-sm-4">';
        html += `           <button type="button" class="btn btn-info" onclick="BuscarGabarito('` + lista[i].Codigo + `', '` + lista[i].Nomeprova + `')"><i class="glyphicon glyphicon-list-alt"></i></button>`;
        html += `   </div>`;
        html += `</div>`;
        html += `<div class="row">`;
        html += '   <div class="col-sm-3">';
        html += `       <button type="button" style="text-align: center;" class="btn btn-info" onclick="AbreListagemQuestoesProva('` + lista[i].Codigo + `', '` + lista[i].Nomeprova + `')">Questões</button>`;
        html += `   </div>`;
        html += '   <div class="col-sm-3">';
        html += `       <button type="button" style="text-align: center;" class="btn btn-info" onclick="AbreQuestaoInicial(${lista[i].Codigo})">${(parseInt(lista[i].QuantidadeQuestoesResolvidas) == 0 ? 'Iniciar' : 'Continuar')}</button>`;
        html += `   </div>`;
        html += '   <div class="col-sm-4">';
        html += `       <button type="button" style="text-align: center;` + (ehAdmin() ? '' : 'display: none;') + `;" class="btn btn-info" onclick="adicionarQuestao('` + lista[i].Codigo + `', '` + lista[i].Nomeprova + `')">Adicionar Questões</button>`;
        html += `   </div>`;
        html += `</div><br><hr>`;
        
    }
    html += `</div>`;

    return html;
}

function MontaQuestoes(lista, prova, codigoProva){
    var html = '';

    html+= `<div class="col-sm-12">
                <h2 style="text-align: center;">Prova - ${prova}</h2>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th><h4 style="text-align: center;display: none;">Codigo</h4></th>
                            <th><h4 style="text-align: center;">Número</h4></th>
                            <th><h4 style="text-align: center;">Matéria</h4></th>
                            <th><h4 style="text-align: center;">Respondido</h4></th>
                            <th><h4 style="text-align: center;"></h4></th>
                            <th><h4 style="text-align: center;"></h4></th>
                        </tr>
                    </thread>
                    <tbody>
                `;
    
    for (i = 0;i<lista.length;i++){
        html += '<tr>';
        html += '   <td>';
        html += '       <h4 style="text-align: center;display: none;">' + lista[i].questao.Codigo + '</h4>';
        html += '   </td>';
        html += '   <td>';
        html += '       <h4 style="text-align: center;">' + lista[i].questao.Numeroquestao + '</h4>';
        html += '   </td>';
        html += '   <td>';
        html += '       <h4 style="text-align: center;">' + lista[i].questao.Materia + '</h4>';
        html += '   </td>';
        html += '   <td>';
        html += '       <h4 style="text-align: center;">' + (lista[i].respostaUsuario != null && lista[i].respostaUsuario.length > 0 ? `<b><p class="respondido">Respondido</h4><b>` : ``) + '</p>';
        html += '   </td>';
        html += '   <td>';
        html += `       <button type="button" style="text-align: center;" class="btn btn-info" onclick="BuscarQuestao(` + codigoProva + ',' + lista[i].questao.Codigo + `, true)">Visualizar</button>`;
        html += '   </td>';
        html += '   <td>';
        html += `       <button type="button" style="text-align: center;" class="btn btn-info" onclick="AbreFazerQuestao(` + codigoProva + `, ` + lista[i].questao.Codigo + `)">Responder</button>`;
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

function InserirProva(Nomeprova, Local, Tipoprova, Dataaplicacao, Observacaoprova, Observacaogabarito, ProvaArquivo, Gabarito, CodigoUsuario, Banca){
    var xhr = new XMLHttpRequest();

    var dados = JSON.stringify({Nomeprova, Local, Tipoprova, Dataaplicacao, Observacaoprova, Observacaogabarito, CodigoUsuario, ProvaArquivo, Gabarito, Banca});

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

function BuscarProvas(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://concursando.sunsalesystem.com.br/PHP/BuscarProvas.php?codigoUsuario=" + usuarioLogado());

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
    xhr.open("GET", "http://concursando.sunsalesystem.com.br/PHP/BuscarQuestoesProva.php?usuario=" + usuarioLogado() + "&codigoProva=" + codigoProva);

    xhr.addEventListener("load", function() {
        if (xhr.status == 200) {
            document.getElementById('espacoQuestoes').innerHTML = MontaQuestoes(JSON.parse(xhr.responseText).lista, prova, codigoProva);
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
            alert(xhr.response);
            EnviaEmailRecuperacao(email, guid);
            removeLoader();
        } else {
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
            alert(xhr.response);
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
            //downloadURI(JSON.parse(xhr.response).Arquivo, nomeProva + '_prova.pdf');
            window.open(JSON.parse(xhr.response).Arquivo, '_blank').focus();
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
            //downloadURI(JSON.parse(xhr.response).Arquivo, nomeProva + '_gabarito.pdf');
            window.open(JSON.parse(xhr.response).Arquivo, '_blank').focus();
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

function informaQuestao(questao){
    informa('teste');
}

function MontaRespostas(questao, modal){
    var html = ``;

    html += `<div class="row">`;

    for(i = 0; i < questao.respostas.length;i++){
        html+= `    <div class="col-sm-8">`;
        if(!modal){
            html += `       <input type="radio" id="html" name="questao${questao.Codigo}" value="HTML" onclick="InsereResposta(${usuarioLogado()}, ${questao.respostas[i].Codigo})">`
            html+= `        ${MontaOrdemLetras(i)} - ${questao.respostas[i].Textoresposta}`;
        }
        else{
            html+= `        ${MontaOrdemLetras(i)} - ${questao.respostas[i].Textoresposta}`;
        }
        if(!questao.respostas[i].Textoresposta.includes('<img src="#" alt="Anexo" id="divAnexoResposta'))
        {
            if(questao.respostas[i].anexos != null){
                for(j = 0; j < questao.respostas[i].anexos.length;j++){
                    html+= `    <img src="#" alt="Anexo" id="divAnexoResposta${i}${j}"/><br>`;
                }
            }
        }
        else{
            html+= `        ${MontaOrdemLetras(i)} - ${questao.respostas[i].Textoresposta}`;
        }
        html+= `    </div>`;
    }
    html+= `</div>`;

    return html;
}

function MontaQuestaoApresentacao(questao, modal){
    var html = '';
    html += `<div class="row">`;
    html+= `    <div class="col-sm-12">`;
    html+= `        ` + questao.questao.Campoquestao;
    html+= `    </div>`;
    html+= `    <div class="col-sm-12">`;

    if(!questao.questao.Campoquestao.includes('<img src="#" alt="Anexo" id="divAnexo'))
    {
        for(i = 0; i < questao.questao.anexosQuestao.length;i++){
            html+= `    <img src="#" alt="Anexo" id="divAnexo${i}"/><br>`;
        }
    }
    
    html+= `    </div>`;
    html+= `    <div class="col-sm-12">`;
    html+= `        ` + MontaRespostas(questao, modal);
    html+= `    </div>`;
    html+= `</div>`;

    return html;
}

function BuscarQuestao(codigoProva, codigoQuestao, modal){
    var xhr = new XMLHttpRequest();
    openLoader();
    xhr.open("GET", "http://concursando.sunsalesystem.com.br/PHP/BuscarQuestoes.php?usuario=" + usuarioLogado() + "&codigoProva=" + codigoProva + "&codigoQuestao=" + codigoQuestao);

    xhr.addEventListener("load", function() {
        if (xhr.status == 200) {
            var obj = JSON.parse(xhr.responseText);
            if(modal)
                informa(MontaQuestaoApresentacao(obj.lista[0], modal));
            else
                document.getElementById('lugarParaConta').innerHTML = MontaQuestaoApresentacao(obj.lista[0]);

            if(obj.lista[0].questao.anexosQuestao != null){
                for(i = 0; i < obj.lista[0].questao.anexosQuestao.length;i++){
                    showImageUri('divAnexo' + i, obj.lista[0].questao.anexosQuestao[i].Anexo);
                }
            }

            for(i = 0; i < obj.lista[0].respostas.length;i++){
                if(obj.lista[0].respostas[i].anexos != null){
                    for(j = 0; j < obj.lista[0].respostas[i].anexos.length;j++){
                        showImageUri('divAnexoResposta' + i + '' + j, obj.lista[0].respostas[i].anexos[j].Anexo);
                    }
                }
            }
            if(!modal){
                document.getElementById('LugarProximaQuestao').innerHTML = `
                    <div class="col-sm-2">
                        <button class="buttonInicio" onclick="RevelaRespostaQuestao(${codigoQuestao}, ${codigoProva});">Revelar Resposta</button>
                    </div>
                    <div class="col-sm-5">
                    </div>
                    <div class="col-sm-2">
                        <button class="buttonInicio" onclick="BuscaQuestaoAnterior(${codigoProva}, ${ obj.lista[0].questao.Numeroquestao});">Anterior</button>
                    </div>
                    <div class="col-sm-1">
                    </div>
                    <div class="col-sm-2">
                        <button class="buttonInicio" onclick="BuscaProximaQuestao(${codigoProva}, ${ obj.lista[0].questao.Numeroquestao});">Próxima</button>
                    </div>
                `;
            }
        } else {
            alert('Erro ao buscar questões');
        }
        removeLoader();
    }
    );

    xhr.send();
}

function InsereResposta(Codigousuario, Codigoresposta){
    var xhr = new XMLHttpRequest();
    openLoader();
    var dados = JSON.stringify({Codigousuario, Codigoresposta});

    xhr.open("POST", "http://concursando.sunsalesystem.com.br/PHP/InsereResposta.php");
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener("load", function() {
        if (xhr.status == 200) {
            var retorno = JSON.parse(xhr.responseText);
            if(!retorno.RespostaCorreta){
                informa('Resposta incorreta');
            }
            else{
                informa('Resposta correta')
            }
        } else {
            alert('Não foi possível inserir e validar a resposta');
        }
        removeLoader();
    }
    );

    xhr.send(dados);
}

function PreencheQuestao(codigoQuestao, codigoProva){
    BuscarQuestao(codigoProva, codigoQuestao, false);
}

function RevelaRespostaQuestao(codigoQuestao, codigoProva){
    var xhr = new XMLHttpRequest();
    openLoader();
    xhr.open("GET", "http://concursando.sunsalesystem.com.br/PHP/BuscarRespostaCorreta.php?codigoProva=" + codigoProva + "&codigoquestao=" + codigoQuestao + "");
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener("load", function() {
        if (xhr.status == 200) {
            var retorno = JSON.parse(xhr.responseText);
            if(retorno.Sucesso){
                informa(retorno.TextoResposta);
            }
            else{
                alert('Erro');
            }
        } else {
            alert('Não foi possível inserir e validar a resposta');
        }
        removeLoader();
    }
    );

    xhr.send();    
}

function BuscaProximaQuestao(codigoProva, numeroQuestaoAtual){
    var xhr = new XMLHttpRequest();
    openLoader();

    xhr.open("GET", "http://concursando.sunsalesystem.com.br/PHP/BuscarProximaQuestao.php?usuario=" + usuarioLogado() +"&codigoProva=" + codigoProva + "&numeroQuestao=" + numeroQuestaoAtual +"");
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener("load", function() {
        if (xhr.status == 200) {
            var retorno = JSON.parse(xhr.responseText);

            if(retorno.Sucesso){
                BuscarQuestao(retorno.lista[0].questao.Codigoprova, retorno.lista[0].questao.Codigo, false);
            }
            else{
                alert(retorno.Mensagem);
            }
            topo();
        } else {
            alert('Não foi possível inserir e validar a resposta');
        }
        removeLoader();
    }
    );

    xhr.send();    
}

function BuscaQuestaoAnterior(codigoProva, numeroQuestaoAtual){
    var xhr = new XMLHttpRequest();
    openLoader();

    xhr.open("GET", "http://concursando.sunsalesystem.com.br/PHP/BuscarQuestaoAnterior.php?usuario=" + usuarioLogado() +"&codigoProva=" + codigoProva + "&numeroQuestao=" + numeroQuestaoAtual +"");
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener("load", function() {
        if (xhr.status == 200) {
            var retorno = JSON.parse(xhr.responseText);

            if(retorno.Sucesso){
                BuscarQuestao(retorno.lista[0].questao.Codigoprova, retorno.lista[0].questao.Codigo, false);
            }
            else{
                alert(retorno.Mensagem);
            }
            topo();
        } else {
            alert('Não foi possível inserir e validar a resposta');
        }
        removeLoader();
    }
    );

    xhr.send();    
}

function AbreQuestaoInicial(codigoProva){
    var xhr = new XMLHttpRequest();
    openLoader();

    xhr.open("GET", "http://concursando.sunsalesystem.com.br/PHP/BuscarProximaNaoRespondida.php?usuario=" + usuarioLogado() +"&codigoProva=" + codigoProva);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener("load", function() {
        if (xhr.status == 200) {
            var retorno = JSON.parse(xhr.responseText);

            if(retorno.Sucesso){
                document.getElementById('espacoInicio').hidden = true;
                document.getElementById('espacoCadastrarUsuario').hidden = true;
                document.getElementById('espacoProvas').hidden = true;
                document.getElementById('espacoQuestoes').hidden = true;
                document.getElementById('espacoExercicio').hidden = false;
                BuscarQuestao(retorno.lista[0].questao.Codigoprova, retorno.lista[0].questao.Codigo, false);
            }
            else{
                alert(retorno.Mensagem);
            }
            topo();
        } else {
            alert('Não foi possível inserir e validar a resposta');
        }
        removeLoader();
    }
    );

    xhr.send();    
}