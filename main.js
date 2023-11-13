const { app, BrowserWindow } = require("electron");
const { ipcMain } = require('electron');
const bcrypt = require('bcrypt');
const crypto = require('crypto-js');

const clave = '8kZ$wE4Y#P1sXmN';

let sqlite3 = require('@journeyapps/sqlcipher').verbose();
let db = new sqlite3.Database('./@D8p#vWzQy%T!kRn/$DbX&vR2Y!T9aPq.db');
db.run("PRAGMA key = 'Jd$9Lp@5fX#sK!pR'");
let appWin;

createWindow = () => {
    appWin = new BrowserWindow({
        width: 1000,
        height: 700,
        title: "Angular and Electron",
        resizable: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });
    ipcMain.on('ls-questions', (event, arg) => {
        db.all("SELECT * FROM questions", (err, row) => {
            if (err) {
                event.reply('ls-questions-respuesta', {
                    status: false,
                    mensaje: "Error no se ha encontrado ninguna pregunta",
                    data: []
                });
            } else {
                event.reply('ls-questions-respuesta', {
                    status: true,
                    mensaje: "",
                    data: row
                });
            }
        });
    });
    ipcMain.on('registrar-login', async (event, arg) => {
        let stmt = db.prepare("INSERT INTO login (password) VALUES (?)");
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(arg.password, saltRounds);
        stmt.run(hashedPassword);
        stmt.finalize();
        event.reply('registrar-login-respuesta', {
            status: true,
            mensaje: "Se ha registrado la contraseña",
            data: []
        })
    });
    ipcMain.on('registrar-respuesta', async (event, arg) => {
        for (let i = 0; i < arg.length; i++) {
            let stmt = db.prepare("INSERT INTO login_questions (id_question,respuesta) VALUES (?,?)");
            stmt.run(arg[i].idQuestion, arg[i].respuesta);
            stmt.finalize();

        }
        event.reply('registrar-respuesta-respuesta', {
            status: true,
            mensaje: "Se ha registrado las preguntas",
            data: []
        })
    });
    ipcMain.on('entrar', async (event, args) => {
        db.all("SELECT * FROM login LIMIT 1", async (err, row) => {
            if (err) {
                event.reply('entrar-respuesta', {
                    status: false,
                    mensaje: "Error no se ha encontrado ninguna pregunta",
                    data: []
                });
            } else {
                const respuesta = await bcrypt.compare(args, row[0].password)
                event.reply('entrar-respuesta', {
                    status: respuesta,
                    mensaje: "",
                    data: []
                });
            }
        });
    })
    ipcMain.on('ls-login', async (event, arg) => {
        db.all("SELECT * FROM login LIMIT 1", (err, row) => {
            if (err) {
                event.reply('ls-login-respuesta', {
                    status: false,
                    mensaje: "Error no se ha encontrado ninguna pregunta",
                    data: []
                });
            } else {
                event.reply('ls-login-respuesta', {
                    status: true,
                    mensaje: "",
                    data: row[0]
                });
            }
        });
    });
    ipcMain.on('registrar-key', (event, arg) => {
        let stmt = db.prepare("INSERT INTO savekey (usuario_correo,password,ubicacion,otros_datos) VALUES (?,?,?,?)");
        const password = crypto.AES.encrypt(arg.password, clave).toString();
        stmt.run(arg.usuario, password, arg.ubicacion, arg.datosExtra);
        stmt.finalize();
        event.reply('registrar-key-save', {
            status: true,
            mensaje: "",
            data: []
        });
    });
    ipcMain.on('ls-key', async (event, arg) => {
        db.all("SELECT * FROM savekey ", (err, row) => {
            if (err) {
                event.reply('savekey-respuesta', {
                    status: false,
                    mensaje: "Error no se ha encontrado ninguna pregunta",
                    data: []
                });
            } else {

                event.reply('savekey-respuesta', {
                    status: true,
                    mensaje: "",
                    data: row
                });
            }
        });
    });

    ipcMain.on('delete-key', async (event, arg) => {
        const stmt = db.prepare('DELETE FROM savekey WHERE id = ?');
        stmt.run(arg, (err) => {
            if (err) {
                event.reply('delete-key-respuesta', {
                    status: false,
                    mensaje: "",
                    data: []
                });
            } else {
                event.reply('delete-key-respuesta', {
                    status: true,
                    mensaje: "",
                    data: []
                });
            }
        })
    });
    ipcMain.on('preguntas-validacion', async (event, arg) => {
        db.all("SELECT * FROM login_questions l , questions q WHERE l.id_question = q.id ", (err, row) => {
            if (err) {
                event.reply('preguntas-validacion-respuesta', {
                    status: false,
                    mensaje: "Error no se ha encontrado ninguna pregunta",
                    data: []
                });
            } else {
                event.reply('preguntas-validacion-respuesta', {
                    status: true,
                    mensaje: "",
                    data: row
                });
            }
        });
    });
    ipcMain.on('ls-one', async (event, arg) => {
        db.all(`SELECT * FROM savekey WHERE id = ${arg} `, (err, row) => {
            if (err) {
                event.reply('ls-one-respuesta', {
                    status: false,
                    mensaje: "Error no se ha encontrado ninguna pregunta",
                    data: []
                });
            } else {
                let password = crypto.AES.decrypt(row[0].password, clave);
                password = password.toString(crypto.enc.Utf8);
                event.reply('ls-one-respuesta', {
                    status: true,
                    mensaje: "",
                    data: {
                        passwordView: password,
                        ...row[0]
                    }
                });
            }
        });
    });
    ipcMain.on('update-login', async (event, arg) => {
        const stmt = db.prepare('UPDATE login SET password = ?');
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(arg.password, saltRounds);
        stmt.run(hashedPassword);
        stmt.finalize();
        event.reply('update-login-respuesta', {
            status: true,
            mensaje: "Se ha actualizdo la contraseña",
            data: []
        })
    });

    ipcMain.on('update-save', async (event, arg) => {

        const stmt = db.prepare("UPDATE savekey SET usuario_correo = ?, password = ?, ubicacion = ?, otros_datos = ? WHERE id = ?");
        const password = crypto.AES.encrypt(arg.password, clave).toString();
        stmt.run(arg.usuario, password, arg.ubicacion, arg.datosExtra, arg.id);
        stmt.finalize();

        event.reply('update-save-respuesta', {
            status: true,
            mensaje: "Se ha actualizado las claves",
            data: []
        });

    });
    appWin.loadURL(`file://${__dirname}/dist/index.html`);

    appWin.setMenu(null);

    appWin.webContents.openDevTools();


    appWin.on("closed", () => {
        appWin = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});