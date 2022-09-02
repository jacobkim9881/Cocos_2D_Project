// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
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

    onLoad: function () {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; // This node is the node to which your event handler code component belongs
        clickEventHandler.component = "MyComponent";// This is the code file name
        clickEventHandler.handler = "callback";
        clickEventHandler.customEventData = "foobar";
        console.log('click e handler: ', clickEventHandler)
console.log('node of buttoen: ', this.node)
        var button = this.node.getComponent(cc.Button);
        console.log('buttoen: ', button)
        button.clickEvents.push(clickEventHandler);
    },

    callback: function (event, customEventData) {
        // here event is a Event object, you can get events sent to the event node node
        console.log('clicked: ')
        var node = event.target;
        //var button = node.getComponent(cc.Button);
        console.log('clicked: ', node)
        // here the customEventData parameter is equal to you set before the "foobar"
    },

    start () {

    },

    // update (dt) {},
});
