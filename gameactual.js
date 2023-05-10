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
6)  course corrected //basically unused
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



        //paper object
        if(!this.getFlag(0)){ //paper not picked up
            //add the paper object
            let paper = this.add.rectangle(this.width / 2, this.height / 2, 40, 60, '#efeed3');
            paper.setAngle(20);
            paper.setInteractive();
            //on mouseover
            paper.on('pointerover', () => {
                if(!this.dialogueHappening){
                    this.overactive = true;
                    this.descText.setText(this.mouseover.paper.text);
                    this.time.delayedCall(this.mouseover.paper.text.length * 100, () => {
                        if(this.overactive) this.descText.setText(this.mouseover.paper.longtext);
                    });
                }
            });
            //on mouse not over
            paper.on('pointerout', () => {
                this.overactive = false;
                this.descText.setText("");
            });
            //on mouse/finger down
            paper.on('pointerdown', () => {
                //dont do anything if dialogue is happening
                if(!this.dialogueHappening){
                    paper.destroy();
                    this.setFlag(0);
                    this.descText.setText("");
                    this.overactive = false;
                }
            });
            //add the ui telling the player to click to pick it up
            //future self to past self : aint no time for that lmao
        }



        //add door to hall
        let hallDoor = this.add.rectangle(3 * this.width / 4, this.height / 2, 250, 400, '#101010');
        hallDoor.setInteractive();
        hallDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.setFlag(1);
                this.descText.setText("");
                this.overactive = false;
                this.gotoScene('hall');
            }
        });
        hallDoor.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.hallDoor.text);
                this.time.delayedCall(this.mouseover.hallDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.hallDoor.longtext);
                });
            }
        });
        hallDoor.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //add player's cryo chamber, the exit point of this game
        //do the checks to determine if the player can even leave
        let check = true;
        for(let x = 2; x <= 7; x++){ if(!this.getFlag(x)) check = false; }
        let playerCryo = this.add.text(this.width / 2, 4 * this.height / 5, "Return to cryostasis", {
            fontSize: 40,
        });
        playerCryo.setOrigin(.5);
        playerCryo.setInteractive();
        playerCryo.setDepth(10);
        playerCryo.on('pointerdown', () =>{
            if(!this.dialogueHappening && check){
                this.descText.setText("");
                this.overactive = false;
                let checkSpecial = true;
                for(let x = 8; x <= 11; x++){ if(!this.getFlag(x)) checkSpecial = false; }
                if(checkSpecial) this.scene.start('outro2');
                else this.scene.start('outro1');
            }
        });
        playerCryo.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                if(check){
                    this.descText.setText(this.mouseover.playerCryoyes.text);
                    this.time.delayedCall(this.mouseover.playerCryoyes.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.playerCryoyes.longtext);
                });
                }else{
                    this.descText.setText(this.mouseover.playerCryono.text);
                    this.time.delayedCall(this.mouseover.playerCryono.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.playerCryono.longtext);
                });
                }
            }
        });
        playerCryo.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //npc cryo chambers
        let chamber1 = this.add.rectangle(this.width / 3, this.height / 2, 300, 600, '#222');
        chamber1.setInteractive();
        chamber1.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.cryoChamber.text);
                this.time.delayedCall(this.mouseover.cryoChamber.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.cryoChamber.longtext);
                });
            }
        });
        chamber1.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });
        let chamber2 = this.add.rectangle(this.width / 8, this.height / 2, 300, 600, '#222');
        chamber2.setInteractive();
        chamber2.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.cryoChamber.text);
                this.time.delayedCall(this.mouseover.cryoChamber.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.cryoChamber.longtext);
                });
            }
        });
        chamber2.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //first time seeing room dialogue
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
        //cryo door
        let cryoDoor = this.add.rectangle(2 * this.width / 7, this.height / 4, 250, 400, '#101010');
        cryoDoor.setInteractive();
        cryoDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.descText.setText("");
                this.overactive = false;
                this.gotoScene('cryo');
            }
        });
        cryoDoor.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.cryoDoor.text);
                this.time.delayedCall(this.mouseover.cryoDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.cryoDoor.longtext);
                });
            }
        });
        cryoDoor.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //hydroponics door
        let hydroDoor = this.add.rectangle(4 * this.width / 7, this.height / 4, 250, 400, '#101010');
        hydroDoor.setInteractive();
        hydroDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.descText.setText("");
                this.overactive = false;
                this.gotoScene('hydro');
            }
        });
        hydroDoor.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.hydroDoor.text);
                this.time.delayedCall(this.mouseover.hydroDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.hydroDoor.longtext);
                });
            }
        });
        hydroDoor.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //cargo bay door
        let cargoDoor = this.add.rectangle(6 * this.width / 7, this.height / 4, 250, 400, '#101010');
        cargoDoor.setInteractive();
        cargoDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.descText.setText("");
                this.overactive = false;
                this.gotoScene('cargo');
            }
        });
        cargoDoor.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.cargoDoor.text);
                this.time.delayedCall(this.mouseover.cargoDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.cargoDoor.longtext);
                });
            }
        });
        cargoDoor.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //bridge door
        let bridgeDoor = this.add.rectangle(2 * this.width / 7, 3 *  this.height / 4, 250, 400, '#101010');
        bridgeDoor.setInteractive();
        bridgeDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.descText.setText("");
                this.overactive = false;
                this.gotoScene('bridge');
            }
        });
        bridgeDoor.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.bridgeDoor.text);
                this.time.delayedCall(this.mouseover.bridgeDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.bridgeDoor.longtext);
                });
            }
        });
        bridgeDoor.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //engineroom door
        let engineDoor = this.add.rectangle(4 * this.width / 7, 3 *  this.height / 4, 250, 400, '#101010');
        engineDoor.setInteractive();
        engineDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.descText.setText("");
                this.overactive = false;
                this.gotoScene('engine');
            }
        });
        engineDoor.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.engineDoor.text);
                this.time.delayedCall(this.mouseover.engineDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.engineDoor.longtext);
                });
            }
        });
        engineDoor.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //life support door
        let lifeDoor = this.add.rectangle(6 * this.width / 7, 3 *  this.height / 4, 250, 400, '#101010');
        lifeDoor.setInteractive();
        lifeDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.descText.setText("");
                this.overactive = false;
                this.gotoScene('lifes');
            }
        });
        lifeDoor.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.lifeDoor.text);
                this.time.delayedCall(this.mouseover.lifeDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.lifeDoor.longtext);
                });
            }
        });
        lifeDoor.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //first time dialogue
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
        //hall door
        let hallDoor = this.add.rectangle(3 * this.width / 4, this.height / 2, 250, 400, '#101010');
        hallDoor.setInteractive();
        hallDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.descText.setText("");
                this.overactive = false;
                this.gotoScene('hall');
            }
        });
        hallDoor.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.hallDoor.text);
                this.time.delayedCall(this.mouseover.hallDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.hallDoor.longtext);
                });
            }
        });
        hallDoor.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
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
        //hall door
        let hallDoor = this.add.rectangle(3 * this.width / 4, this.height / 2, 250, 400, '#101010');
        hallDoor.setInteractive();
        hallDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.descText.setText("");
                this.overactive = false;
                this.gotoScene('hall');
            }
        });
        hallDoor.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.hallDoor.text);
                this.time.delayedCall(this.mouseover.hallDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.hallDoor.longtext);
                });
            }
        });
        hallDoor.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
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
        //hall door
        let hallDoor = this.add.rectangle(3 * this.width / 4, this.height / 2, 250, 400, '#101010');
        hallDoor.setInteractive();
        hallDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.descText.setText("");
                this.overactive = false;
                this.gotoScene('hall');
            }
        });
        hallDoor.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.hallDoor.text);
                this.time.delayedCall(this.mouseover.hallDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.hallDoor.longtext);
                });
            }
        });
        hallDoor.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
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
        //hall door
        let hallDoor = this.add.rectangle(3 * this.width / 4, this.height / 2, 250, 400, '#101010');
        hallDoor.setInteractive();
        hallDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.descText.setText("");
                this.overactive = false;
                this.gotoScene('hall');
            }
        });
        hallDoor.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.hallDoor.text);
                this.time.delayedCall(this.mouseover.hallDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.hallDoor.longtext);
                });
            }
        });
        hallDoor.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
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
        //hall door
        let hallDoor = this.add.rectangle(3 * this.width / 4, this.height / 2, 250, 400, '#101010');
        hallDoor.setInteractive();
        hallDoor.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.descText.setText("");
                this.overactive = false;
                this.gotoScene('hall');
            }
        });
        hallDoor.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.hallDoor.text);
                this.time.delayedCall(this.mouseover.hallDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.hallDoor.longtext);
                });
            }
        });
        hallDoor.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
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

class OutroNormal extends Phaser.Scene{
    constructor() {super('outro1');}

    create(){
        
    }
}

class OutroSpecial extends Phaser.Scene{
    constructor() {super('outro2');}

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
    scene: [Intro, CryoChamber, Hallway, Hydroponics, CargoBay, LifeSupport, EngineRoom, Bridge, OutroNormal, OutroSpecial],
    title: "Space Maintenance",
});