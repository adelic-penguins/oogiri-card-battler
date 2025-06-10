import { useState, useEffect } from 'react';
import * as crypto from "node:crypto";
import {useLocalStorage} from "@/app/hooks/useLocalStorage";
/**
 * uuidを生成するカスタムフック
 */
export const useUuid = () => {
  const [uuid, setUuid] = useState<string>();

  useEffect(() => {
    const newUuid = crypto.randomUUID();
    setUuid(newUuid);
    console.debug("[Next Server]: New UUID generated.", newUuid);
  }, []);

  return uuid;
};