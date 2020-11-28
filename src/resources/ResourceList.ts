class ResourceList {
    static BG = '../assets/background.png';
    static BTN_ADD_PHOTO = '../assets/btn-add-photo.png';
    static BTN_READY = '../assets/btn-ready.png';
    static GIFTS = '../assets/gifts.png';
    static LIGHTS_OFF = '../assets/lights.png';
    static LIGHTS_ON = '../assets/lights-on.png';
    static TREE = '../assets/tree.png';

    static ELECTRO = '../assets/items/electro.png';
    static JUICY_FRUIT_1 = '../assets/items/juicy-fruit-1.png';
    static JUICY_FRUIT_2 = '../assets/items/juicy-fruit-2.png';
    static KORKUNOV = '../assets/items/korkunov.png';
    static MARS = '../assets/items/mars.png';
    static MMS = '../assets/items/mms.png';
    static ORBIT_1 = '../assets/items/orbit-1.png';
    static ORBIT_2 = '../assets/items/orbit-2.png';
    static ORBIT_3 = '../assets/items/orbit-3.png';
    static SKITTLES_1 = '../assets/items/skittles-1.png';
    static SKITTLES_2 = '../assets/items/skittles-2.png';
    static SNICKERS = '../assets/items/snickers.png';
    static TOY_3 = '../assets/items/toy-3.png';
    static TOY_2 = '../assets/items/toy-2.png';
    static TOY_1 = '../assets/items/toy-1.png';

    static TWIX = '../assets/items/twix.png';

    static LIST_TOYS: string[] = [
        ResourceList.ELECTRO,
        ResourceList.JUICY_FRUIT_1,
        ResourceList.JUICY_FRUIT_2,
        ResourceList.KORKUNOV,
        ResourceList.MARS,
        ResourceList.MMS,
        ResourceList.ORBIT_1,
        ResourceList.ORBIT_2,
        ResourceList.ORBIT_3,
        ResourceList.SKITTLES_1,
        ResourceList.SKITTLES_2,
        ResourceList.SNICKERS,
        ResourceList.TOY_1,
        ResourceList.TOY_2,
        ResourceList.TOY_3,
        ResourceList.TWIX,
    ];

    static LIST: string[] = [
        ResourceList.BG,
        ResourceList.BTN_ADD_PHOTO,
        ResourceList.BTN_READY,
        ResourceList.GIFTS,
        ResourceList.LIGHTS_OFF,
        ResourceList.LIGHTS_ON,
        ResourceList.TREE,
        ...ResourceList.LIST_TOYS,
    ];
}

export default ResourceList;