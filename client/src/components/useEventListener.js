import { useEffect, useRef } from "react";

const useEventListener = (eventName, handler, el) => {
    // Create a ref that stores handler
    const savedHandler = useRef();

    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(
        () => {
            // Make sure element supports addEventListener
            // On 
            const isSupported = el && el.addEventListener;
            if (!isSupported) return;

            // Create event listener that calls handler function stored in ref
            const eventListener = event => savedHandler.current(event);

            // Add event listener
            el.addEventListener(eventName, eventListener);

            // Remove event listener on cleanup
            const cleanUp = () => {
                el.removeEventListener(eventName, eventListener);
            };
            return () => {
                cleanUp();
            };
        },
        [eventName, el] // Re-run if eventName or element changes
    );
};

export default useEventListener;