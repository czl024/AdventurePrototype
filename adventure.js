class AdventureScene extends Phaser.Scene {
    preload(){
        this.load.json('dialogue', './dialogue.json');
    }

    init(data) {
        this.inventory = data.inventory || [];
        this.flags = data.flags || [];
        this.dialogue;
    }

    constructor(key, name) {
        super(key);
        this.name = name;
    }

    create() {
        this.dialogue = this.cache.json.get("dialogue").dialogue;
        console.log(this.flags);

        this.transitionDuration = 1000;
        this.dialogueHappening = false;

        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        //the "Inventory" text, to reimplement later
        this.inventoryBanner = this.add.text(this.width * 0.75 + this.s, this.height * 0.66)
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setText("Inventory")
            .setAlpha(0);
        this.inventoryTexts = [];
        this.updateInventory();

        this.onEnter();

    }

    //puts message in the box
    showMessage(message) {
        this.messageBox.setText(message);
        this.tweens.add({
            targets: this.messageBox,
            alpha: { from: 1, to: 0 },
            easing: 'Quintic.in',
            duration: 4 * this.transitionDuration
        });
    }

    //gets inventory
    updateInventory() {
        //show inventory if anything is in it
        if (this.inventory.length > 0) {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 1,
                duration: this.transitionDuration
            });

        //hide inventory if nothing is in it
        } else {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 0,
                duration: this.transitionDuration
            });
        }

        //clear inventory texts
        if (this.inventoryTexts) {
            this.inventoryTexts.forEach((t) => t.destroy());
        }
        //sets a new empty array
        this.inventoryTexts = [];
        //position of text
        let h = this.height * 0.66 + 3 * this.s;
        //display each index of inventory
        this.inventory.forEach((e, i) => {
            let text = this.add.text(this.width * 0.75 + 2 * this.s, h, e)
                .setStyle({ fontSize: `${1.5 * this.s}px` })
                .setWordWrapWidth(this.width * 0.75 + 4 * this.s);
            h += text.height + this.s;
            this.inventoryTexts.push(text);
        });
    }

    //checks if item is held
    hasItem(item) {
        return this.inventory.includes(item);
    }

    //checks if a certain flag has been triggered
    getFlag(index){
        return(this.flags[index]);
    }

    //sets a flag to true, no flags should be able to be set to false
    setFlag(index){
        this.flags[index] = true;
    }

    //gains an item when called
    gainItem(item) {
        if (this.inventory.includes(item)) {
            console.warn('gaining item already held:', item);
            return;
        }
        this.inventory.push(item);
        this.updateInventory();
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x - 20, to: text.x },
                    alpha: { from: 0, to: 1 },
                    ease: 'Cubic.out',
                    duration: this.transitionDuration
                });
            }
        }
    }

    //removes an item when called
    loseItem(item) {
        if (!this.inventory.includes(item)) {
            console.warn('losing item not held:', item);
            return;
        }
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x, to: text.x + 20 },
                    alpha: { from: 1, to: 0 },
                    ease: 'Cubic.in',
                    duration: this.transitionDuration
                });
            }
        }
        this.time.delayedCall(500, () => {
            this.inventory = this.inventory.filter((e) => e != item);
            this.updateInventory();
        });
    }

    //go to scene
    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, { inventory: this.inventory, flags: this.flags, dialogue: this.dialogue});
        });
    }

    //function that runs when entering a scene, create objects and such in here
    onEnter() {
        console.warn('This AdventureScene did not implement onEnter():', this.constructor.name);
    }

    //start a dialogue with a given node, nodes in "dialogue.json"
    startDialogue(dialogueNode){
        let textX = 0;
        let textY = 2 * this.height / 3;
        let textWidth = this.width - 100;
        this.dialogueHappening = true;

        //load the appropriate node and information
        let node = this.dialogue[dialogueNode];
        let texts = node.text.length - 1;
        let currText = 0;
        let links = [];
        //set flags if set in dialogue
        node.flags.forEach((i) => {this.setFlag(i)});
        //render the dialogue box
        let textBox = this.add.rectangle(0, textY, this.width, this.height / 3, '0xDCDCDC');
        textBox.setOrigin(0);
        textBox.setAlpha(.5);
        //print the name
        let nameT;
        let nameBox;
        if(node.character != ""){
            nameBox = this.add.rectangle(this.width / 2, textY - 30, 400, 60, '0xDCDCDC');
            nameBox.setOrigin(.5);
            nameBox.setAlpha(.75);
            nameT = this.add.text(this.width / 2, textY - 30, node.character, {
                fontFamily: 'Helvetica',
                fontSize: 30,
                color: "#101010",
            });
            nameT.setOrigin(.5);
        }
        
        //print the text
        let text = this.add.text(textX + 50, textY + 50, node.text[currText], {
            fontFamily: 'Helvetica',
            fontSize: 45,
            color: "#f0f0f0",
            wordWrap: {width: textWidth, useAdvancedWrap: true}
        });
        textBox.setInteractive();
        //on click
        textBox.on('pointerdown', () => {
            //display the next text entry
            if(currText < texts){
                currText++;
                text.setText(node.text[currText]);
            //if no dialogue after current
            }else{
                textBox.removeInteractive();
                //if there are links
                if(node.links.length != 0){
                    
                    for(let x = 0; x < node.links.length; x++){
                        links.push(this.add.text(this.width / 2, (x + 1) * (textY / (node.links.length + 1)), node.linkText[node.links[x]], {
                            fontFamily: 'Georgia',
                            fontSize: 50,
                            color: "#f0f0f0",
                            wordWrap: {width: textWidth, useAdvancedWrap: true}
                        }));
                        links[x].setOrigin(.5);
                        links[x].setInteractive();
                        links[x].on('pointerdown', () => {
                            text.destroy();
                            if(nameT !== undefined) nameT.destroy();
                            textBox.destroy();
                            if(nameBox !== undefined) nameBox.destroy();
                            links.forEach((element) => {element.destroy()});
                            this.startDialogue(node.links[x]);
                        })
                    }
                //else (no links)
                }else{
                    text.destroy();
                    if(nameT !== undefined) nameT.destroy();
                    textBox.destroy();
                    if(nameBox !== undefined) nameBox.destroy();
                    this.dialogueHappening = false;
                }
            }
        })
    }
}