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
    puzzle: {},
    width: 40
    },

    onLoad () {
        const {width, puzzle} = this
        for(let i = -1; i < 3; i++) {
            for(let j = -1; j < 3; j++) {
            let x = i * width + width
            , y = j * width + width    
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
