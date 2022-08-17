// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        isTouched: false,
        beforePosition: {
                 get () {
                     return this;
                 },
                 set (value) {
                 //    this = value;
                 }

        }
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

    onLoad () {        
        this.setEvent(this.node)
    },
    setEvent(node) {
        node.on("touchend", this.touchStart, this)
        node.on("touchmove", this.touchMove, this)
        node.on("touchcancel", this.touchEnd, this)
    },   
    touchMove(e) {        
       //console.log(e)
       let puzzle = cc.sys.localStorage.getItem('puzzle') 
       console.log(puzzle)

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
    //this.node.destroy();
    },

    start () {
        
    },

    update (dt) {
        /*
        let currentPosition = this.node.getPosition()
        , beforePosition = this.beforePosition
        console.log(currentPosition)
        setTimeout(() => {currentPosition = beforePosition}, 10)*/
    },
});
