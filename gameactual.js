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
Location Flags, set to true as soon as player enters
meant to show one-time description of room
13) cryo
14) hall
15) hydro
16) cargo
17) bridge
18) engine
19) life support
----------------------------
Flags I put in later after solidifying the above
20) talked to the ai
 */

class CryoChamber extends AdventureScene{
    constructor() {super('cryo', "Cryo Chamber");}

    onEnter(){
        //initialize on game startup
        if(this.flags.length == 0){
            //initialize flags
            for(let x = 0; x < 21; x++) this.flags.push(false);
            //show the cryo intro text
        }

        //initial paper thingy
        if(!this.getFlag(0)){ //paper not picked up
            //add the paper object
            let paper = this.add.rectangle(this.width / 2, this.height / 2, 40, 60, '#efeed3');
            paper.setAngle(20);
            paper.setInteractive();
            paper.on('pointerdown', () => {
                //dont do anything if dialogue is happening
                if(!this.dialogueHappening){
                    paper.destroy();
                    this.setFlag(0);
                }
            })
            //add the ui telling the player to click to pick it up
        }

        //add door to hall
        let hallDoor = this.add.rectangle(3 * this.width / 4, this.height / 2, 250, 400, '#101010');
        hallDoor.setInteractive();
        hallDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.setFlag(1);
                this.gotoScene('hall');
            }
        });

        if(!this.getFlag(13)){
            this.startDialogue("cryo");
        }
    }
}

class Hallway extends AdventureScene{
    constructor(){
        super('hall', "Hallway");
    }

    onEnter(){
        let cryoDoor = this.add.rectangle(2 * this.width / 7, this.height / 4, 250, 400, '#101010');
        cryoDoor.setInteractive();
        cryoDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.gotoScene('cryo');
            }
        });

        let hydroDoor = this.add.rectangle(4 * this.width / 7, this.height / 4, 250, 400, '#101010');
        hydroDoor.setInteractive();
        hydroDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.gotoScene('hydro');
            }
        });

        let cargoDoor = this.add.rectangle(6 * this.width / 7, this.height / 4, 250, 400, '#101010');
        cargoDoor.setInteractive();
        cargoDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.gotoScene('cargo');
            }
        });

        let bridgeDoor = this.add.rectangle(2 * this.width / 7, 3 *  this.height / 4, 250, 400, '#101010');
        bridgeDoor.setInteractive();
        bridgeDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.gotoScene('bridge');
            }
        });

        let engineDoor = this.add.rectangle(4 * this.width / 7, 3 *  this.height / 4, 250, 400, '#101010');
        engineDoor.setInteractive();
        engineDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.gotoScene('engine');
            }
        });

        let lifeDoor = this.add.rectangle(6 * this.width / 7, 3 *  this.height / 4, 250, 400, '#101010');
        lifeDoor.setInteractive();
        lifeDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.gotoScene('lifes');
            }
        });

        if(!this.getFlag(14)){
            console.log(this.getFlag(14));
            this.setFlag(14);
            this.startDialogue("hall");
            
            console.log(this.getFlag(14));
        }
    }
}

class Hydroponics extends AdventureScene{
    constructor(){
        super('hydro', "Hydroponics");
    }

    onEnter(){
        let hallDoor = this.add.rectangle(3 * this.width / 4, this.height / 2, 250, 400, '#101010');
        hallDoor.setInteractive();
        hallDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.gotoScene('hall');
            }
        });

        if(!this.getFlag(15)){
            this.startDialogue("hydro");
        }
    }
}

class CargoBay extends AdventureScene{
    constructor(){
        super('cargo', "Cargo Bay");
    }

    onEnter(){
        let hallDoor = this.add.rectangle(3 * this.width / 4, this.height / 2, 250, 400, '#101010');
        hallDoor.setInteractive();
        hallDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.gotoScene('hall');
            }
        });

        if(!this.getFlag(16)){
            this.startDialogue("cargo");
        }
    }
}

class LifeSupport extends AdventureScene{
    constructor(){
        super('lifes', "Life Support");
    }

    onEnter(){
        let hallDoor = this.add.rectangle(3 * this.width / 4, this.height / 2, 250, 400, '#101010');
        hallDoor.setInteractive();
        hallDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.gotoScene('hall');
            }
        });

        if(!this.getFlag(19)){
            this.startDialogue("life support");
        }
    }
}

class EngineRoom extends AdventureScene{
    constructor(){
        super('engine', "Engine Room");
    }

    onEnter(){
        let hallDoor = this.add.rectangle(3 * this.width / 4, this.height / 2, 250, 400, '#101010');
        hallDoor.setInteractive();
        hallDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.gotoScene('hall');
            }
        });

        if(!this.getFlag(18)){
            this.startDialogue("engine");
        }
    }
}

class Bridge extends AdventureScene{
    constructor(){
        super('bridge', "Bridge");
    }

    onEnter(){
        let hallDoor = this.add.rectangle(3 * this.width / 4, this.height / 2, 250, 400, '#101010');
        hallDoor.setInteractive();
        hallDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.gotoScene('hall');
            }
        });

        let shipAI = this.add.circle(this.width / 2, this.height / 2, 100, '#6dd37f');
        shipAI.setInteractive();
        shipAI.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                if(!this.getFlag(20)) this.startDialogue('aiintro0');
                else this.startDialogue('aiintrog');
            }
        });

        if(!this.getFlag(17)){
            this.startDialogue("bridge");
        }
    }
}

class Intro extends Phaser.Scene{
    constructor() {super('intro');}

    create(){
        this.scene.start("cryo");
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