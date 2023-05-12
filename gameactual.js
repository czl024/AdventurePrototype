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
        this.add.image(this.width/2, this.height/2, 'bg2');
        this.addPaper();

        //initialize on game startup
        if(this.flags.length == 0){
            //initialize flags
            for(let x = 0; x < 21; x++) this.flags.push(false);
            //show the cryo intro text
        }



        //paper object
        if(!this.getFlag(0)){ //paper not picked up
            //add the paper object
            let paper = this.add.image(this.width / 2 + 200, this.height / 2 + 100, 'paper');
            paper.setScale(1/10);
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
                    this.addPaper();
                    this.descText.setText("");
                    this.overactive = false;
                    let infotext = this.add.text(125, 60, "<= Hover over to read at any time.", {
                        fontSize : 30
                    });
                    this.add.tween({
                        targets: infotext,
                        alpha: {from: 1, to: 0, ease: 'quint.in'},
                        duration: 3000,
                        onComplete: () => {infotext.destroy()}
                    })
                }
            });
            //add the ui telling the player to click to pick it up
            //future self to past self : aint no time for that lmao
        }



        //add door to hall
        let hallDoor = this.add.sprite(this.width / 2 + 500, 703);
        hallDoor.play('door2close');
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
                hallDoor.play('door2open');
                this.overactive = true;
                this.descText.setText(this.mouseover.hallDoor.text);
                this.time.delayedCall(this.mouseover.hallDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.hallDoor.longtext);
                });
            }
        });
        hallDoor.on('pointerout', () => {
            hallDoor.play('door2close');
            this.overactive = false;
            this.descText.setText("");
        });



        //add player's cryo chamber, the exit point of this game
        //do the checks to determine if the player can even leave
        let check = true;
        for(let x = 2; x <= 7; x++){ if(!this.getFlag(x)) check = false; }
        if(check){
            let playerCryo = this.add.text(this.width / 2, 1 * this.height / 6, "Return to cryostasis", {
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
        }



        //npc cryo chambers
        let chamber1 = this.add.rectangle(this.width / 3, this.height / 2 + 100, 300, 600, '#222');
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
        let chamber2 = this.add.rectangle(this.width / 8, 2 * this.height / 3 + 25, 300, 600, '#222');
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
        this.add.image(this.width / 2, this.height / 2, 'bg1');
        this.addPaper();
        
        //cryo door
        let cryoDoor = this.add.sprite(this.width / 9, this.height / 2 + 85);
        cryoDoor.play('door1close');
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
                cryoDoor.play('door1open');
                this.overactive = true;
                this.descText.setText(this.mouseover.cryoDoor.text);
                this.time.delayedCall(this.mouseover.cryoDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.cryoDoor.longtext);
                });
            }
        });
        cryoDoor.on('pointerout', () => {
            cryoDoor.play('door1close');
            this.overactive = false;
            this.descText.setText("");
        });



        //hydroponics door
        let hydroDoor = this.add.sprite(1 * this.width / 3 - 100, this.height / 2 + 23, 250, 400);
        hydroDoor.play('door3close');
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
                hydroDoor.play('door3open');
                this.overactive = true;
                this.descText.setText(this.mouseover.hydroDoor.text);
                this.time.delayedCall(this.mouseover.hydroDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.hydroDoor.longtext);
                });
            }
        });
        hydroDoor.on('pointerout', () => {
            hydroDoor.play('door3close');
            this.overactive = false;
            this.descText.setText("");
        });



        //cargo bay door
        let cargoDoor = this.add.sprite(this.width / 3 + 200, this.height / 2 + 23);
        cargoDoor.play('door3close');
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
                cargoDoor.play('door3open');
                this.overactive = true;
                this.descText.setText(this.mouseover.cargoDoor.text);
                this.time.delayedCall(this.mouseover.cargoDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.cargoDoor.longtext);
                });
            }
        });
        cargoDoor.on('pointerout', () => {
            cargoDoor.play('door3close');
            this.overactive = false;
            this.descText.setText("");
        });



        //bridge door
        let bridgeDoor = this.add.sprite(9 * this.width / 10 + 30, this.height / 2 + 78);
        bridgeDoor.play('door1close')
        bridgeDoor.flipX = true;
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
                bridgeDoor.play('door1open')
                this.overactive = true;
                this.descText.setText(this.mouseover.bridgeDoor.text);
                this.time.delayedCall(this.mouseover.bridgeDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.bridgeDoor.longtext);
                });
            }
        });
        bridgeDoor.on('pointerout', () => {
            bridgeDoor.play('door1close')
            this.overactive = false;
            this.descText.setText("");
        });



        //engineroom door
        let engineDoor = this.add.sprite(4 * this.width / 7 + 30, this.height / 2 + 23);
        engineDoor.play('door3close');
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
                engineDoor.play('door3open');
                this.overactive = true;
                this.descText.setText(this.mouseover.engineDoor.text);
                this.time.delayedCall(this.mouseover.engineDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.engineDoor.longtext);
                });
            }
        });
        engineDoor.on('pointerout', () => {
            engineDoor.play('door3close');
            this.overactive = false;
            this.descText.setText("");
        });



        //life support door
        let lifeDoor = this.add.sprite(5 * this.width / 7 + 50, this.height / 2 + 23);
        lifeDoor.play('door3close');
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
                lifeDoor.play('door3open');
                this.overactive = true;
                this.descText.setText(this.mouseover.lifeDoor.text);
                this.time.delayedCall(this.mouseover.lifeDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.lifeDoor.longtext);
                });
            }
        });
        lifeDoor.on('pointerout', () => {
            lifeDoor.play('door3close');
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
        this.add.image(this.width / 2, this.height / 2, 'bg1');
        this.addPaper();

        //hall door
        let hallDoor = this.add.sprite(this.width / 9, this.height / 2 + 85);
        hallDoor.play('door1close');
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
                hallDoor.play('door1open');
                this.overactive = true;
                this.descText.setText(this.mouseover.hallDoor.text);
                this.time.delayedCall(this.mouseover.hallDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.hallDoor.longtext);
                });
            }
        });
        hallDoor.on('pointerout', () => {
            hallDoor.play('door1close');
            this.overactive = false;
            this.descText.setText("");
        });



        //water filter
        let filter = this.add.rectangle(3 * this.width / 4, this.height / 2, 400, 700, '#101010');
        filter.setInteractive()
        filter.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                if(this.hasItem("Ladder")){
                    this.startDialogue("filteryes");
                    this.loseItem("Ladder");
                }else if(!this.getFlag(3)) this.startDialogue("filterno");
                
            }
        });
        filter.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.waterFilter.text);
                this.time.delayedCall(this.mouseover.waterFilter.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.waterFilter.longtext);
                });
            }
        });
        filter.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //crop module
        let crops = this.add.rectangle(this.width / 3, this.height / 2, 500, 500, '#101010');
        crops.setInteractive()
        crops.on('pointerdown', () =>{
            if(!this.dialogueHappening && !this.getFlag(4)){
                this.startDialogue("cropmodule");
            }
        });
        crops.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.cropModule.text);
                this.time.delayedCall(this.mouseover.cropModule.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.cropModule.longtext);
                });
            }
        });
        crops.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //meat synthesizer
        let meats = this.add.rectangle(this.width / 2 + 80, this.height / 2, 300, 200, '#101010');
        meats.setInteractive()
        meats.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                if(!this.getFlag(9)) this.startDialogue("meatmodulehungry");
                else this.startDialogue("meatmoduleno");
            }
        });
        meats.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.meatModule.text);
                this.time.delayedCall(this.mouseover.meatModule.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.meatModule.longtext);
                });
            }
        });
        meats.on('pointerout', () => {
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
        this.add.image(this.width / 2, this.height / 2, 'bg1');
        this.addPaper();

        //hall door
        let hallDoor = this.add.sprite(this.width / 9, this.height / 2 + 85);
        hallDoor.play('door1close')
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
                hallDoor.play('door1open')
                this.overactive = true;
                this.descText.setText(this.mouseover.hallDoor.text);
                
                this.time.delayedCall(this.mouseover.hallDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.hallDoor.longtext);
                });
            }
        });
        hallDoor.on('pointerout', () => {
            hallDoor.play('door1close')
            this.overactive = false;
            this.descText.setText("");
        });



        //ladder
        if(!this.hasItem("Ladder")){
            let ladder = this.add.rectangle(7 * this.width / 8, this.height / 2, 100, 600, '#101010');
            ladder.setInteractive();
            ladder.setAngle(10);
            ladder.on('pointerdown', () =>{
                if(!this.dialogueHappening){
                    if(!this.getFlag(3)){
                        this.gainItem("Ladder");
                        ladder.destroy();
                        this.descText.setText("");
                        this.overactive = false;
                    }else this.descText.setText("You don't need a ladder anymore");
                }
            });
            ladder.on('pointerover', () => {
                if(!this.dialogueHappening){
                    this.overactive = true;
                    this.descText.setText(this.mouseover.ladder.text);
                    this.time.delayedCall(this.mouseover.ladder.text.length * 100, () => {
                        if(this.overactive) this.descText.setText(this.mouseover.ladder.longtext);
                    });
                }
            });
            ladder.on('pointerout', () => {
                this.overactive = false;
                this.descText.setText("");
            });
        }



        //ration crate
        let ratcrate = this.add.rectangle(this.width / 5 + 50, this.height - 50, 300, 300, '#101010');
        ratcrate.setInteractive();
        ratcrate.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                if(!this.getFlag(2)){
                    this.descText.setText("");
                    this.overactive = false;
                    this.startDialogue("rationcrate");
                }else this.startDialogue("rationcrateno");
            }
        });
        ratcrate.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.rationcrate.text);
                this.time.delayedCall(this.mouseover.rationcrate.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.rationcrate.longtext);
                });
            }
        });
        ratcrate.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //crates
        let cargo = this.add.rectangle(6 * this.width / 7, 3 * this.height / 4 + 50, 400, 400, '#101010');
        cargo.setInteractive();
        cargo.on('pointerdown', () =>{
            if(!this.dialogueHappening && !this.getFlag(3)){
                this.descText.setText("");
                this.overactive = false;
                this.startDialogue("crateexamine");
            }
        });
        cargo.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.crates.text);
                this.time.delayedCall(this.mouseover.crates.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.crates.longtext);
                });
            }
        });
        cargo.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //cargo bay door
        let bigdoor = this.add.rectangle(this.width / 2, this.height / 2 - 65, 900, 550, '#101010');
        bigdoor.setInteractive();
        bigdoor.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.bigdoor.text);
                this.time.delayedCall(this.mouseover.bigdoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.bigdoor.longtext);
                });
            }
        });
        bigdoor.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });


        //door panel
        let doorpanel = this.add.rectangle(4 * this.width / 5 - 50, this.height / 2, 50, 80, '#101010');
        doorpanel.setInteractive();
        doorpanel.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.doorpanel.text);
                this.time.delayedCall(this.mouseover.doorpanel.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.doorpanel.longtext);
                });
            }
        });
        doorpanel.on('pointerout', () => {
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
        this.add.image(this.width / 2, this.height / 2, 'bg2');
        this.addPaper();

        //hall door
        let hallDoor = this.add.sprite(2 * this.width / 3 - 100, this.height / 2 + 88);
        hallDoor.play('door2close')
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
                hallDoor.play('door2open')
                this.overactive = true;
                this.descText.setText(this.mouseover.hallDoor.text);
                this.time.delayedCall(this.mouseover.hallDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.hallDoor.longtext);
                });
            }
        });
        hallDoor.on('pointerout', () => {
            hallDoor.play('door2close')
            this.overactive = false;
            this.descText.setText("");
        });



        //terminal
        let term = this.add.rectangle(6 * this.width / 7, this.height / 2 + 75, 400, 300, '#101010');
        term.setInteractive();
        term.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                let check = true;
                for(let x = 8; x <= 11; x++) if(!this.getFlag(x)) check = false;
                if(!this.getFlag(11)){
                    this.descText.setText("");
                    this.overactive = false;
                    this.startDialogue("lifesterminala");
                }else if (check){
                    this.descText.setText("");
                    this.overactive = false;
                    this.startDialogue("lifesterminalaspecial");
                }
            }
        });
        term.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.lifesterminal.text);
                this.time.delayedCall(this.mouseover.lifesterminal.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.lifesterminal.longtext);
                });
            }
        });
        term.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //service access
        let serviceaccess = this.add.sprite(this.width / 3 + 100, this.height / 2 + 90);
        serviceaccess.play('door2close')
        serviceaccess.flipX = true;
        serviceaccess.setInteractive();
        serviceaccess.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.serviceaccess.text);
                this.time.delayedCall(this.mouseover.serviceaccess.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.serviceaccess.longtext);
                });
            }
        });
        serviceaccess.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //gas purifier
        let gasthingy = this.add.rectangle(this.width / 8 + 50, this.height / 2 + 150, 450, 700, '#101010');
        gasthingy.setInteractive();
        gasthingy.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.gasthingy.text);
                this.time.delayedCall(this.mouseover.gasthingy.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.gasthingy.longtext);
                });
            }
        });
        gasthingy.on('pointerout', () => {
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
        this.add.image(this.width / 2, this.height / 2, 'bg1');
        this.addPaper();

        //hall door
        let hallDoor = this.add.sprite(2 * this.width / 3 - 100, this.height / 2 + 25);
        hallDoor.play('door3close')
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
                hallDoor.play('door3open')
                this.overactive = true;
                this.descText.setText(this.mouseover.hallDoor.text);
                this.time.delayedCall(this.mouseover.hallDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.hallDoor.longtext);
                });
            }
        });
        hallDoor.on('pointerout', () => {
            hallDoor.play('door3close')
            this.overactive = false;
            this.descText.setText("");
        });



        //engine 1
        let eng1 = this.add.rectangle(this.width / 6, this.height / 2 + 100, 500, 700, '#101010');
        eng1.setInteractive();
        eng1.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.engine.text);
                this.time.delayedCall(this.mouseover.engine.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.engine.longtext);
                });
            }
        });
        eng1.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //engine 2
        let eng2 = this.add.rectangle(5 * this.width / 6, this.height / 2 + 100, 500, 700, '#101010');
        eng2.setInteractive();
        eng2.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.engine.text);
                this.time.delayedCall(this.mouseover.engine.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.engine.longtext);
                });
            }
        });
        eng2.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //engine terminal
        let term = this.add.rectangle(3 * this.width / 7, this.height / 2, 300, 175, '#101010');
        term.setInteractive();
        term.on('pointerdown', () =>{
            if(!this.dialogueHappening && !this.getFlag(5)){
                this.descText.setText("");
                this.overactive = false;
                this.startDialogue("engineterminal");
            }
        });
        term.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.enginesterminal.text);
                this.time.delayedCall(this.mouseover.enginesterminal.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.enginesterminal.longtext);
                });
            }
        });
        term.on('pointerout', () => {
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
        this.add.image(this.width / 2, this.height / 2, 'bg1');
        this.addPaper();

        //hall door
        let hallDoor = this.add.sprite(this.width / 9, this.height / 2 + 85);
        hallDoor.play('door1close')
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
                hallDoor.play('door1open')
                this.overactive = true;
                this.descText.setText(this.mouseover.hallDoor.text);
                this.time.delayedCall(this.mouseover.hallDoor.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.hallDoor.longtext);
                });
            }
        });
        hallDoor.on('pointerout', () => {
            hallDoor.play('door1close')
            this.overactive = false;
            this.descText.setText("");
        });



        //ship ai
        let shipAI = this.add.circle(this.width / 2 + 30, this.height / 2 - 75, 125, '#6dd37f');
        shipAI.setInteractive();
        shipAI.on('pointerdown', () =>{
            if(!this.dialogueHappening){
                this.descText.setText("");
                this.overactive = false;
                if(!this.getFlag(20)) this.startDialogue('aiintro0');
                else this.startDialogue('aiintrog');
            }
        });
        shipAI.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                this.descText.setText(this.mouseover.shipai.text);
                this.time.delayedCall(this.mouseover.shipai.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.shipai.longtext);
                });
            }
        });
        shipAI.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //hydro status screen
        let hstat = this.add.rectangle(this.width / 3, this.height / 5 + 75, 400, 200, '#101010');
        hstat.setInteractive();
        hstat.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                if(this.getFlag(3) && this.getFlag(4)){
                    this.descText.setText(this.mouseover.hstatyes.text);
                    this.time.delayedCall(this.mouseover.hstatyes.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.hstatyes.longtext);
                    });
                }else{
                    this.descText.setText(this.mouseover.hstatno.text);
                    this.time.delayedCall(this.mouseover.hstatno.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.hstatno.longtext);
                    });
                }
            }
        });
        hstat.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //cryo status screen
        let cstat = this.add.rectangle(this.width / 3, 2 * this.height / 3 - 100, 400, 200, '#101010');
        cstat.setInteractive();
        cstat.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                if(!this.getFlag(12)){
                    this.descText.setText(this.mouseover.cstatyes.text);
                    this.time.delayedCall(this.mouseover.cstatyes.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.cstatyes.longtext);
                    });
                }else{
                    this.descText.setText(this.mouseover.cstatno.text);
                    this.time.delayedCall(this.mouseover.cstatno.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.cstatno.longtext);
                    });
                }
            }
        });
        cstat.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //engine status screen
        let estat = this.add.rectangle(3 * this.width / 4 - 100, this.height / 5 + 75, 400, 200, '#101010');
        estat.setInteractive();
        estat.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                if(this.getFlag(5)){
                    this.descText.setText(this.mouseover.estatyes.text);
                    this.time.delayedCall(this.mouseover.estatyes.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.estatyes.longtext);
                    });
                }else{
                    this.descText.setText(this.mouseover.estatno.text);
                    this.time.delayedCall(this.mouseover.estatno.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.estatno.longtext);
                    });
                }
            }
        });
        estat.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        //ai status screen
        let astat = this.add.rectangle(3 * this.width / 4 - 100, 2 * this.height / 3 - 100, 400, 200, '#101010');
        astat.setInteractive();
        astat.on('pointerover', () => {
            if(!this.dialogueHappening){
                this.overactive = true;
                if(this.getFlag(7)){
                    this.descText.setText(this.mouseover.astatyes.text);
                    this.time.delayedCall(this.mouseover.astatyes.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.astatyes.longtext);
                    });
                }else{
                    this.descText.setText(this.mouseover.astatno.text);
                    this.time.delayedCall(this.mouseover.astatno.text.length * 100, () => {
                    if(this.overactive) this.descText.setText(this.mouseover.astatno.longtext);
                    });
                }
            }
        });
        astat.on('pointerout', () => {
            this.overactive = false;
            this.descText.setText("");
        });



        if(!this.getFlag(17)){
            this.startDialogue("bridge");
        }
    }
}

