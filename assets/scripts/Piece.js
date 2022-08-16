// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
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
        this.node.on("touchend", this.touchEnd, this)
    },

    touchEnd() {
    this.node.destroy();
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
