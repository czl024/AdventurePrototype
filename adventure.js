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
        this.dialogue = this.cache.json.get("dialogue");
        console.log(this.dialogue);

        this.transitionDuration = 1000;
        this.dialogueHappening = false;

        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        //side box
        this.add.rectangle(this.width * .75, 0, this.width * 0.25, this.height).setOrigin(0, 0).setFillStyle(0);
        //scene name
        this.add.text(this.width * 0.75 + this.s, this.s)
            .setText(this.name)
            .setStyle({ fontSize: `${3 * this.s}px` })
            .setWordWrapWidth(this.width * 0.25 - 2 * this.s);
        
        this.messageBox = this.add.text(this.width * 0.75 + this.s, this.height * 0.33)
            .setStyle({ fontSize: `${2 * this.s}px`, color: '#eea' })
            .setWordWrapWidth(this.width * 0.25 - 2 * this.s);

        //the "Inventory" text
        this.inventoryBanner = this.add.text(this.width * 0.75 + this.s, this.height * 0.66)
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setText("Inventory")
            .setAlpha(0);

            
        this.inventoryTexts = [];
        this.updateInventory();

        //fullscreen button
        this.add.text(this.width-3*this.s, this.height-3*this.s, "📺")
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Fullscreen?'))
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });

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
        this.dialogueHappening = true;
        //load the appropriate node
        //render the dialogue box
        //print the name
        //print the text
        //on click
            //if no dialogue after current
                //if there are links
                //else (no links)
                    //move/delete the dialogue box
                    this.dialogueHappening = false;
    }
}