import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import SpriteCommon from "../components/common/SpriteCommon";
import ResourceList from "../resources/ResourceList";
import ControlPanel from "../components/common/ControlPanel";
import ToySprites from "../data/ToySprites";
import Tree from "../components/common/Tree";
import DragService from "../service/DragService";
import ImageLoader from "../service/ImageLoader";

class GameScreen extends PIXI.Container {
    private readonly wrapper: PIXI.Container = new PIXI.Container();

    private readonly bg: SpriteCommon = new SpriteCommon(ResourceList.BG);
    private readonly controlPanel: ControlPanel = new ControlPanel();
    private readonly tree: Tree = new Tree();
    private readonly gifts: SpriteCommon = new SpriteCommon(ResourceList.GIFTS);
    private readonly buttonReady: SpriteCommon = new SpriteCommon(ResourceList.BTN_READY);
    private readonly buttonAddPhoto: SpriteCommon = new SpriteCommon(ResourceList.BTN_ADD_PHOTO);
    private readonly toySprites: ToySprites = new ToySprites();

    private readonly dragService: DragService;

    constructor(private app: PIXI.Application) {
        super();

        // Background
        this.addChild(this.wrapper);

        this.wrapper.addChild(this.bg);
        this.wrapper.addChild(this.controlPanel);
        this.wrapper.addChild(this.tree);

        this.addChild(this.buttonAddPhoto);
        this.addChild(this.buttonReady);

        this.buttonReady.on('pointerup', this.done);
        this.buttonAddPhoto.on('pointerup', this.addPhoto);

        const toysToDrag: SpriteCommon[] = [];
        for (let name in this.toySprites.toys) {
            const sprite = this.toySprites.toys[name];
            toysToDrag.push(sprite);
            this.wrapper.addChild(sprite);
        }

        this.wrapper.addChild(this.gifts);

        this.dragService = new DragService(toysToDrag, this.tree.dropArea, this.app);

        this.start();
    }

    start = () => {
        this.arrangeElements();
    }

    addPhoto = () => {
        const input = document.getElementById('inputImage');
        const e = document.createEvent('MouseEvent');
        const toy = this.toySprites.toys[ResourceList.TOY_1];

        e.initEvent('click', false, true);

        input!.onchange = () => ImageLoader.load(result => toy.addImage(result));
        input!.dispatchEvent(e);
    }

    done = () => {
        const {wrapper, controlPanel, buttonAddPhoto, buttonReady, tree, toySprites} = this;

        DragService.currentItem = null;

        controlPanel.visible = false;
        buttonAddPhoto.visible = false;
        buttonReady.visible = false;

        toySprites.disable();
        tree.startEffect();

        gsap.to(wrapper, {x: -400, duration: 2});

        console.info('Done! Invoke window.newYearGameComplete() now');
        const global = window as any;
        global.newYearGameComplete && global.newYearGameComplete();
    }

