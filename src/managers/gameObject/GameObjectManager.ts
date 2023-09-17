import * as Phaser from 'phaser';

import { GameObject } from './GameObject';
import { GAME_OBJECTS } from './constants';
import { GameObjectClassType, IROGameObjectCfg } from './types';

export class GameObjectManager {
    private gameObjects: Array<GameObject>;

    createGameObject(type: string, props: IROGameObjectCfg) {
        const gameObjectClassType: GameObjectClassType = GAME_OBJECTS.get(type);

        if(gameObjectClassType) {
            this.gameObjects.push(new gameObjectClassType(props));
        }
    }

    getGameObjectByName(name: string) {
        return this.gameObjects?.find((gameObject) => gameObject.name === name);
    }

    removeGameObjectByName(name: string) {
        this.gameObjects?.forEach((gameObject, index) => {
            if(gameObject.name === name) {
                gameObject.remove();

                this.gameObjects.splice(index, 1);
            }
        });
    }
}
