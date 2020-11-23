import * as PIXI from 'pixi.js';

const examplePNG: string = './assets/pixi.png';

const options: object = {
  width: 800,
  height: 600,
  antialias: true,
  transparent: true,
};

const app: PIXI.Application = new PIXI.Application(options);

const init = () => {
  PIXI.Loader.shared.add(examplePNG).load(result => {
    const resource = result.resources[examplePNG];

    const sprite = new PIXI.Sprite(resource.texture);
    sprite.anchor.set(0.5);
    sprite.x = app.renderer.width / 2;
    sprite.y = app.renderer.height / 2;

    app.stage.addChild(sprite);
    app.ticker.add((delta: number) => loop(sprite, delta));
  });
}

const loop = (sprite: PIXI.Sprite, delta: number) => {
  sprite.rotation += delta / 100;
}

init();

document.body.appendChild(app.view);