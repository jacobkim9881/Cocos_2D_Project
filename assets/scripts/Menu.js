// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        playButton: cc.Node
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
        this.setEvent(this.playButton)
        //node.on("touchstart", this.touchStart, this)
    },

    // LIFE-CYCLE CALLBACKS:
    	
    touchStart(e) {
    },

    touchEnd() {
        cc.director.loadScene('game');
    },

    setEvent(node) {
        //node.on("touchstart", this.touchStart, this)
        node.on("touchend", this.touchEnd, this)
        node.on("touchcancel", this.touchEnd, this)
    },

    start () {

    },

    // update (dt) {},
});
