const nodeHtmlToImage = require("node-html-to-image")
const fs = require("fs")
const wallpaper = require("wallpaper")

const html = fs.readFileSync("./index.html", (err, html) => {
	if (err) throw err
	return html
})

console.log("html", html)

nodeHtmlToImage({
	output: "./image.png",
	html: html.toString("utf-8"),
}).then(() => {
	console.log("image created!")
	wallpaper.set("./image.png", { scale: "fit" }).then((err) => {
		if (err) throw err
		console.log("wallpaper set!")
	})
})
