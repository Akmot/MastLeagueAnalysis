/** ヘッダ部. */
export class ResponseHeader {
  /** 読み取りファイルパス. */
  file_path: string;
  /** 対局開始日時. */
  startDateTime: Date;
  /** 対局終了日時. */
  endDateTime: Date;
  /** 対局時間. */
  duration: number;
}
