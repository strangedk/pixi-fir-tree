import gsap from 'gsap';
import ResourceList from "../resources/ResourceList";
import SpriteCommon from "../components/common/SpriteCommon";

class ToySprites {
    public readonly toys: any;

    constructor() {
        this.toys = ResourceList.LIST_TOYS.reduce((total: any, name: any) => {
            const sprite = new SpriteCommon(name);
            sprite.interactive = true;
            sprite.buttonMode = true;
            sprite.anchor.set(0.5);
            sprite.name = name;

            total[name] = sprite;

            return total;
        }, {});
    }

    disable = () => {
        for (let key in this.toys) {
            const toy = this.toys[key];
            toy.enabled = false;
            toy.interactive = false;
            toy.buttonMode = false;

            if (toy.x < 1000)
                gsap.to(toy, {alpha: 0});
        }
    }
}

export default ToySprites;