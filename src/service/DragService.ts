import * as PIXI from 'pixi.js';
import SpriteCommon from "../components/common/SpriteCommon";
import gsap from 'gsap';

class DragService {
    static app: PIXI.Application;
    static targetContainer: PIXI.Graphics;
    static currentItem: SpriteCommon | null;
    static enabled: boolean = true;

    constructor(
        private items: SpriteCommon[],
        private targetContainer: PIXI.Graphics,
        private app: PIXI.Application) {

        DragService.app = app;
        DragService.targetContainer = targetContainer;

        items.forEach(item => {
            item.on('pointerdown', this.onDragStart.bind(item))

            document.addEventListener('pointerup', this.onDragEnd.bind(item))
            document.addEventListener('pointermove', this.onDragMove.bind(item))

            // .on('mousedown', this.onDragStart.bind(item))
            // .on('touchstart', this.onDragStart.bind(item))
            // .on('mouseup', this.onDragEnd.bind(item))
            // .on('mouseupoutside', this.onDragEnd.bind(item))
            // .on('touchend', this.onDragEnd.bind(item))
            // .on('touchendoutside', this.onDragEnd.bind(item))
            //
            // document.addEventListener('mousemove', this.onDragMove.bind(item))
            // document.addEventListener('touchmove', this.onDragMove.bind(item));
        });
    }

    static restoreObject = (item: any) => {
        DragService.enabled = false;
        gsap.killTweensOf(item);

        gsap.to(item, {x: item.defaultX, y: item.defaultY, rotation: 6.28, duration: 0.5});
        gsap.to(item.scale, {
            x: 1, y: 1, duration: 0.7, onComplete: () => {
                DragService.enabled = true;
                gsap.killTweensOf(item);
                item.rotation = 0;
            }
        });
    }

    // @ts-ignore
    onDragStart(event) {
        if (!DragService.enabled)
            return;

        const item = this as any;
        item.data = event.data;
        item.alpha = 1;
        item.dragging = true;
        // item.offsetX = item.mouse.

        DragService.currentItem = item;

        if (item.scale.x === 1) {
            const newPosition = item.data.getLocalPosition(item.parent);

            gsap.to(item.position, {x: newPosition.x, y: newPosition.y, duration: 0.1});
            gsap.to(item.scale, {x: 0.5, y: 0.5, transformOrigin: 'center', duration: 0.3});

            const to = () => gsap.to(item, {rotation: -0.02, duration: 1, onComplete: from, ease: 'sine.out'});
            const from = () => gsap.to(item, {rotation: 0.02, duration: 1, onComplete: to, ease: 'sine.out'});

            to();
        }
    }

    onDragEnd() {
        if (!DragService.currentItem)
            return;

        const item = DragService.currentItem as any; // this as any;

        item.alpha = 1;
        item.dragging = false;
        item.data = null;

        item.interactive = false; // to avoid item check with hitTest

        // const mousePosition = DragService.app.renderer.plugins.interaction.mouse.global;
        const itemPosition = new PIXI.Point(item.x, item.y);
        const hitObject = DragService.app.renderer.plugins.interaction.hitTest(itemPosition);

        item.interactive = true;

        // fix, for the objects which layered on the tree. Sure, isn't good approach.
        if ((hitObject as SpriteCommon) && item.x > 950) {
            return;
        } else if (hitObject !== DragService.targetContainer) {
            DragService.restoreObject(item);
        } else {
        }

        DragService.currentItem = null;
    }

    onDragMove() {
        if (!DragService.currentItem)
            return;

        const item = DragService.currentItem as any;// this as any;

        if (item && item.dragging) {
            const newPosition = item.data.getLocalPosition(item.parent);
            item.position.x = newPosition.x;
            item.position.y = newPosition.y;
        }
    }
}

export default DragService;