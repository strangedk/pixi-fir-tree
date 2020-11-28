// console.clear();
//
//
// //
// // EDGE
// // ===========================================================================
// class Edge {
//
//     constructor(public p1 = new PIXI.Point(), public p2 = new PIXI.Point()) {
//
//     }
//
//     intersects(edge, asSegment = true, point = new PIXI.Point()) {
//
//         const a = this.p1;
//         const b = this.p2;
//         const e = edge.p1;
//         const f = edge.p2;
//
//         const a1 = b.y - a.y;
//         const a2 = f.y - e.y;
//         const b1 = a.x - b.x;
//         const b2 = e.x - f.x;
//         const c1 = (b.x * a.y) - (a.x * b.y);
//         const c2 = (f.x * e.y) - (e.x * f.y);
//         const denom = (a1 * b2) - (a2 * b1);
//
//         if (denom === 0) {
//             return null;
//         }
//
//         point.x = ((b1 * c2) - (b2 * c1)) / denom;
//         point.y = ((a2 * c1) - (a1 * c2)) / denom;
//
//         if (asSegment) {
//             const uc = ((f.y - e.y) * (b.x - a.x) - (f.x - e.x) * (b.y - a.y));
//             const ua = (((f.x - e.x) * (a.y - e.y)) - (f.y - e.y) * (a.x - e.x)) / uc;
//             const ub = (((b.x - a.x) * (a.y - e.y)) - ((b.y - a.y) * (a.x - e.x))) / uc;
//
//             if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
//                 return point;
//             } else {
//                 return null;
//             }
//         }
//
//         return point;
//     }
// }
//
//
// //
// // COLLISION SHAPE
// // ===========================================================================
// class CollisionShape {
//
//     edges = [];
//     points = [];
//     AABB = new PIXI.Rectangle();
//     bounds = new PIXI.Bounds();
//     intersectionPoint = new PIXI.Point();
//
//     constructor(public target, public vertices = []) {
//
//         for (let i = 0; i < vertices.length; i++) {
//
//             const p1 = vertices[i];
//             const p2 = vertices[i + 1] || vertices[0];
//             this.points.push(p1.clone());
//             this.edges.push(new Edge(p1, p2));
//         }
//
//         this.update();
//     }
//
//     update() {
//
//         const transform = this.target.transform.worldTransform;
//         const vertices = this.vertices;
//         const points = this.points;
//         const bounds = this.bounds;
//
//         bounds.clear();
//
//         for (let i = 0; i < points.length; i++) {
//
//             const vertex = transform.apply(points[i], vertices[i]);
//             bounds.addPoint(vertex);
//         }
//
//         bounds.getRectangle(this.AABB);
//     }
//
//     intersectsAABB(shape) {
//
//         const a = this.bounds;
//         const b = shape.bounds;
//
//         return !(
//             a.maxX < b.minX ||
//             a.maxY < b.minY ||
//             a.minX > b.maxX ||
//             a.minY > b.maxY
//         );
//     }
//
//     intersectsShape(shape) {
//
//         const edges1 = this.edges;
//         const edges2 = shape.edges;
//
//         for (let i = 0; i < edges1.length; i++) {
//
//             const edge1 = edges1[i];
//
//             for (let j = 0; j < edges2.length; j++) {
//
//                 const edge2 = edges2[j];
//                 if (edge1.intersects(edge2, true, this.intersectionPoint)) {
//                     return true;
//                 }
//             }
//         }
//
//         return false;
//     }
// }
//
//
// //
// // APPLICATION
// // ===========================================================================
// const COLLISION = {
//     NONE: 0x4caf50,
//     AABB: 0x2196F3,
//     SHAPE: 0xf44336
// };
//
// let vw = window.innerWidth;
// let vh = window.innerHeight;
//
// const app = new PIXI.Application({
//     view: document.querySelector("#view"),
//     width: vw,
//     height: vh
// });
//
// const sprites = [];
// const container = new PIXI.Container();
//
// for (let i = 0; i < 10; i++) {
//     sprites.push(createSprite());
// }
//
// const text = new PIXI.Text("Drag the shapes around", {
//     fill: "rgba(255,255,255,0.9)",
//     fontSize: 16
// });
//
// text.position.set(12);
//
// const graphics = new PIXI.Graphics();
// app.stage.addChild(container, graphics, text);
// app.ticker.add(update);
// window.addEventListener("resize", onResize);
//
//
// //
// // CREATE SPRITE
// // ===========================================================================
// function createSprite() {
//
//     const sides = random(4, 16) | 0;
//     const step = Math.PI * 2 / sides;
//     const points = [];
//
//     let minX = Infinity;
//     let minY = Infinity;
//
//     for (let i = 0; i < sides - 1; i++) {
//
//         const theta = (step * i) + random(step);
//         const radius = random(100, 160);
//
//         const x = radius * Math.cos(theta);
//         const y = radius * Math.sin(theta);
//
//         minX = Math.min(minX, x);
//         minY = Math.min(minY, y);
//
//         points.push(new PIXI.Point(x, y));
//     }
//
//     points.forEach(point => {
//         point.x = point.x - minX;
//         point.y = point.y - minY;
//     });
//
//     const graphics = new PIXI.Graphics()
//         .beginFill(0xffffff)
//         .drawPolygon(points)
//         .endFill()
//
//     const sprite = new PIXI.Sprite(graphics.generateCanvasTexture());
//
//     sprite.alpha = 0.6;
//     sprite.x = random(100, vw - 100);
//     sprite.y = random(100, vh - 100);
//     sprite.pivot.x = sprite.width * 0.5;
//     sprite.pivot.y = sprite.height * 0.5;
//     sprite.rotation = random(Math.PI * 2);
//     sprite.scale.set(random(0.4, 1));
//
//     sprite.hitArea = new PIXI.Polygon(points);
//     sprite.shape = new CollisionShape(sprite, points);
//     sprite.collisionID = 1;
//     sprite.collision = COLLISION.NONE;
//     sprite.tint = sprite.collision;
//
//     sprite.dragging = false;
//     sprite.newPosition = new PIXI.Point();
//     sprite.lastPosition = new PIXI.Point();
//
//     sprite.interactive = true;
//     sprite.buttonMode = true;
//     sprite
//         .on("pointerdown", onDragStart)
//         .on("pointerup", onDragEnd)
//         .on("pointerupoutside", onDragEnd)
//         .on("pointermove", onDragMove);
//
//     graphics.destroy();
//     container.addChild(sprite);
//
//     return sprite;
// }
//
//
// //
// // DETECT COLLISIONS
// // ===========================================================================
// function detectCollisions() {
//
//     container.updateTransform();
//
//     for (let i = 0; i < sprites.length; i++) {
//
//         const sprite = sprites[i];
//         sprite.collision = COLLISION.NONE;
//
//         if (sprite.collisionID) {
//             sprite.shape.update();
//             sprite.collisionID = 0;
//         }
//     }
//
//     for (let i = 0; i < sprites.length; i++) {
//
//         const sprite1 = sprites[i];
//
//         for (let j = i + 1; j < sprites.length; j++) {
//
//             const sprite2 = sprites[j];
//
//             // Check for AABB intersections to determine what shapes might be overlapping
//             if (sprite1.shape.intersectsAABB(sprite2.shape)) {
//
//                 if (sprite1.collision === COLLISION.NONE) {
//                     sprite1.collision = COLLISION.AABB;
//                 }
//
//                 if (sprite2.collision === COLLISION.NONE) {
//                     sprite2.collision = COLLISION.AABB;
//                 }
//
//                 if (sprite1.shape.intersectsShape(sprite2.shape)) {
//                     sprite1.collision = COLLISION.SHAPE;
//                     sprite2.collision = COLLISION.SHAPE;
//                 }
//             }
//
//             sprite2.tint = sprite2.collision;
//         }
//
//         sprite1.tint = sprite1.collision;
//     }
// }
//
//
// //
// // UPDATE
// // ===========================================================================
// function update() {
//
//     detectCollisions();
//
//     graphics
//         .clear()
//         .lineStyle(1, 0xffffff, 0.8)
//
//     for (let i = 0; i < sprites.length; i++) {
//         const box = sprites[i].shape.AABB;
//         graphics.drawRect(box.x, box.y, box.width, box.height);
//     }
// }
//
//
// //
// // DRAG EVENTS
// // ===========================================================================
// function onDragStart(event) {
//
//     this.dragging = true;
//     this.dragData = event.data;
//     this.lastPosition = this.dragData.getLocalPosition(this.parent, this.lastPosition);
// }
//
// function onDragMove(event) {
//
//     if (this.dragging) {
//
//         const newPosition = this.dragData.getLocalPosition(this.parent, this.newPosition);
//         this.position.x += (newPosition.x - this.lastPosition.x);
//         this.position.y += (newPosition.y - this.lastPosition.y);
//         this.lastPosition.copy(newPosition);
//         this.collisionID++;
//     }
// }
//
// function onDragEnd(event) {
//
//     this.dragData = null;
//     this.dragging = false;
// }
//
// function onResize() {
//     vw = window.innerWidth;
//     vh = window.innerHeight;
//     app.renderer.resize(vw, vh);
// }
//
// function random(min, max) {
//     if (max == null) {
//         max = min;
//         min = 0;
//     }
//     if (min > max) {
//         var tmp = min;
//         min = max;
//         max = tmp;
//     }
//     return min + (max - min) * Math.random();
// }