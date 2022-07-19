/*
CREATE TABLE QUESTOES (
	CODIGO  INTEGER , 
	DATAREGISTRO  DATETIME  NOT NULL , 
	CAMPOQUESTAO  VARCHAR(8000)  DEFAULT '' NOT NULL , 
	OBSERVACAOQUESTAO  VARCHAR(8000)  DEFAULT '' NOT NULL , 
	MATERIA  VARCHAR(300)  DEFAULT '' NOT NULL , 
	CODIGOPROVA  INTEGER  DEFAULT 0 NOT NULL 
,  PRIMARY KEY ( CODIGO  )
)

CREATE TABLE ANEXOSQUESTOES (
CODIGO  INTEGER , 
CODIGOQUESTAO  INTEGER  DEFAULT 0 NOT NULL , 
DATAREGISTRO  DATETIME  DEFAULT '' NOT NULL , 
ANEXO  VARBINARY(max)  NOT NULL 
,  PRIMARY KEY ( CODIGO  )
)

CREATE TABLE RESPOSTASQUESTOES (
CODIGO  INTEGER , 
CODIGOQUESTAO  INTEGER  DEFAULT 0 NOT NULL , 
DATAREGISTRO  DATETIME  DEFAULT '' NOT NULL , 
TEXTORESPOSTA  VARCHAR(8000)  DEFAULT '' NOT NULL , 
CERTA  CHAR(1)  DEFAULT '0' NOT NULL , 
OBSERVACAORESPOSTA  VARCHAR(8000) 
,  PRIMARY KEY ( CODIGO  )
)

CREATE TABLE ANEXORESPOSTA (
CODIGO  INTEGER , 
CODIGOQUESTAO  INTEGER  DEFAULT 0 NOT NULL , 
DATAREGISTRO  DATETIME  DEFAULT '' NOT NULL , 
ANEXO  VARBINARY(max)  NOT NULL 
,  PRIMARY KEY ( CODIGO  )
)

ALTER TABLE rodrigo.QUESTOES ADD NUMEROQUESTAO VARCHAR(20)

CREATE TABLE CONFIGURACAOEMAIL (
CODIGO  INTEGER , 
EMAILREMETENTE  VARCHAR(300)  DEFAULT '' NOT NULL , 
SMTPCLIENT  VARCHAR(100) , 
PORTA  INTEGER  DEFAULT 587 NOT NULL , 
EMAILCREDENCIAL  VARCHAR(300)  DEFAULT '' NOT NULL , 
SENHACREDENCIAL  VARCHAR(200)  DEFAULT '' NOT NULL 
,  PRIMARY KEY ( CODIGO  )
)

;

CREATE TABLE EMAIL (
CODIGO  INTEGER , 
DESTINATARIO  VARCHAR(300)  DEFAULT '' NOT NULL , 
ASSUNTO  VARCHAR(300)  DEFAULT '' NOT NULL , 
TEXTO  VARCHAR(8000)  DEFAULT '' NOT NULL , 
DATAENVIO  DATETIME  NOT NULL , 
STATUS  CHAR(1)  DEFAULT '0' NOT NULL , 
OBSERVACAO  VARCHAR(1000) 
,  PRIMARY KEY ( CODIGO  )
)

;

CREATE TABLE EMAILANEXOS (
CODIGO  INTEGER , 
CODIGOEMAIL  INTEGER  DEFAULT 0 NOT NULL , 
ARQUIVO  VARBINARY  NOT NULL 
,  PRIMARY KEY ( CODIGO  )
)

;

CREATE TABLE RECUPERASENHACONCURSANDO (
CODIGO  INTEGER , 
DATAREGISTRO  DATETIME  NOT NULL , 
GUID  VARCHAR(64)  DEFAULT '' NOT NULL , 
EMAIL  VARCHAR(300)  DEFAULT '' NOT NULL 
,  PRIMARY KEY ( CODIGO  )
)
ALTER TABLE RECUPERASENHACONCURSANDO ADD RECUPERADO CHAR(1) DEFAULT '0' NOT NULL


CREATE TABLE RESPOSTASUSUARIOS (
CODIGO  INTEGER , 
CODIGOUSUARIO  INTEGER  DEFAULT 0 NOT NULL , 
CODIGORESPOSTA  INTEGER  DEFAULT 0 NOT NULL , 
DATARESPOSTA  DATETIME  NOT NULL 
,  PRIMARY KEY ( CODIGO  )
)
ALTER TABLE rodrigo.PROVA ADD BANCA VARCHAR(1000)
*/
USE DEVTOOLS

SELECT * FROM rodrigo.PROVA

