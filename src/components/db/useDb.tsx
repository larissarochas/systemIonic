import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { Capacitor } from "@capacitor/core";
import { SQLiteValues } from "jeep-sqlite";
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";
import { useEffect, useRef, useState } from "react";

export interface DBContext {
    db: React.MutableRefObject<SQLiteDBConnection | undefined>,
    SQLAction: (code: string) => Promise<void>;
    SQLQuery: (code: string) => Promise<SQLiteValues | void>;
    initialized: boolean;
}

export function data(str: string) {
    const splt = str.split("-");

    return `${splt[2]}/${splt[1]}/${splt[0]}`;
}

const useDb = () => {
    const db = useRef<SQLiteDBConnection>();
    const [initialized, setInitialized] = useState(false);

    const initializeDB = async () => {
        if (db.current) return;

        const platform = Capacitor.getPlatform();
        const sqlite = new SQLiteConnection(CapacitorSQLite);

        if (platform === "web") {
            customElements.define("jeep-sqlite", JeepSqlite);
            const jeepSqliteEl = document.createElement("jeep-sqlite");

            document.body.appendChild(jeepSqliteEl);
            await customElements.whenDefined("jeep-sqlite");
        
            await sqlite.initWebStore();
        }

        let conn;

        const consistency = await sqlite.checkConnectionsConsistency();
        const old = await sqlite.isConnection("Fasiclin_DB4", false);

        if (consistency.result && old.result) {
            conn = await sqlite.retrieveConnection("Fasiclin_DB4", false);
            console.log("Já existe conexão!");
        } else {
            conn = await sqlite.createConnection("Fasiclin_DB4", false, "no-encryption", 1, false);
            console.log("Criando conexão!");
        }

        db.current = conn;
    }

    const SQLAction = async (code: string) => {
        if (db.current) {
            await db.current.open();

            await db.current.run(code);

            await db.current.close();
        }
    }

    const SQLQuery = async (code: string): Promise<SQLiteValues | void> => {
        if (db.current) {
            await db.current.open();

            const res = await db.current.query(code);

            await db.current.close();
            return res;
        }
    }

    const initializeTables = async () => {
        if (db.current) {
            await SQLAction('PRAGMA foreign_keys = ON;');

            // Tabela "Procedimentos"
            await SQLAction(`
                CREATE TABLE IF NOT EXISTS procedimentos (
                id integer primary key autoincrement,
                nome varchar(30) not null
            )`)

            // Tabela "DDD"
            await SQLAction(`
                CREATE TABLE IF NOT EXISTS ddd (
                id integer primary key not null,
                estado varchar(20) not null
            )`)

            // Tabela "Formas_Pagamento"
            await SQLAction(`
                CREATE TABLE IF NOT EXISTS formas_pagamento (
                id integer primary key autoincrement,
                tipo varchar(30) not null
            )`)

            // Tabela "Status"
            await SQLAction(`
                CREATE TABLE IF NOT EXISTS status (
                id integer primary key autoincrement,
                nome varchar(15) not null
            )`)

            // Tabela "Pacientes"
            await SQLAction(`
                CREATE TABLE IF NOT EXISTS pacientes (
                id integer primary key autoincrement,
                nome varchar(50) not null,
                ddd integer not null,
                celular varchar(10) not null,
                cpf varchar(14) unique not null,
                foreign key (ddd) references ddd(id)
            )`)

            // Tabela "Consultas"
            await SQLAction(`
                CREATE TABLE IF NOT EXISTS consultas (
                id integer primary key autoincrement,
                paciente_id integer not null,
                procedimento_id integer not null,
                data date not null,
                horario varchar(8) not null,
                valor REAL not null,
                forma_pagamento int not null,
                data_pagamento date not null,
                status integer not null,
                observacao varchar(255) default null,
                foreign key (paciente_id) references pacientes(id),
                foreign key (procedimento_id) references procedimentos(id),
                foreign key (forma_pagamento) references formas_pagamento(id),
                foreign key (status) references status(id)
            )`)
        }
    }

    const setInitialData = async () => {
        if (db.current) {
            // Inserindo status da consulta
            await SQLAction(`
                INSERT OR IGNORE INTO status (id, nome)
                VALUES (1, "Aceito"),
                       (2, "Recusado"),
                       (3, "Pendente")
            `);

            // Inserindo procedimentos
            await SQLAction(`
                INSERT OR IGNORE INTO procedimentos (id, nome)
                VALUES (1, "Fisioterapia"),
                       (2, "Pilates"),
                       (3, "Hidroginástica"),
                       (4, "RPG"),
                       (5, "Radiofrequência"),
                       (6, "Criolipólise"),
                       (7, "Microagulhamento"),
                       (8, "Peeling"),
                       (9, "Heccus"),
                       (10, "Blefaroplastia")
            `);

            // Inserindo DDD's
            await SQLAction(`
                INSERT OR IGNORE INTO ddd (id, estado)
                VALUES (65, "Mato Grosso"),
                       (21, "Rio de Janeiro"),
                       (31, "Belo Horizonte"),
                       (51, "Porto Alegre"),
                       (71, "Salvador")
            `);

            // Inserindo formas de pagamento
            await SQLAction(`
                INSERT OR IGNORE INTO formas_pagamento (id, tipo)
                VALUES (1, "Pix"),
                       (2, "Cartão de Crédito"),
                       (3, "Cartão de Débito"),
                       (4, "Boleto")
            `);

            // Inserindo pacientes
            await SQLAction(`
                INSERT OR IGNORE INTO pacientes (id, nome, ddd, celular, cpf) VALUES 
                (1, "Ana Silva", 65, "999988776", "123.456.789-01"),
                (2, "Carlos Pereira", 21, "998877665", "987.654.321-00"),
                (3, "Maria Oliveira", 31, "997766554", "111.222.333-44"),
                (4, "João Souza", 51, "996655443", "555.666.777-88"),
                (5, "Fernanda Lima", 71, "995544332", "999.888.777-11")
            `);

            // Inserindo consultas
            await SQLAction(`
                INSERT OR IGNORE INTO consultas (id, paciente_id, procedimento_id, data, horario, forma_pagamento, data_pagamento, valor, status, observacao) VALUES
                (1, 1, 2, "2024-11-20", "10:30 AM", 1, "2024-12-08", 2890, 3, null),
                (2, 2, 4, "2024-11-21", "10:00 AM", 2, "2024-12-09", 500, 1, null),
                (3, 3, 3, "2024-11-22", "09:00 PM", 3, "2024-12-10", 5400, 1, null),
                (4, 4, 5, "2024-11-23", "11:00 AM", 4, "2024-12-11", 1200, 2, "Foi Recusado"),
                (5, 5, 1, "2024-11-24", "08:30 PM", 1, "2024-12-12", 3600, 3, null),
                (6, 1, 6, "2024-11-25", "08:00 AM", 2, "2024-12-13", 3350, 1, null),
                (7, 3, 7, "2024-11-26", "13:00 PM", 2, "2024-12-14", 1300, 3, null),
                (8, 3, 6, "2025-11-26", "09:00 PM", 3, "2024-12-13", 1700, 3, null),
                (9, 5, 8, "2024-11-27", "16:00 AM", 4, "2024-12-15", 200, 2, "Foi Recusado");
            `);
            
        }
    }

    useEffect(() => {
        initializeDB()
         .then(initializeTables)
         .then(setInitialData)
         .then(() => setInitialized(true));
    }, [])

    return {db, SQLAction, SQLQuery, initialized};
}

export default useDb;