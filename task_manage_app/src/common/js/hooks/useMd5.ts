import { Md5 } from "ts-md5/dist/md5";

export function md5(value: string) {
  const md5Instance = new Md5();
  md5Instance.appendStr(value);
  return md5Instance.end();
}
