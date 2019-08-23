import { useState } from 'react';

const useForm = () => {

    // state
    const [state, setState] = useState({});

    // handle change
    const handleChange = ev => {
        ev.persist();
        setState(state => ({ ...state, [ev.target.name]: ev.target.value }))
    };

    // handle clear form
    const handleClearForm = () => {
        setState({});
    };

    return [state, handleChange, handleClearForm];

}

export default useForm;