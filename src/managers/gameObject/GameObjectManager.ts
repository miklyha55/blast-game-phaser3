import { GameObject } from './GameObject';
import { IROGameObjectCfg } from './types';

export class GameObjectManager {
    private readonly gameObjects: Array<GameObject>;

    constructor() {
        this.gameObjects = [];
    }

    createGameObject(props: IROGameObjectCfg): GameObject {
        const gameObject: GameObject = new GameObject(props);
        
        this.gameObjects.push(gameObject);
        gameObject.index = this.gameObjects.length - 1;
        
        gameObject.remove = () => {
            gameObject.conponents?.forEach(component => {
                component.remove();
            });

            gameObject.conponents = [];
            gameObject.container.destroy();
            gameObject.onRemove();

            this.gameObjects.forEach((gameObjectCompare, index) => {
                if(gameObject === gameObjectCompare) {
                    this.gameObjects.splice(index, 1);
                }
            });
        };

        return gameObject;
    }

    getGameObjectByName(name: string): GameObject {
        return this.gameObjects?.find((gameObject) => gameObject.name === name);
    }

    removeGameObjectByName(name: string) {
        this.gameObjects?.forEach(gameObject => {
            if(gameObject.name === name) {
                gameObject.remove();
            }
        });
    }
}
