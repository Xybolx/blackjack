import { useState, useEffect } from "react";

const useDraggable = el => {
    const [{ dx, dy }, setOffset] = useState({ dx: 0, dy: 0 });
    useEffect(() => {
        const savedEl = el.current;
        const handleMouseDown = ev => {
            const startX = ev.pageX - dx;
            const startY = ev.pageY - dy;
            const handleMouseMove = ev => {
                const newDx = ev.pageX - startX;
                const newDy = ev.pageY - startY;
                setOffset({ dx: newDx, dy: newDy });
                // el.current.style.cursor = "grabbing";
            };
            document.addEventListener("mousemove", handleMouseMove);
            savedEl.style.cursor = "grab";
            document.addEventListener(
                "mouseup",
                () => {
                    document.removeEventListener("mousemove", handleMouseMove);
                },
                { once: true }
                );
            };
            savedEl.addEventListener("mousedown", handleMouseDown);
        return () => {
            savedEl.removeEventListener("mousedown", handleMouseDown);
        };
    }, [dx, dy, el]);

    useEffect(() => {
        el.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    }, [dx, dy, el]);
};

export default useDraggable;
