const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('5kA52X-5mHVN14hMO4NjKFn4wvXAF3LI')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: makeWASocket,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function Getqr() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let session = makeWASocket({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			session.ev.on('creds.update', saveCreds)
			session.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
				  let jes = "JessiPairSession:"
					await delay(10000);
					const output = await pastebin.createPasteFromFile(__dirname+`/temp/${id}/creds.json`, "pastebin-js test", null, 1, "N");
					await session.sendMessage(session.user.id, {
					  text: `Don't share this code to anyone. forked repository and click delopy button\n\nfrok repository ➬https://github.com/whiteshadowofficial/Jessi-md\n\nCopyright © 2021 All right reserved\n\nCʀᴇᴀᴛᴇᴅ Bʏ ᴍʀ.ᴡʜɪᴛᴇ ꜱʜᴀᴅᴏᴡ x ᴘʀᴇʙᴀᴛʜ_ꜱᴀᴠ- 2024\n\n`
					})
					await session.sendMessage(session.user.id, {
						text: jes+output.split('/')[3]
					})
					await delay(100);
					await session.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					Getqr();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await Getqr()
	//return //'qr.png', { root: "./" });
});
module.exports = router
