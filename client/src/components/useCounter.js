import { useCallback, useState } from "react";

const useCounter = initial => {
    const [value, setValue] = useState(initial);

    const increment = useCallback(() => setValue(value => value + 1), []);
    const decrement = useCallback(() => setValue(value => value - 1), []);
    const clear = () => setValue(() => initial);

    return [value, increment, decrement, clear]
}

export default useCounter;