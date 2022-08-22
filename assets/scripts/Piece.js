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
        isLocationAdded: false,
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
        node.on("touchend", this.touchEnd, this)
        node.on("touchmove", this.touchMove, this)
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
        const xMin = 22.5
        , xMax = -157.5
        , yMin = -292.5
        , yMax = 427.5        
        , aCell = 45
        , y1 = y - aCell
        , x2 = x + aCell
        , x3 = x - aCell
        , puzzle = JSON.parse(cc.sys.localStorage.getItem('puzzle')) 
        , bottom = puzzle[`${x}, ${y1}`]
        , right = puzzle[`${x2}, ${y}`]
        , Location3 = puzzle[`${x3}, ${y}`]
        console.log('x: ', x, 'y: ', y, 'x2: ', x2, 'y1: ', y1)
        console.log(bottom, right, Location3)

        if (bottom && bottom.isEmpty) {
            console.log(bottom)
            this.isMoving = true
            this.targetPos.x = bottom.position.x
            this.targetPos.y = bottom.position.y
//move bottom
        } else if (right && right.isEmpty) {
            console.log(right)
            console.log(this.targetPos)
            this.isMoving = true
            this.targetPos = right.position
            console.log('is moving: ', this.isMoving)
            return true
            /*
            this.targetPos.x = right.position.x
            this.targetPos.y = right.position.y
            */
        } else if (Location3 && Location3.isEmpty) {
            console.log(Location3)
            this.isMoving = true
            this.targetPos.x = Location3.position.x
            this.targetPos.y = Location3.position.y
        } 

        switch(x, y) {

        }

    },

    moveObj(x, y) {
        const diffX = this.targetPos.x - x
        ,diffY = this.targetPos.y - y
        console.log('diffX: ', diffX, 'diffY: ', diffY)
        //console.log('this.node.x: ', this.node.x)
        if (diffX > 0) {
            x++
        } else if (diffX < 0) {
            x--
        } 

        if (diffY > 0) {
            y++
        } 

        else if (diffY === 0 && diffX === 0) {
            this.isMoving = false
        }

    },

    update (dt) {                
        //console.log(this.node.getPosition())
        let timeChecked = cc.sys.localStorage.getItem('time-check')
        , isLocationAdded = this.isLocationAdded
        if (timeChecked === '1') {
            let beforePosition = this
            , currentPosition = this.node.getPosition()
            console.log(isLocationAdded)
            console.log('is moving: ', this.isMoving, !this.isMoving)
            if (beforePosition.x === currentPosition.x && beforePosition.y === currentPosition.y && !isLocationAdded && !this.isMoving) {
                const moveLogic = this.moveLogic
                this.isMoving = moveLogic(currentPosition.x, currentPosition.y)
                console.log(currentPosition.y, currentPosition.x)
                let puzzle = JSON.parse(cc.sys.localStorage.getItem('puzzle')) 
        //console.log(this.node.uuid)
        let uuid = this.node.uuid
        //puzzle[uuid]['location'] = currentPosition
                isLocationAdded = false
            } else if(this.isMoving) {
                const moveObj = this.moveObj
                moveObj(currentPosition.x, currentPosition.y)
            } else {                
                console.log(beforePosition.x, currentPosition.x)
                console.log(beforePosition.y, currentPosition.y)
                console.log(beforePosition.x === currentPosition.x)
                console.log(beforePosition.y === currentPosition.y)                
                this.beforePosition = currentPosition
                
            }
            //console.log(this.beforePosition)
        } 
        //console.log(this.beforePosition)
        
        /*
        let currentPosition = this.node.getPosition()
        , beforePosition = this.beforePosition
        console.log(currentPosition)
        setTimeout(() => {currentPosition = beforePosition}, 10)*/
    },
});
