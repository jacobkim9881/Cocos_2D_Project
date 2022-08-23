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
        isMoving: false,
        targetPos: {
            get () {
                return this;
            },
            set (value) {
                this.x = value.x;
                this.y = value.y;
            }

   },
        beforePosition: {
                 get () {
                     return this;
                 },
                 set (value) {
                     this.x = value.x;
                     this.y = value.y;
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
        //node.on("touchend", this.touchEnd, this)
        //node.on("touchmove", this.touchMove, this)
        //node.on("touchcancel", this.touchE, this)
    },   

    touchStart(e) {

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
        console.log('is moving: ', this.isMoving)
        let puzzle = JSON.parse(cc.sys.localStorage.getItem('puzzle')) 
        console.log(this.node.uuid)
        let uuid = this.node.uuid
        puzzle[uuid]['touched'] = true       
        console.log(puzzle[uuid]) 
        console.log('puzzle obj: ', puzzle)
        cc.sys.localStorage.setItem('puzzle', JSON.stringify(puzzle))
    //this.node.destroy();
    },

    start () {
        
    },

    getTargetPos(obj) {

    },

    moveLogic(x, y) {
        const puzzle = JSON.parse(cc.sys.localStorage.getItem('puzzle')) 
        , bottom = puzzle[`${x}, ${y}`]
        //console.log('x: ', x, 'y: ', y)
        //console.log(bottom)

        if (bottom && bottom.isEmpty) {
            //console.log(bottom)
            //console.log(this.targetPos)
            this.targetPos = bottom.position
            return true
        } else {
            return false
        }
    },

    moveObj(x, y, node, dt) {
        const diffX = this.targetPos.x - x
        ,diffY = this.targetPos.y - y
        //console.log('diffX: ', diffX, 'diffY: ', diffY)
        //node.x = node.x + dt 
        if (Math.abs(diffX) < 1) {        
            node.x = node.x + diffX 
        } else {
            node.runAction(cc.moveBy(4, diffX/2, 0))
        }
        /*
        if (diffX > 0) {                        
            node.runAction(cc.moveBy(4, 45, 0))
            //node.runAction(cc.moveBy(4, cc.winSize.width * 0.5, 0))
        } else if (diffX < 0) {
            node.runAction(cc.moveBy(4, -45, 0))
            //node.runAction(cc.moveBy(4, cc.winSize.width * - 0.5, 0))
            //this.setPosition(new cc.Point(x - 1, y))
            //x--
        } 
*/
        if (diffY > 0) {
            //this.setPosition(new cc.Point(x, y + 1))
            //y++
        } else if (diffY < 0) {
            //this.setPosition(new cc.Point(x, y - 1))
            //y++
        } 

        else if (diffY === 0 && diffX === 0) {
            this.isMoving = false
        }

    },

    update (dt) {                
        let timeChecked = cc.sys.localStorage.getItem('time-check')
        if (timeChecked === '1') {
            let beforePosition = this.beforePosition
            , currentPosition = this.node.getPosition()
            //console.log('is moving: ', this.isMoving, !this.isMoving)
            if (beforePosition.x === currentPosition.x && beforePosition.y === currentPosition.y && !this.isMoving) {                
        const aCell = 45
        , y1 = currentPosition.y - aCell
        , x2 = currentPosition.x + aCell
        , x3 = currentPosition.x - aCell
                const moveLogic = this.moveLogic
                this.isMoving = moveLogic(currentPosition.x, y1)
                ||  moveLogic(x2, currentPosition.y)
                ||  moveLogic(x3, currentPosition.y)
                //console.log(currentPosition.y, currentPosition.x)
            } else if(this.isMoving) {
                const moveObj = this.moveObj
                moveObj(currentPosition.x, currentPosition.y, this.node, dt)
            } else {                
                //console.log(beforePosition.x, currentPosition.x)
                //console.log(beforePosition.y, currentPosition.y)
                //console.log(beforePosition.x === currentPosition.x)
                //console.log(beforePosition.y === currentPosition.y)                
                this.beforePosition = currentPosition
                
            }
            //console.log(this.beforePosition)
        } 
    },
});
