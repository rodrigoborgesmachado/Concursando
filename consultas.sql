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
ANEXO  VARBINARY  NOT NULL 
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
ANEXO  VARBINARY  NOT NULL 
,  PRIMARY KEY ( CODIGO  )
)

ALTER TABLE rodrigo.QUESTOES ADD NUMEROQUESTAO VARCHAR(20)
*/

SELECT * FROM rodrigo.PROVA
SELECT * FROM rodrigo.USUARIOCONCURSANDO
SELECT * FROM ACAOUSUARIO



