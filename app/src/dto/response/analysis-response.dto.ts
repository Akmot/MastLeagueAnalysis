import { Body } from './body.dto';
import { Header } from './header.dto';
/** レスポンス情報. */
export class AnalysisResponse {
  /** ヘッダ部. */
  header: Header;
  /** ボディ部. */
  body: Body;
}