    arrangeElements = () => {
        const topOffset = 86;
        const {app, wrapper, controlPanel, bg, tree, gifts, buttonAddPhoto, buttonReady, toySprites} = this;

        wrapper.x = 0;
        wrapper.y = 0;

        bg.x = app.renderer.width - bg.width + 400;
        bg.y = app.renderer.height - bg.height;

        controlPanel.x = 38;
        controlPanel.y = 38 + topOffset;

        tree.x = controlPanel.width + 70;
        tree.y = 100;

        gifts.x = tree.x + 74;
        gifts.y = app.renderer.height - gifts.height - 10;

        buttonAddPhoto.x = controlPanel.x + controlPanel.width - buttonAddPhoto.width - 90;
        buttonAddPhoto.y = controlPanel.y + controlPanel.height - buttonAddPhoto.height - 40;
        buttonAddPhoto.interactive = true;
        buttonAddPhoto.buttonMode = true;

        buttonReady.x = app.renderer.width - buttonReady.width - 50;
        buttonReady.y = app.renderer.height - buttonReady.height - 30;
        buttonReady.interactive = true;
        buttonReady.buttonMode = true;

        const offsetX = -70;
        const offsetY = -20 + topOffset;

        // Toys arrangement
        toySprites.toys[ResourceList.ELECTRO].defaultX = toySprites.toys[ResourceList.ELECTRO].x = offsetX + 700;
        toySprites.toys[ResourceList.ELECTRO].defaultY = toySprites.toys[ResourceList.ELECTRO].y = offsetY + 540;
        toySprites.toys[ResourceList.JUICY_FRUIT_1].defaultX = toySprites.toys[ResourceList.JUICY_FRUIT_1].x = offsetX + 400;
        toySprites.toys[ResourceList.JUICY_FRUIT_1].defaultY = toySprites.toys[ResourceList.JUICY_FRUIT_1].y = offsetY + 135;
        toySprites.toys[ResourceList.JUICY_FRUIT_2].defaultX = toySprites.toys[ResourceList.JUICY_FRUIT_2].x = offsetX + 250;
        toySprites.toys[ResourceList.JUICY_FRUIT_2].defaultY = toySprites.toys[ResourceList.JUICY_FRUIT_2].y = offsetY + 594;
        toySprites.toys[ResourceList.KORKUNOV].defaultX = toySprites.toys[ResourceList.KORKUNOV].x = offsetX + 520;
        toySprites.toys[ResourceList.KORKUNOV].defaultY = toySprites.toys[ResourceList.KORKUNOV].y = offsetY + 270;
        toySprites.toys[ResourceList.MARS].defaultX = toySprites.toys[ResourceList.MARS].x = offsetX + 710;
        toySprites.toys[ResourceList.MARS].defaultY = toySprites.toys[ResourceList.MARS].y = offsetY + 420;
        toySprites.toys[ResourceList.MMS].defaultX = toySprites.toys[ResourceList.MMS].x = offsetX + 695;
        toySprites.toys[ResourceList.MMS].defaultY = toySprites.toys[ResourceList.MMS].y = offsetY + 210;
        toySprites.toys[ResourceList.ORBIT_1].defaultX = toySprites.toys[ResourceList.ORBIT_1].x = offsetX + 250;
        toySprites.toys[ResourceList.ORBIT_1].defaultY = toySprites.toys[ResourceList.ORBIT_1].y = offsetY + 145;
        toySprites.toys[ResourceList.ORBIT_2].defaultX = toySprites.toys[ResourceList.ORBIT_2].x = offsetX + 400;
        toySprites.toys[ResourceList.ORBIT_2].defaultY = toySprites.toys[ResourceList.ORBIT_2].y = offsetY + 560;
        toySprites.toys[ResourceList.ORBIT_3].defaultX = toySprites.toys[ResourceList.ORBIT_3].x = offsetX + 520;
        toySprites.toys[ResourceList.ORBIT_3].defaultY = toySprites.toys[ResourceList.ORBIT_3].y = offsetY + 580;
        toySprites.toys[ResourceList.SKITTLES_1].defaultX = toySprites.toys[ResourceList.SKITTLES_1].x = offsetX + 270;
        toySprites.toys[ResourceList.SKITTLES_1].defaultY = toySprites.toys[ResourceList.SKITTLES_1].y = offsetY + 470;
        toySprites.toys[ResourceList.SKITTLES_2].defaultX = toySprites.toys[ResourceList.SKITTLES_2].x = offsetX + 238;
        toySprites.toys[ResourceList.SKITTLES_2].defaultY = toySprites.toys[ResourceList.SKITTLES_2].y = offsetY + 310;
        toySprites.toys[ResourceList.SNICKERS].defaultX = toySprites.toys[ResourceList.SNICKERS].x = offsetX + 360;
        toySprites.toys[ResourceList.SNICKERS].defaultY = toySprites.toys[ResourceList.SNICKERS].y = offsetY + 270;
        toySprites.toys[ResourceList.TOY_1].defaultX = toySprites.toys[ResourceList.TOY_1].x = offsetX + 920;
        toySprites.toys[ResourceList.TOY_1].defaultY = toySprites.toys[ResourceList.TOY_1].y = offsetY + 380;
        toySprites.toys[ResourceList.TOY_2].defaultX = toySprites.toys[ResourceList.TOY_2].x = offsetX + 1000;
        toySprites.toys[ResourceList.TOY_2].defaultY = toySprites.toys[ResourceList.TOY_2].y = offsetY + 190;
        toySprites.toys[ResourceList.TOY_3].defaultX = toySprites.toys[ResourceList.TOY_3].x = offsetX + 850;
        toySprites.toys[ResourceList.TOY_3].defaultY = toySprites.toys[ResourceList.TOY_3].y = offsetY + 250;
        toySprites.toys[ResourceList.TWIX].defaultX = toySprites.toys[ResourceList.TWIX].x = offsetX + 510;
        toySprites.toys[ResourceList.TWIX].defaultY = toySprites.toys[ResourceList.TWIX].y = offsetY + 470;
    }
}

export default GameScreen;