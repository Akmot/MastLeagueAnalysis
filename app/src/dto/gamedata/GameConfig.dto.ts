import GameMetaData from './GameMetaData.dto';
import GameMode from './GameMode.dto';

export default class GameConfig {
  category: number;
  mode: GameMode;
  meta: GameMetaData;
}
