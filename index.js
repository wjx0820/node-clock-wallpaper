const nodeHtmlToImage = require("node-html-to-image")
const fs = require("fs")
const wallpaper = require("wallpaper")
const cron = require("node-cron")
const { nanoid } = require("nanoid")

const html = fs.readFileSync("./index.html", (err, html) => {
	if (err) throw err
	return html
})

console.log("html", html)

// Run every minute
cron.schedule("* * * * *", () => {
	// Generate a unique name for new wallpaper
	const imgPath = `./wallpaperclock_${nanoid()}.png`
	console.log("imgPath", imgPath)

	nodeHtmlToImage({
		output: imgPath,
		html: html.toString("utf-8"),
	}).then(() => {
		console.log("image created!")
		//Remove last wallpaper image file if exists
		wallpaper.get().then((oldFile) => {
			if (oldFile.includes("wallpaperclock")) {
				fs.unlink(oldFile, (err) => {
					if (err) {
						console.error(err)
						return
					}
					console.log("last image removed!")
				})
			}
		})
		wallpaper.set(imgPath, { scale: "fit" }).then((err) => {
			if (err) throw err
			console.log("wallpaper set!")
		})
	})
})
