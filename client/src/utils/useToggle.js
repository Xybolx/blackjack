import { useState, useCallback } from "react";

const useToggle = initial => {

    const [value, setValue] = useState(initial);

    const toggleValue = useCallback(() => setValue(value => !value), []);

    return[value, toggleValue]
}

export default useToggle;