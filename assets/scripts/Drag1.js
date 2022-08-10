// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        isTouched: false
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setEvent(this.node)
        //node.on("touchstart", this.touchStart, this)
    },

    touchStart(e) {        
        
        e.stopPropagationImmediate(); 
        /*
        let touchPosition = e.getLocation();
        this.isTouched = true
        console.log('e touch: ', e.getLocation())
        //console.log('touched', this.isTouched)
        //console.log(touchPosition)
        this.node.emit("start-move",this);
        */
    },

    setEvent(node) {
        //node.on("touchstart", this.touchStart, this)
        node.on("touchend", this.touchStart, this)
        node.on("touchmove", this.touchMove, this)
        node.on("touchcancel", this.touchEnd, this)
        /*
        node.on("mousedown", this.touchStart, this)
        node.on("mousemove", this.mouseMove, this)
        node.on("mouseup", this.touchEnd, this)
        node.on("mousecancel", this.touchEnd, this)
        */
    },

    mouseMove(e) {        
        console.log(this.isTouched)
        if (this.isTouched) {
            console.log('e: ', e)
            console.log(touchPosition)
            let touchPosition = new cc.Vec2(e._x, e._y);
            this.node.setPosition(touchPosition);
        }
        console.log('moved')
    },

    touchMove(e) {        
       
       //location
       console.log("cc.Node.EventType.TOUCH_MOVE called");
       console.log(e.getLocation());
       var w_pos = e.getLocation();//cc.Vec2 {x, y}
       console.log(w_pos, w_pos.x, w_pos.y);

      //How much has changed since the last touch;
       var delta = e.getDelta();//how much x and y have changed cc.Vec2(x, y)

       this.node.x += delta.x;
       this.node.y += delta.y;
    },

    touchEnd() {                
        this.isTouched = false
        //this.node.emit("end-move",this);
        console.log('touched')
        /*
        let product = cc.instantiate(this.productPrefab);
        product.parent = this.productLayout.parent;
        product.position = this.productLayout.position;
        product.group = this.productLayout.group;
        */
    },

    start () {

    },

    update (dt) {

    },
});
