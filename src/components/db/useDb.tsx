import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { Capacitor } from "@capacitor/core";
import { SQLiteValues } from "jeep-sqlite";
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";
import { useEffect, useRef, useState } from "react";

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
        const old = await sqlite.isConnection("Teste", false);

        if (consistency.result && old.result) {
            conn = await sqlite.retrieveConnection("Teste", false);
            console.log("Já existe conexão!");
        } else {
            conn = await sqlite.createConnection("Teste", false, "no-encryption", 1, false);
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

            // await SQLAction(`
            //     CREATE TABLE IF NOT EXISTS pacientes (
            //         id integer primary key autoincrement,
            //         nome varchar(50) not null,
                    
            //     )
            // `);
        }
    }

    useEffect(() => {
        initializeDB()
         .then(initializeTables)
         .then(() => setInitialized(true));
    }, [])

    return {db, SQLAction, SQLQuery, initialized};
}

export default useDb;