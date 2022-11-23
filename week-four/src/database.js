'use strict';
const mysql = require('mysql2');
const environment = require('./environment');
const path = require('path');
const fs = require('fs');

const pool = mysql.createPool({
    host: environment.APP_DB_HOST,
    user: environment.APP_DB_USER,
    password: environment.APP_DB_PASS,
    database: environment.APP_DB_NAME,
    port: '3306',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
});

const createMigrationsTable = async (db) => {
    await db.query(
        'CREATE TABLE migrations ( name int NOT NULL PRIMARY KEY, date bigint NOT NULL);'
    );
};

const getCurrentMigrations = async (db) => {
    const [result] = await db.query('SELECT name, date from migrations;');
    return result;
};

const getTableNameList = async (db) => {
    const [data] = await db.query('show tables;');
    return data.map((x) => Object.values(x)).flat();
};

const runInTransaction = async (db, queryRunner = async (conn) => {}) => {
    const output = { error: null, result: null };

    const conn = await db.getConnection();
    await conn.beginTransaction();

    try {
        if (typeof queryRunner === 'function') {
            output.result = await queryRunner(conn);
        }
    } catch (e) {
        output.error = e;
    }

    await conn.commit();
    await conn.release();
    if (output.error) {
        throw new Error(output.error);
    }

    return output;
};

const runMigrations = async (db) => {
    {
        const tableNames = await getTableNameList(db);
        const hasMigrationsTable = tableNames.includes('migrations');

        if (!hasMigrationsTable) {
            await createMigrationsTable(db);
        }
    }
    {
        const currentMigrations = (await getCurrentMigrations(db)).sort(
            (a, b) => a.name - b.name
        );
        const parseFileName = (file) =>
            Number.parseInt(path.parse(file.name).name);

        const migrationFiles = fs
            .readdirSync('migrations', { withFileTypes: true })
            .filter(
                (x) =>
                    x.isFile() &&
                    x.name.endsWith('.sql') &&
                    x.name.split('.').length > 1 &&
                    path.parse(x.name).name &&
                    !Number.isNaN(Number.parseInt(path.parse(x.name).name))
            )
            .sort((a, b) => {
                return parseFileName(a) - parseFileName(b);
            });

        const missingMigrationFiles = currentMigrations.filter(
            (x) => !migrationFiles.find((y) => parseFileName(y) === x.name)
        );
        const pendingMigrations = migrationFiles.filter(
            (x) => !currentMigrations.find((y) => parseFileName(x) === y.name)
        );

        if (missingMigrationFiles.length > 0) {
            throw new Error(
                `MISSING MIGRATION FILE : ${missingMigrationFiles
                    .map((x) => x.name)
                    .join(', ')}`
            );
        }
        if (pendingMigrations.length > 0) {
            for (let pendingMigration of pendingMigrations) {
                console.log(`Running Migration: ${pendingMigration.name}`);
                const migrationQuery = fs
                    .readFileSync(
                        path.resolve('migrations', pendingMigration.name)
                    )
                    .toString();

                await runInTransaction(db, async (conn) => {
                    await conn.query(migrationQuery);
                    await conn.query(`INSERT INTO migrations (name, date)
                                      VALUES (${parseFileName(
                                          pendingMigration
                                      )}, ${Date.now()});`);
                });
            }
        } else {
            console.log('No Database migrations pending.');
        }
    }
};

module.exports = {
    pool,
    db: pool.promise(),
    mysql,
    createMigrationsTable,
    dbName: environment.APP_DB_NAME,
    runInTransaction: runInTransaction,
    getCurrentMigrations,
    getTableNameList,
    runMigrations
};
