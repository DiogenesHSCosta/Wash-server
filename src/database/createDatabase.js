

import sqlite3 from "sqlite3";
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const caminhoArq = path.resolve(dirname(fileURLToPath(import.meta.url)), "database.db")
const db = new sqlite3.Database(caminhoArq)

const pragma =`PRAGMA foreign_keys = ON`

const enableForeignKey= ()=>{
    db.run(pragma, (erro) =>{
        if(erro) console.log("Erro in process of creation exec 'pragma'")
    })
}

const ENDERECO_SCHEMAS =`
CREATE TABLE ENDERECO (
    UF CHAR(2),
    CEP CHAR(8),
    cidade VARCHAR(50),
    bairro VARCHAR(50),
    logradouro VARCHAR(50),
    codigo_endereco VARCHAR(10) PRIMARY KEY
)`

const ESPECIALISTA_SCHEMAS =`
CREATE TABLE ESPECIALISTA (
    cpf CHAR(11),
    telefone CHAR(9),
    email VARCHAR(50),
    nome VARCHAR(80),
    id_especialista VARCHAR(10) PRIMARY KEY,
    senha VARCHAR(50),
    num_endereco INT,
    codigo_endereco VARCHAR(10),

    FOREIGN KEY(codigo_endereco) REFERENCES ENDERECO (codigo_endereco)
)`

const PLANO_SCHEMAS = `
CREATE TABLE PLANO (
    precos FLOAT,
    codigo_planos VARCHAR(10) PRIMARY KEY,
    qtd_pecas INT
)
`
const USUARIO_SCHEMAS =`
CREATE TABLE USUARIO (
    pecas_disponiveis INT,
    nome VARCHAR(80),
    email VARCHAR(50),
    cpf CHAR(11),
    senha VARCHAR(50),
    telefone CHAR(9),
    id_usuario VARCHAR(10) PRIMARY KEY,
    num_endereco INT,

    codigo_endereco VARCHAR(10),
    codigo_plano VARCHAR(10),

    FOREIGN KEY(codigo_endereco) REFERENCES ENDERECO (codigo_endereco)
    FOREIGN KEY(codigo_plano) REFERENCES PLANO (codigo_planos)
)`

const LAVAGEM_SCHEMAS =`
CREATE TABLE LAVAGEM (
    pecas INT,
    data CHAR(10),
    status VARCHAR(10),
    codigo_lavagem VARCHAR(10) PRIMARY KEY,

    id_especialista VARCHAR(10),
    id_usuario VARCHAR(10),

    FOREIGN KEY(id_especialista) REFERENCES ESPECIALISTA (id_especialista)
    FOREIGN KEY(id_usuario) REFERENCES USUARIO (id_usuario)
)`




const createTableEndereco = () =>{
    db.run(ENDERECO_SCHEMAS, (erro) =>{
        if(erro) console.log("Erro na criação da tabela 'ENDERECO'")
    })
}

const createTableEspecialista = () =>{
    db.run(ESPECIALISTA_SCHEMAS, (erro) =>{
        if(erro) console.log("Erro na criação da tabela 'ESPECIALISTA'")
    })
}

const createTableLavagem = () =>{
    db.run(LAVAGEM_SCHEMAS, (erro) =>{
        if(erro) console.log("Erro na criação da tabela 'LAVAGEM'")
    })
}

const createTableUsuario = () =>{
    db.run(USUARIO_SCHEMAS, (erro) =>{
        if(erro) console.log("Erro na criação da tabela 'USUARIO'")
    })
}

const createTablePlano = () =>{
    db.run(PLANO_SCHEMAS, (erro) =>{
        if(erro) console.log("Erro na criação da tabela 'PLANO'")
    })
}


db.serialize(()=>{
    enableForeignKey()
    createTableEndereco()
    createTableEspecialista()
    createTableLavagem()
    createTableUsuario()
    createTablePlano()
})