import { useState, useEffect } from "react";

const useDropArea = el => {
    const [deposited, setDeposited] = useState(false);
    useEffect(() => {
        const handleOnDrop = ev => {
            console.log(ev);
            setDeposited(true);
            };
            const handleOnDragOver = ev => {
                ev.preventDefault();
            };
            
            el.current.addEventListener("ondragover", handleOnDragOver);
            el.current.addEventListener("ondrop", handleOnDrop);
            const cleanUpRef = () => {
                el.current.removeEventListener("ondrop", handleOnDrop);
                el.current.removeEventListener("ondragover", handleOnDragOver);
            }
            return () => {
                cleanUpRef();
            };
        
    }, [el]);

};

export default useDropArea;
