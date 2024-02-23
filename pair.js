const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('5kA52X-5mHVN14hMO4NjKFn4wvXAF3LI')
const {makeid} = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    Browsers,
    makeCacheableSignalKeyStore
} = require("@whiskeysockets/baileys");

function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
        async function getPaire() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/'+id)
     try {
            let session = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: Browsers.macOS("Desktop"),
             });
             if(!session.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await session.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            session.ev.on('creds.update', saveCreds)
            session.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
		await delay(10000);
                await delay(10000);
                let jes = "JessiPairSession:"
                    const output = await pastebin.createPasteFromFile(__dirname+`/temp/${id}/creds.json`, "pastebin-js test", null, 1, "N");
          await session.sendMessage(session.user.id, {
            text:`Don't share this code to anyone. forked repository and click delopy button\n\nfrok repository ➬https://github.com/whiteshadowofficial/Jessi-md\n\nCopyright © 2021 All right reserved\n\nCʀᴇᴀᴛᴇᴅ Bʏ ᴍʀ.ᴡʜɪᴛᴇ ꜱʜᴀᴅᴏᴡ x ᴘʀᴇʙᴀᴛʜ_ꜱᴀᴠ- 2024\n\n`
          })
					await session.sendMessage(session.user.id, {
						text: jes+output.split('/')[3]
					})
        await delay(100);
        await session.ws.close();
        return await removeFile('./temp/'+id);
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    getPaire();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/'+id);
         if(!res.headersSent){
            await res.send({code:"Service Unavailable"});
         }
        }
    }
    return await getPaire()
});
module.exports = router
