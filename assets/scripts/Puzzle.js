// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        puzzlePiece: {
        default: null,
        type: cc.Prefab
    },
    puzzle: {get () {
                 return this;
             },
             set (key, value) {
                 this.key = value;
             }
            },
    width: 15
    },

    onLoad () {        
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2 (0, -640);
        const {width, puzzle} = this
        console.log(typeof width)
        for(let i = -4; i < 4; i++) {
            for(let j = -7; j < 10; j++) {
            let x = i * width + width/2
            , y = j * width + width/2     
            puzzle[`${i}, ${j}`] = {}
            puzzle[`${i}, ${j}`] = 'boar'
            var newPiece = cc.instantiate(this.puzzlePiece);
            newPiece.setPosition(this.getNewPiecePosition(x, y));
            this.node.addChild(newPiece);

            }
        }
    },

    getNewPiecePosition(x, y) {

        return cc.v2(x, y);
    },

    start () {
        console.log(this.width)
        console.log('obj: ', this.puzzle)
console.log(this.puzzlePiece)
    },

    // update (dt) {},
});
