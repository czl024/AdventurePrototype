A simple adventure game by {who?} based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**       : CryoChamber, Hallway, Hydroponics, CargoBay, LifeSupport, EngineRoom, Bridge
- **2+ scenes *not* based on `AdventureScene`** : Intro, OutroNormal, OutroSpecial
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - dialogue trees
    - story flag markers

Experience requirements:
- **4+ locations in the game world**            : see first code requirement
- **2+ interactive objects in most scenes**     : well, every scene has a door and at least one other thing with hoverover text and interaction if you click it
- **Many objects have `pointerover` messages**  : the only objects without pointerover messages is the dialogue box and the background
- **Many objects have `pointerdown` effects**   : doors, story objects
- **Some objects are themselves animated**      : every door (theres 3 kinds)

Asset sources:
- all visual assets hastily made on GIMP

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` is the prototype for the game, `gameactual.js` used this framework to create the actual game scenes