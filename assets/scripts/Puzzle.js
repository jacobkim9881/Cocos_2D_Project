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
        const {width} = this
        , puzzle = {}
        console.log(typeof width)
        let num = 0
        for(let i = -4; i < 4; i++) {
            for(let j = -7; j < 10; j++) {
            let x = i * width + width/2
            , y = j * width + width/2     
            var newPiece = cc.instantiate(this.puzzlePiece);
            newPiece.setPosition(this.getNewPiecePosition(x, y));
            this.node.addChild(newPiece);
            console.log('new piece: ', newPiece)
            /*
            puzzle[`${i}, ${j}`] = {}
            puzzle[`${i}, ${j}`].id = newPiece.uuid
            puzzle[`${i}, ${j}`].name = 'boar'      
            puzzle[`${i}, ${j}`].touched = false      
            */            
            puzzle[newPiece.uuid] = {}
            puzzle[newPiece.uuid].name = 'boar'      
            puzzle[newPiece.uuid].touched = false      
            num++
                
            }
        }
        console.log('puzzle obj: ', puzzle)
        cc.sys.localStorage.setItem('puzzle', JSON.stringify(puzzle))
    },

    getNewPiecePosition(x, y) {

        return cc.v2(x, y);
    },

    start () {
        console.log(this.width)
        //console.log('obj: ', this.puzzle)
console.log(this.puzzlePiece)
    },

    // update (dt) {},
});
