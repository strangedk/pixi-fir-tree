import * as PIXI from 'pixi.js';
import ResourceService from "./resources/ResourceService";
import Game from "./Game";

const options: object = {
  width: 1928,
  height: 697,
  antialias: true,
  transparent: true,
};

const app: PIXI.Application = new PIXI.Application(options);

const init = () => {
  ResourceService.init(() => {
    const game: Game = new Game(app);
    app.stage.addChild(game);
  });
}

init();

animate();
function animate() {
  requestAnimationFrame(animate);

  app.renderer.render(app.stage);
}

const wrapper = document.getElementById('wrapper');
wrapper!.appendChild(app.view);