import * as PIXI from 'pixi.js';

class ControlPanel extends PIXI.Graphics {
    WIDTH = 1000;
    HEIGHT = 610;

    constructor() {
        super();

        this.beginFill(0xffffff, 0.5);
        this.drawRoundedRect(0,0,this.WIDTH, this.HEIGHT, 10);
        this.endFill();
    }
}

export default ControlPanel;