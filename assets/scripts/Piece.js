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

        if (bottom.isEmpty) {
//move bottom
        } else if (right.isEmpty) {

        } else if (Location3.isEmpty) {

        } 

        switch(x, y) {

        }

    },

    update (dt) {                
        //console.log(this.node.getPosition())
        let timeChecked = cc.sys.localStorage.getItem('time-check')
        , isLocationAdded = this
        if (timeChecked === '1') {
            let beforePosition = this
            , currentPosition = this.node.getPosition()
            if (beforePosition.x === currentPosition.x && beforePosition.y === currentPosition.y && !isLocationAdded) {
                console.log(currentPosition.y, currentPosition.x)
                let puzzle = JSON.parse(cc.sys.localStorage.getItem('puzzle')) 
        //console.log(this.node.uuid)
        let uuid = this.node.uuid
        //puzzle[uuid]['location'] = currentPosition
                isLocationAdded = false
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
