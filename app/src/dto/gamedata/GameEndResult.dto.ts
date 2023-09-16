import PlayerItem from './PlayerItem.dto';

export default class GameEndResult {
  players: PlayerItem[]; //対局による各対局者の点数収支情報
}
