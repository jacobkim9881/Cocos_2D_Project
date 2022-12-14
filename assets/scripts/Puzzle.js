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
    positionArray: {get () {
        return this;
    },
    set (key, value) {
        this.key = value;
    }
   },
    puzzle: {get () {
                 return this;
             },
             set (key, value) {
                 this.key = value;
             }
            },
    width: 15
    , left: 180
    , top: 360
    , menuWidth: 240
    , isMenu: false
    },    
    
    setEvent(node) {
        node.on("touchend", this.touchEnd, this)
        //node.on("touchmove", this.touchMove, this)
        //node.on("touchcancel", this.touchE, this)
    }, 
    
    touchEnd(e) {
        const pos = e.getLocation()
        , puzzle = JSON.parse(cc.sys.localStorage.getItem('puzzle')) 
        for (let [key, value] of Object.entries(puzzle)) {            
            key = key.split(', ')
            let [keyX, keyY] = key            
            keyX = parseFloat(keyX)
            keyY = parseFloat(keyY)     
            const lessX = keyX - 45
            , lessY = keyY - 45
            , {left, top, width, menuWidth, isMenu} = this
            , menuWidthTouch = isMenu ? 215 : 0
            //console.log(`less x, y : ${lessX}, ${lessY}`)
            //console.log('puzzle of less x, y: ', puzzle[`${lessX}, ${lessY}`])
            if (keyX > pos.x && lessX < pos.x && keyY > pos.y && lessY < keyY
                //&& puzzle[`${ssX}, ${lessY}`]
                ) {                
                    if (!puzzle[`${keyX}, ${keyY}`].isEmpty) {console.log('Is not empty'); return;}                        
            var newPiece = cc.instantiate(this.puzzlePiece);
            console.log('key, value: ', key, value, 'position: ', pos, 'less X, y: ', lessX, lessY)
            console.log(newPiece)
            newPiece.x = keyX - left - width/2 - menuWidthTouch //- menuWidth - width/2 - 7
            newPiece.y = keyY - top - width/2            
            //newPiece.setPosition(this.getNewPiecePosition(lessX, lessY));
            this.node.addChild(newPiece);
            console.log('x, y: ', newPiece.x, newPiece.y)
            console.log('new obj initiated')
            puzzle[`${keyX}, ${keyY}`].isEmpty = false      
            cc.sys.localStorage.setItem('puzzle', JSON.stringify(puzzle))
            return
            }

            

            
        }
        
        //cc.sys.localStorage.setItem('puzzle', JSON.stringify(puzzle))
    //this.node.destroy();
    //1 - 2
    //
    },

    onLoad () {        
        this.setEvent(this.node)
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2 (0, -640);
        cc.director.getScheduler().setTimeScale(5)
        const {width} = this
        , puzzle = {}
        console.log(typeof width)
        let num = 0
        const {left, top, menuWidth, isMenu} = this        
        , menuWidthAdded = isMenu ? menuWidth : 0
        for(let i = -4; i < 4; i++) {
            for(let j = -7; j < 10; j++) {
            let x = i * width + width/2 + left + menuWidthAdded
            , y = j * width + width/2 + top 
            if (i === -4 && j === -7) console.log(x)
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
