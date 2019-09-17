import { useCallback, useState } from "react";

const useArray = initial => {
    const [value, setValue] = useState(initial);

    const addValue = useCallback(a => setValue(value => [...value, a]), []);

    const removeById = useCallback(id => setValue(arr => arr.filter(v => v && v.id !== id)), []);

    const clear = useCallback(() => setValue(() => []), []);

    return [value, setValue, addValue, removeById, clear];
}

export default useArray;