# node-clock-wallpaper

A live clock wallpaper using Node.js

![preview](preview.png)

## Usage

Clone the repo and
make sure your machine have [node and npm](https://nodejs.org/en/) installed.

Then `cd` into the project and run

```
npm install
node index.js
```

## Run on startup with pm2

```
npm i -g pm2
pm2 startup
pm2 start index.js
pm2 save
```
