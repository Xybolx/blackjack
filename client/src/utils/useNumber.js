import { useCallback, useState } from "react";

const useNumber = initial => {
    const [value, setValue] = useState(initial);
    return {
        value,
        setValue,
        increment: useCallback(() => setValue(value => value + 1), []),
        decrement: useCallback(() => setValue(value => value - 1), []),
        clear: useCallback(() => setValue(0), [])
    };
}

export default useNumber;