class Intro extends Phaser.Scene{
    constructor() {super('intro');}

    //i JUST learned you can load all images in the first scene and use them everywhere else
    preload(){
        this.load.image('bg1', "assets/bg1.png");
        this.load.image('bg2', "assets/bg2.png");
        this.load.spritesheet('door1', "assets/door1ss-278x550.png", {frameWidth : 274, frameHeight : 550});
        this.load.spritesheet('door2', "assets/door2ss-274x520.png", {frameWidth : 274, frameHeight : 520});
        this.load.spritesheet('door3', "assets/door3ss-274x381.png", {frameWidth : 229, frameHeight : 381});
        this.load.image('paper', "assets/paper.png");
    }

    create(){
        this.anims.create({
            key: 'door1close',
            frames: this.anims.generateFrameNumbers('door1', {frames: [0]}),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'door1open',
            frames: this.anims.generateFrameNumbers('door1', {frames: [1]}),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'door2close',
            frames: this.anims.generateFrameNumbers('door2', {frames: [0]}),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'door2open',
            frames: this.anims.generateFrameNumbers('door2', {frames: [1]}),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'door3close',
            frames: this.anims.generateFrameNumbers('door3', {frames: [0]}),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'door3open',
            frames: this.anims.generateFrameNumbers('door3', {frames: [1]}),
            frameRate: 1,
            repeat: -1
        });

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