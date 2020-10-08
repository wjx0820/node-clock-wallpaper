const fs = require("fs")
const ora = require("ora")
const nodeHtmlToImage = require("node-html-to-image")
const wallpaper = require("wallpaper")
const cron = require("node-cron")
const { nanoid } = require("nanoid")

const html = fs.readFileSync("./index.html", (err, html) => {
	if (err) throw err
	return html
})

const startSpinner = ora("Starting...\n").start()

cron.schedule("* * * * *", () => {
	// Generate a unique name for new wallpaper
	const imgPath = `./wallpaperclock_${nanoid()}.png`

	nodeHtmlToImage({
		output: imgPath,
		html: html.toString("utf-8"),
	}).then(() => {
		startSpinner.succeed("Image create!")

		//Remove last wallpaper image file if exists
		wallpaper.get({ screen: "main" }).then((oldFile) => {
			if (oldFile.includes("wallpaperclock")) {
				fs.unlink(oldFile, (err) => {
					if (err) {
						console.error(err)
						return
					}
					startSpinner.succeed("Old image remove!")
				})
			}
		})

		// Set the created image as wallpaper
		wallpaper.set(imgPath, { screen: "main" }).then((err) => {
			if (err) throw err
			startSpinner.succeed("Wallpaper set!")
		})
	})
})
