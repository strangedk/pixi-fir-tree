import * as PIXI from 'pixi.js';
import SpriteCommon from "./SpriteCommon";
import ResourceList from "../../resources/ResourceList";
import gsap from 'gsap';

class Tree extends PIXI.Sprite {
    private readonly tree: SpriteCommon = new SpriteCommon(ResourceList.TREE);
    private readonly lightsOn: SpriteCommon = new SpriteCommon(ResourceList.LIGHTS_ON);
    private readonly lightsOff: SpriteCommon = new SpriteCommon(ResourceList.LIGHTS_OFF);
    private readonly lightsMask: PIXI.Graphics = new PIXI.Graphics()

    private readonly dropMask: PIXI.Graphics = new PIXI.Graphics();
    public get dropArea(): PIXI.Graphics {
        return this.dropMask;
    }

    constructor() {
        super();

        this.addChild(this.tree, this.lightsOff, this.lightsOn, this.lightsMask);

        this.lightsOn.alpha = 0;

        // Lights mask with skew
        this.lightsMask.beginFill(0xfffff1, 1);
        this.lightsMask.drawRect(0,0,50, 600);
        this.lightsMask.endFill();
        this.lightsMask.transform.skew.set(-0.2, 0);
        this.lightsMask.alpha = 0;

        // Drop mask triangle. Nearly same with tree form
        this.dropMask.beginFill(0xffffff, 1);
        this.dropMask.drawStar(0,0,3, 400);
        this.dropMask.scale.set(0.84,1);
        this.dropMask.endFill();
        this.dropMask.x = this.tree.width / 2;
        this.dropMask.y = this.tree.y + this.dropMask.height - 200;
        this.dropMask.interactive = true;
        this.dropMask.alpha = 0;
        this.addChild(this.dropMask);
    }

    startEffect = () => {
        this.getEffect();
    }

    getEffect = () => {
        this.lightsOn.mask = null;
        this.lightsMask.alpha = 0;

        if (Math.random() < 0.3) {
            this.lightsOn.alpha = 0;
            gsap.to(this.lightsOn, {alpha: 1, yoyo: true, repeat: 4, duration: 3, onComplete: this.getEffect});
        } else if (Math.random() > 0.7) {
            this.lightsOn.alpha = 0;
            gsap.to(this.lightsOn, {alpha: 1, yoyo: true, repeat: 16, duration: 1, onComplete: this.getEffect});
        } else {
            this.lightsOn.alpha = 1;
            this.lightsMask.alpha = 1;
            this.lightsOn.mask = this.lightsMask;
            gsap.fromTo(this.lightsMask, {x: -200},{x: 600, duration: 1, repeat: 4, onComplete: this.getEffect});
        }
    }
}

export default Tree;