-- Coloca usu�rio como admin
SELECT * FROM rodrigo.USUARIOCONCURSANDO
--UPDATE rodrigo.USUARIOCONCURSANDO SET ADMIN = 1 WHERE CODIGO = 25
--UPDATE rodrigo.USUARIOCONCURSANDO SET ADMIN = 1 WHERE CODIGO = 18
SELECT codigo, NUMEROQUESTAO FROM rodrigo.QUESTOES WHERE NUMEROQUESTAO > 1 AND codigoprova = 23 ORDER BY cast(NUMEROQUESTAO as int)

SELECT * FROM rodrigo.QUESTOES WHERE NUMEROQUESTAO = '144'
select * from rodrigo.respostasquestoes where codigoquestao = 269

select * from rodrigo.ANEXORESPOSTA where CODIGOQUESTAO in (select codigo from rodrigo.respostasquestoes where codigoquestao = 269)

SELECT * FROM RODRIGO.ANEXOSQUESTOES WHERE CODIGOQUESTAO = 269

SELECT * FROM rodrigo.RESPOSTASQUESTOES WHERE CODIGOQUESTAO = 109

SELECT *, CAST(anexo AS VARCHAR(max)) FROM rodrigo.ANEXOSQUESTOES WHERE CODIGOQUESTAO = 29
SELECT codigoquestao FROM rodrigo.ANEXOSQUESTOES GROUP BY codigoquestao HAVING count(1) > 1


SELECT * FROM rodrigo.ANEXORESPOSTA

SELECT * FROM rodrigo.RESPOSTASUSUARIOS 
SELECT * FROM rodrigo.RESPOSTASQUESTOES
SELECT * FROM rodrigo.QUESTOES 

SELECT * FROM rodrigo.ANEXOSQUESTOES WHERE CODIGOQUESTAO = 222
SELECT * FROM rodrigo.RESPOSTASUSUARIOS RES WHERE CODIGOUSUARIO = 15 AND EXISTS (
	SELECT 1 FROM rodrigo.RESPOSTASQUESTOES RES1 INNER JOIN rodrigo.QUESTOES Q ON RES1.CODIGOQUESTAO = Q.CODIGO
	WHERE RES1.CODIGO = RES.CODIGORESPOSTA AND Q.CODIGO = 123
)
SELECT CODIGO FROM QUESTOES WHERE NUMEROQUESTAO > 93 AND CODIGOPROVA = 23 ORDER BY NUMEROQUESTAO
SELECT DISTINCT codigoresposta FROM rodrigo.RESPOSTASUSUARIOS WHERE CODIGOUSUARIO = 15

-- BUsca as respostas do usu�rio
SELECT usuario.NOME, resposta.CERTA, questao.CAMPOQUESTAO, resposta.TEXTORESPOSTA FROM rodrigo.RESPOSTASUSUARIOS respostausu 
INNER JOIN rodrigo.RESPOSTASQUESTOES resposta ON (respostausu.codigoresposta = resposta.CODIGO)
INNER JOIN rodrigo.QUESTOES questao ON (resposta.CODIGOQUESTAO = questao.CODIGO)
INNER JOIN rodrigo.USUARIOCONCURSANDO usuario ON (respostausu.codigousuario = usuario.CODIGO)


--'46792755' - 12345
--'1450575459' - 123456
SELECT * FROM ACAOUSUARIO

SELECT * FROM rodrigo.CONFIGURACAOEMAIL
--'smtp.gmail.com'
--UPDATE rodrigo.CONFIGURACAOEMAIL SET SMTPCLIENT = 'smtp.gmail.com'

SELECT status, * FROM rodrigo.EMAIL

select * from rodrigo.EMAIL order by DATAENVIO desc
--UPDATE rodrigo.EMAIL SET STATUS = 0, observacao = '' WHERE codigo IN (40, 41)
SELECT * FROM rodrigo.ACAOUSUARIO
--UPDATE rodrigo.EMAIL SET STATUS = 2

SELECT CODIGO FROM CODIGOS_TABLE WHERE TABELA ='EMAIL'
SELECT * FROM RECUPERASENHACONCURSANDO

-- Consulta do que os usuários estão fazendo
SELECT TOP 100 * FROM ACAOUSUARIO ACAO 
INNER JOIN USUARIOCONCURSANDO USU ON USU.CODIGO = ACAO.CODIGOUSUARIO 
ORDER BY ACAO.DATAREGISTRO DESC


