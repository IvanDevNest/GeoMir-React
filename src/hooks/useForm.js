import { useState } from "react";
export const useForm = (initialForm={}) => {
    let [formState, setFormState] = useState(initialForm);
    const onInputChange = (e) => {
    // amb { target } desestructurem e
    // enlloc d'esc      riure e.target , escriurem target
    // Desestructurem ara target
    const { target } = e
    const { name, value } = target;
    setFormState({
    ...formState,
    // [target.name] : target.value
    [name]: value,
    });
    // Si no haguéssim desestrcuturat res...
    // [e.target.name] : e.target.value
    };
    // ……………………
    // Podem afegir més mètodes
    // I s’hauran de retornar a continuació
    const OnResetForm = () => {
        setFormState(initialForm)
    };
    return { ...formState, formState,onInputChange,OnResetForm };
    };