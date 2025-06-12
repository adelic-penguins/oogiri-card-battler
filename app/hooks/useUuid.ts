import * as crypto from "node:crypto";
/**
 * uuidを生成するカスタムフック
 */
export const useUuid = () => {
  const uuid = crypto.randomUUID();
  console.debug("[Next Server]: New UUID generated.", uuid);

  return uuid;
};