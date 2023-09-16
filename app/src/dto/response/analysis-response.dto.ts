import { ResponseBody } from './ResponseBody.dto';
import { ResponseHeader } from './ResponseHeader.dto';
/** レスポンス情報. */
export class AnalysisResponse {
  /** ヘッダ部. */
  header: ResponseHeader;
  /** ボディ部. */
  body: ResponseBody;
}
