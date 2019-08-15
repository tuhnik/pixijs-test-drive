import * as PIXI from "pixi.js";

const app = new PIXI.Application({ antialias: true });
let SCALE = 1;
document.body.appendChild(app.view);

const loader = app.loader;

loader.add("foodsheet", "assets/food.json");
loader.load();

loader.onComplete.add(loaded);
loader.onProgress.add(loading);

function loaded(loader, resources) {
  console.log("All assets loaded!");

  let sheet = loader.resources["foodsheet"].spritesheet;

  for (let i = 0; i < 3; i++) {
    let eatable = new PIXI.Sprite();

    let tickingFood = setInterval(() => {
      eatable.texture = sheet.textures["sprite" + Math.floor(Math.random() * 42 + 1)];
    }, 250);
    eatable.interactive = true;
    eatable.on("click", () => {
      clearInterval(tickingFood);
    });
    eatable.anchor.set(0.5);

    eatable.x = app.renderer.width / 2 + i * 64 - (3 * 64) / 3;
    eatable.y = app.renderer.height / 2;

    app.stage.addChild(eatable);
  }

  app.ticker.add(() => {});
}

function loading(process) {
  console.log("loading: " + process.progress + "%");
}
