// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        isSelected: false,
        pickRadius: 60,
        objToChange: cc.Node,
        thisX: 0,
        otherObjX: 0,
        startPoint: 0,
        endPoint: 0,
        moveLimit: 80,
        isSwitched: false
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
        let x1 = this.node
        , x2 = this.objToChange
        this.thisX = x1.x
        this.otherObjX = x2.x
        //console.log('position x1: ', x1)
        //console.log('position x2: ', x2)
        //console.log('thisX: ', this.thisX)
        //console.log('otherX: ', this.otherObjX)
        //node.on("touchstart", this.touchStart, this)
    },

    touchStart(e) {                
        e.stopPropagationImmediate();         
        let x1 = this.node
        this.startPoint = x1.x
        this.endPoint = this.objToChange.x
        //this.isSelected = true
    },

    setEvent(node) {
        node.on("touchstart", this.touchStart, this)
        node.on("touchend", this.touchEnd, this)
        node.on("touchmove", this.touchMove, this)
        node.on("touchcancel", this.touchEnd, this)
    },

    touchMove(e) {        
       
       //location
       //console.log("cc.Node.EventType.TOUCH_MOVE called");
       //console.log(e.getLocation());
       var w_pos = e.getLocation();//cc.Vec2 {x, y}
       //console.log(w_pos, w_pos.x, w_pos.y);

      //How much has changed since the last touch;
       var delta = e.getDelta();//how much x and y have changed cc.Vec2(x, y)
        //console.log('delta x: ', delta.x)
       this.node.x += delta.x;
       this.objToChange.x -= delta.x
       this.node.y += delta.y;
    },
    
    getPlayerDistance: function () {
        var otherObjPosition = this.objToChange.getPosition();
        var dist = this.node.position.sub(otherObjPosition).mag();
        return dist;
    },

    exchange(dt) {        
        //let x1 = this.startPoint
        let x1 = this.node.x
        //.getLocation()
        , x2 = this.endPoint
        , x3 = this.startPoint
        , x4 = this.objToChange
        //.getLocation()
        if (x1 < x2) {
            this.node.x ++
            this.objToChange.x --
        } else {
            this.isSwitched = false
            //this.isSelected = false
        }
/*
        if (x2.x > x1.x && x4.x > x3.x && x1 !== x2 && x3 !== x4) {
            console.log('position x1: ', x1)
            console.log('position x2: ', x2)
            this.node.x++
            this.objToChange.node.x--
        }
         
        else {
            this.node.x--
            this.objToChange.node.x++
        }
*/
    },
    
    touchEnd() {                
        this.isTouched = false        
        let x2 = this.objToChange        
        //this.endPoint = x2.x
        let diff = Math.abs(this.startPoint - this.node.x)
        console.log('diff: ', diff)
        //console.log('end point: ', x2.x)
        if ( diff > this.moveLimit) this.isSwitched = true;
    },

    start () {

    },

    update: function (dt) {
/*
        if (this.getPlayerDistance() < this.pickRadius) {            
            //this.exchange(dt);
            return;
        }
        */
        if (this.isSwitched) {         
            console.log('switched')   
            this.exchange(dt);            
            return;
        }
    },
});
