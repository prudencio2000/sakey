const { app, BrowserWindow } = require("electron");
const { ipcMain } = require('electron');

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
        console.log(db);
        db.all("SELECT * FROM questions", (err, row) => {
            if (err) {
                event.reply('ls-questions-respuesta', {
                    status : false,
                    mensaje : "Error no se ha encontrado ninguna pregunta",
                    data :[]
                });
            } else {
                event.reply('ls-questions-respuesta', {
                    status : true,
                    mensaje : "",
                    data :row
                });
            }
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