-- DELETE QUESTAO
SELECT codigo, NOMEPROVA FROM rodrigo.PROVA
select * from rodrigo.QUESTOES where NUMEROQUESTAO = 2 AND CODIGOPROVA = 30
select * from rodrigo.QUESTOES where CODIGO = 344
select * from rodrigo.RESPOSTASQUESTOES where CODIGOQUESTAO in (select CODIGO from rodrigo.QUESTOES where CODIGO = 343)
--DELETE from rodrigo.QUESTOES where CODIGO = 336
--DELETE from rodrigo.ANEXOSQUESTOES where CODIGOQUESTAO in (select CODIGO from rodrigo.QUESTOES where CODIGO = 336)
--delete from rodrigo.ANEXORESPOSTA where CODIGOQUESTAO in (select codigo from rodrigo.RESPOSTASQUESTOES where CODIGOQUESTAO in (select CODIGO from rodrigo.QUESTOES where CODIGO = 336))
--DELETE FROM rodrigo.RESPOSTASQUESTOES where CODIGOQUESTAO in (select CODIGO from rodrigo.QUESTOES where CODIGO = 336)

-- ATUALIZAR QUEST�O
SELECT codigo, NOMEPROVA FROM rodrigo.PROVA
select * from rodrigo.QUESTOES where NUMEROQUESTAO = 2 AND CODIGOPROVA = 30
select * from rodrigo.QUESTOES where CODIGO = 344
--update rodrigo.QUESTOES set CAMPOQUESTAO = '<b>1</b><br> De acordo com a ordem das ideias apresentadas no texto, observa-se que, depois de explicar os tipos de transa��es que podem ser feitas com a bitcoin, o texto se refere<br> <b>Entenda o que � bitcoin</b><br> A bitcoin � uma moeda, assim como o real ou o d�lar, mas bem diferente dos exemplos citados. O primeiro motivo � que ela n�o existe fisicamente, � totalmente virtual. O outro motivo � que sua emiss�o n�o � controlada pelo banco central de um pa�s. Ela � produzida de forma descentralizada por milhares de computadores, mantidos por pessoas que �emprestam� a capacidade de suas m�quinas para criar bitcoins e registrar todas as transa��es feitas.<br>  No processo de nascimento de uma bitcoin, chamado de �minera��o�, os computadores conectados � rede competem entre si na resolu��o de problemas matem�ticos. Quem ganha recebe um bloco da moeda. O n�vel de dificuldade dos desafios � ajustado pela rede, para que a moeda cres�a dentro de uma faixa limitada, que � de at� 21 milh�es de unidades at� o ano de 2140.<br>  Com o aumento do n�mero dos interessados, a tarefa de fabricar bitcoins ficou apenas com quem tinha superm�quinas. A disputa aumentou tanto, que surgiram at� computadores com hardware dedicado � tarefa.<br>  Com as moedas virtuais, podem-se contratar servi�os ou adquirir produtos no mundo inteiro. Al�m da minera��o, � poss�vel comprar unidades em corretoras espec�ficas. Elas s�o guardadas em uma esp�cie de carteira, que � criada quando o usu�rio se cadastra no software.<br>  O valor da bitcoin segue as regras de mercado, ou seja, quanto maior a demanda, maior a cota��o. Historicamente, a moeda virtual apresenta alta volatilidade. Em 2014, sofreu uma forte desvaloriza��o, mas retomou sua popularidade nos anos seguintes. No ano passado, o interesse pela bitcoin explodiu e a moeda passou a ser um dos investimentos mais comentados do planeta. Em 2017, a moeda digital valorizou 1400% e atingiu a maior cota��o da hist�ria: 19,3 mil d�lares.<br>  Os entusiastas da moeda dizem que o movimento de alta deve continuar com o interesse de novos adeptos e com a maior aceita��o. Cr�ticos afirmam que a moeda vive uma bolha que em algum momento deve estourar.<br> AZEVEDO, Rita. <b>Revista Exame</b>. 13 jun. 2017. Dispon�vel em: <https://exame.abril.com.br/mercados/entenda-o-que-e-bitcoin/>. Acesso em: 1 fev. 2018. Adaptado.<br><b>2</b> De acordo com a norma-padr�o da l�ngua portuguesa, o sinal grave indicativo da crase deve ser empregado na palavra destacada em:<br>' where CODIGO = 344

select usuario.NOME, count(1) from rodrigo.USUARIOCONCURSANDO usuario inner join rodrigo.ACAOUSUARIO a on a.CODIGOUSUARIO = usuario.CODIGO 
where a.ACAO like '%Inserir quest�o%' and a.DATAREGISTRO >= '2022-01-01' group by usuario.NOME

select usuario.NOME nome, count(1) quantidade from rodrigo.USUARIOCONCURSANDO usuario inner join rodrigo.ACAOUSUARIO a on a.CODIGOUSUARIO = usuario.CODIGO where a.ACAO like '%Inserir quest�o%' and a.DATAREGISTRO >= '1-1-1 0:0:0' group by usuario.NOME

select * from questoes