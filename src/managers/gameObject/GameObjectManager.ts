import { GameObject } from './GameObject';
import { GAME_OBJECTS } from './constants';
import { GameObjectClassType, IROGameObjectCfg } from './types';

export class GameObjectManager {
    private gameObjects: Array<GameObject>;

    createGameObject(type: string, props: IROGameObjectCfg) {
        const gameObjectClassType: GameObjectClassType = GAME_OBJECTS.get(type);

        if(gameObjectClassType) {
            const gameObject: GameObject = new gameObjectClassType(props);
            
            this.gameObjects.push(gameObject);
            
            gameObject.remove = () => {
                const index: number = this.gameObjects.length - 1;

                gameObject.conponents?.forEach(component => {
                    component.remove();
                });

                gameObject.conponents = [];
                gameObject.container.destroy();

                this.gameObjects.splice(index, 1);
            };
        }
    }

    getGameObjectByName(name: string): GameObject {
        return this.gameObjects?.find((gameObject) => gameObject.name === name);
    }

    removeGameObjectByName(name: string) {
        this.gameObjects?.forEach((gameObject, index) => {
            if(gameObject.name === name) {
                gameObject.remove();
            }
        });
    }
}
