import * as PIXI from 'pixi.js';
import ResourceService from "../../resources/ResourceService";

class SpriteCommon extends PIXI.Sprite {
    public defaultX: number = 0;
    public defaultY: number = 0;

    constructor(resourceName: string) {
        super();

        this.texture = ResourceService.getTexture(resourceName);
    }

    public addImage = (image: string) => {
        const wrapper = new PIXI.Sprite();
        this.addChild(wrapper);

        const mask = new PIXI.Graphics();
        mask.beginFill(0xffffff, 1);
        mask.drawCircle(0, 0, 60);
        mask.endFill();
        mask.x = 0;
        mask.y = 83;
        wrapper.addChild(mask);

        const sprite = new PIXI.Sprite();
        sprite.anchor.set(0.5);
        sprite.y = mask.y;
        const baseTexture = new PIXI.BaseTexture(image);
        const texture = new PIXI.Texture(baseTexture);
        sprite.texture = texture;
        sprite.mask = mask;

        let attempts = 0;
        if (!!texture) {
            let delayInterval = setInterval(() => {
                if (baseTexture.width > 1 || attempts++ > 50) {
                    clearInterval(delayInterval);
                    fixTexture();
                }
            }, 100);
        }

        const fixTexture = () => {
            if (baseTexture.width > baseTexture.height) {
                sprite.height = 120;
                sprite.scale.x = sprite.scale.y;
            } else {
                sprite.width = 120;
                sprite.scale.y = sprite.scale.x;
            }

            wrapper.addChild(sprite);
        };
    }
}

export default SpriteCommon;