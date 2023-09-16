export const getKeyByValue = <
  OBJECT extends Record<string | number, any>,
  KEY extends keyof OBJECT,
  VALUE extends OBJECT[KEY],
>(
  obj: OBJECT,
  val: VALUE,
): KEY => {
  // key と value を逆にしたオブジェクトを生成
  const keyValueReversedObj: Record<VALUE, KEY> = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [value, key]),
  );

  // そのオブジェクトから key（第２引数の val)に応じた値を取得
  return keyValueReversedObj[val];
};
