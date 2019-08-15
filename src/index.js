import * as PIXI from "pixi.js";

const app = new PIXI.Application({antialias: true});
let SCALE = 1
document.body.appendChild(app.view);

app.loader.add("bunny", "assets/bunny.png")
.add("ghost", "assets/ghost.png")
.load((loader, resources) => {
  const bunny = new PIXI.Sprite(resources.bunny.texture);
  let ghost = PIXI.Texture.from("ghost");
  
  bunny.scale.set(SCALE)
  bunny.x = app.renderer.width / 2;
  bunny.y = app.renderer.height / 2;
  bunny.anchor.set(0.5)

  bunny.interactive = true;
  bunny.on('click', () => {
    bunny.texture = resources.ghost.texture
    bunny.scale.set(0.1)
  });

  app.stage.addChild(bunny);
  app.ticker.add(() => bunnychanger(bunny));

});

const bunnychanger = (bunny) => {
  bunny.rotation += 0.01;
}