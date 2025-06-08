import { useCallback, useState } from "react";

export const useBooleanState = (defaultValue: boolean): [boolean, () => void, () => void, () => void] => {
    const [booleanState, setBooleanState] = useState<boolean>(defaultValue)
    return [
        booleanState,
        useCallback(()=> {
            setBooleanState(true)
        }, []),
        useCallback(()=> {
            setBooleanState(false)
        }, []),
        useCallback(()=> {
            setBooleanState((prev) => !prev)
        }, []),
    ]
}