// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        time: 0,
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
        cc.director.getScheduler().setTimeScale(5)
        const {width} = this
        , puzzle = {}
        console.log(typeof width)
        let num = 0
        for(let i = -4; i < 4; i++) {
            for(let j = -7; j < 10; j++) {
            let x = i * width + width/2
            , y = j * width + width/2     
            //var newPiece = cc.instantiate(this.puzzlePiece);
            //newPiece.setPosition(this.getNewPiecePosition(x, y));
            //this.node.addChild(newPiece);
            //console.log('new piece: ', newPiece)
           if(i === 0 && j === -7) {
            var newPiece = cc.instantiate(this.puzzlePiece);
            newPiece.setPosition(this.getNewPiecePosition(x, y));
            this.node.addChild(newPiece);
           }

            puzzle[`${x}, ${y}`] = {}
            puzzle[`${x}, ${y}`].name = 'boar'      
            puzzle[`${x}, ${y}`].touched = false      
            puzzle[`${x}, ${y}`].isEmpty = true      
            puzzle[`${x}, ${y}`].uuid = 
            puzzle[`${x}, ${y}`].position = {x, y}      
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
        cc.sys.localStorage.setItem('time-check', 0)
        //console.log('obj: ', this.puzzle)
console.log(this.puzzlePiece)
    },

     update (dt) {
        //let time = cc.sys.localStorage.getItem('time') ?  parseInt(cc.sys.localStorage.getItem('time')) + dt : 0        
        //console.log('time', time)
        //cc.sys.localStorage.setItem('time', time)
        this.time += dt
        let everyHalfSecond = Math.trunc(this.time * 100) % 50 === 1 ? true : false
        , timeChecked = cc.sys.localStorage.getItem('time-check')
        //console.log(everyHalfSecond)
        //console.log('time', this.time) 
        //console.log(timeChecked === '0')
        if (everyHalfSecond && timeChecked === '0') {
            //console.log(timeChecked)
            cc.sys.localStorage.setItem('time-check', 1)
        } else if (!everyHalfSecond && timeChecked === '1') {
            //console.log(timeChecked)
            cc.sys.localStorage.setItem('time-check', 0)
        }
     },
});
