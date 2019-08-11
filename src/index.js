import * as PIXI from "pixi.js";

const app = new PIXI.Application();
document.body.appendChild(app.view);

app.loader.add("bunny", "assets/bunny.png").load((loader, resources) => {
  const bunny = new PIXI.Sprite(resources.bunny.texture);

  bunny.x = app.renderer.width / 2;
  bunny.y = app.renderer.height / 2;

  app.stage.addChild(bunny);
  
  app.ticker.add(() => {
    bunny.rotation -= 0.01;
  });
});
