/*
FLAG INDICES
------------
Mandatory Flags
0)  paper picked up
1)  first door clicked
2)  player has eaten
3)  water filters cleaned
4)  fertilizer added
5)  engines calibrated
6)  course corrected
7)  ai integrity confirmed
-----------------------------
Secret Ending PreReq Flags
8)  passenger info revealed by ai
9)  eating from the hydro bay
10) cargo deeply examined
11) cryo manifest examined
-----------------------------
Secret Ending Flag
12) cryo chambers sabotaged
-----------------------------
Location Flags
13) cryo
14) hall
15) hydro
16) cargo
17) bridge
18) engine
19) life support
 */

class CryoChamber extends AdventureScene{
    constructor() {super('cryo', "Cryo Chamber");}

    onEnter(){
        //initialize on game startup
        if(this.flags.length == 0){
            //initialize flags
            for(let x = 0; x < 20; x++) this.flags.push(false);
            //show the cryo intro text
        }

        //initial paper thingy
        if(this.getFlag(0)){ //paper not picked up
            //add the paper object
            let paper = this.add.text();

            //add the ui telling the player to click to pick it up
        }
    }
}

class Hallway extends AdventureScene{
    constructor(){
        super('hall', "Hallway");
    }

    onEnter(){

    }
}

class Hydroponics extends AdventureScene{
    constructor(){
        super('hydro', "Hydroponics");
    }

    onEnter(){

    }
}

class CargoBay extends AdventureScene{
    constructor(){
        super('cargo', "Cargo Bay");
    }

    onEnter(){

    }
}

class LifeSupport extends AdventureScene{
    constructor(){
        super('lifes', "Life Support");
    }

    onEnter(){

    }
}

class EngineRoom extends AdventureScene{
    constructor(){
        super('engine', "Engine Room");
    }

    onEnter(){

    }
}

class Bridge extends AdventureScene{
    constructor(){
        super('bridge', "Bridge");
    }

    onEnter(){

    }
}

class Intro extends Phaser.Scene{
    constructor() {super('intro');}

    create(){

    }
}

class Outro extends Phaser.Scene{
    constructor() {super('outtro');}

    create(){
        
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, CryoChamber, Hallway, Hydroponics, CargoBay, LifeSupport, EngineRoom, Bridge, Outro],
    title: "Space Maintenance",
});