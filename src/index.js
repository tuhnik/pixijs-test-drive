import * as PIXI from "pixi.js";

const app = new PIXI.Application({ antialias: true, width: 1280, height: 1280 });
const box = 64;
let dir = "RIGHT";
let dirCache = [];
let changingDir = false;
let snake = [];
let score = 0;
let speed = 150;

snake[0] = { x: 4 * box, y: 4 * box };
snake[1] = { x: 3 * box, y: 4 * box };
snake[2] = { x: 2 * box, y: 4 * box };
snake[3] = { x: 1 * box, y: 4 * box };
snake[4] = { x: 0 * box, y: 4 * box };

document.body.appendChild(app.view);

const loader = app.loader;

loader.add("foodsheet", "assets/food.json");
loader.load();

loader.onComplete.add(loaded);
loader.onProgress.add(loading);

function loaded(loader, resources) {
  console.log("All assets loaded!");
  let sheet = loader.resources["foodsheet"].spritesheet;
  let snakeGraphics = new PIXI.Graphics();

  let eatable = new PIXI.Sprite();

  eatable.width = box;
  eatable.height = box;
  eatable.x = Math.floor(Math.random() * (app.renderer.width / box)) * box;
  eatable.y = Math.floor(Math.random() * (app.renderer.width / box)) * box;
  let texture = sheet.textures["" + Math.ceil(Math.random() * 41)];
  eatable.texture = texture;
  function letsPlay() {
    setTimeout(() => {
      changingDir = false;
      let snakeX = snake[0].x;
      let snakeY = snake[0].y;

      if (dirCache.length) {
        dir = dirCache[0];
        dirCache.shift();
      }

      if (dir == "RIGHT") snakeX += box;
      if (dir == "LEFT") snakeX -= box;
      if (dir == "UP") snakeY -= box;
      if (dir == "DOWN") snakeY += box;

      if (snakeX == eatable.x && snakeY == eatable.y) {
        let x = eatable.x + 5;
        let y = eatable.y + 5;
        let points = Math.ceil(eatable._texture.textureCacheIds[0] / 10);
        const gotPoints = new PIXI.Text(points, { fontFamily: "monospace", fill: 0xffffff, fontSize: 60 });
        score += points;
        if (speed > 89) speed -= 1;
        gotPoints.x = x + 16;
        gotPoints.y = y;
        app.stage.addChild(gotPoints);
        let moveTextUp = setInterval(() => {
          gotPoints.y -= 2;
          gotPoints.alpha -= 0.05;
        }, 50);
        setTimeout(() => {
          app.stage.removeChild(gotPoints);
          clearInterval(moveTextUp);
        }, 1000);

        eatable.texture = sheet.textures["" + Math.ceil(Math.random() * 41)];
        eatable.x = Math.floor(Math.random() * (app.renderer.width / box)) * box;
        eatable.y = Math.floor(Math.random() * (app.renderer.width / box)) * box;
        score += 1;
      } else {
        snake.pop();
      }

      const newSnakeHead = {
        x: snakeX,
        y: snakeY
      };

      snake.unshift(newSnakeHead);

      if (
        snakeX + box < box ||
        snakeX + box > (app.renderer.width / box) * box ||
        snakeY + box < box ||
        snakeY + box > (app.renderer.width / box) * box ||
        checkCollision(snake)
      ) {
        console.log("game over");
        console.log("last dir was: " + dir);
        app.ticker.stop();
        return;
      }
      letsPlay();
    }, speed);
  }

  letsPlay();

  app.ticker.add(() => {
    snakeGraphics.clear();
    for (let i = 0; i < snake.length; i++) {
      snakeGraphics.beginFill(i == 0 ? 0xffffff : 0x03a9f4, i < 2 ? 1 : 0.25 / i + 1 / i + 0.25);
      snakeGraphics.lineStyle(2, 0, 1, 0);
      snakeGraphics.drawRoundedRect(snake[i].x, snake[i].y, box, box, 15);
      snakeGraphics.endFill();
    }
  });
  app.stage.addChild(snakeGraphics);
  app.stage.addChild(eatable);
}

function loading(process) {
  console.log("loading: " + process.progress + "%");
}

function checkCollision(arr) {
  for (let i = 4; i < arr.length; i++) {
    if (arr[0].x == arr[i].x && arr[0].y == arr[i].y) {
      console.log("collided!");

      return true;
    }
  }
  return false;
}

window.onkeydown = function(evt) {
  if (evt.key != "ArrowLeft" && evt.key != "ArrowRight" && evt.key != "ArrowUp" && evt.key != "ArrowDown") {
    return;
  }

  if (evt.repeat) return;

  let newDirection;

  if (evt.key == "ArrowLeft" && dir != "RIGHT" && dirCache[0] != "RIGHT") newDirection = "LEFT";
  if (evt.key == "ArrowUp" && dir != "DOWN" && dirCache[0] != "DOWN") newDirection = "UP";
  if (evt.key == "ArrowRight" && dir != "LEFT" && dirCache[0] != "LEFT") newDirection = "RIGHT";
  if (evt.key == "ArrowDown" && dir != "UP" && dirCache[0] != "UP") newDirection = "DOWN";

  let lastDirection = dirCache[dirCache.length - 1];

  if (newDirection && lastDirection !== newDirection) {
    if (dirCache.length > 2) {
      dirCache.length = 2;
    }
    dirCache.push(newDirection);
  }
};
