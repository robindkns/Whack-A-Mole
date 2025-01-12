import "../../styles/ui/InputName.sass";
import { useState, useEffect } from "react";
import { NameInputProps } from "../../typescript/NameInputProps";

export default function NameInput({ playerName, setPlayerName }: NameInputProps) {
    const [inputValues, setInputValues] = useState<string[]>(['', '', '']); // Gère les 3 entrées de lettres

    // Met à jour l'état parent avec les nouvelles valeurs lorsque l'utilisateur entre une lettre
    useEffect(() => {
        setPlayerName(inputValues.join('')); // Met à jour le nom du joueur lorsque les 3 lettres sont saisies
    }, [inputValues, setPlayerName]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValues = [...inputValues];
        newValues[index] = e.target.value.toUpperCase(); // Met en majuscule la valeur
        setInputValues(newValues); // Mise à jour des valeurs des entrées
    };

    return (
        <div className="name-input-container">
            <input
                type="text"
                maxLength={1}
                value={inputValues[0]}
                onChange={(e) => handleInputChange(e, 0)}
                className="name-input"
            />
            <input
                type="text"
                maxLength={1}
                value={inputValues[1]}
                onChange={(e) => handleInputChange(e, 1)}
                className="name-input"
            />
            <input
                type="text"
                maxLength={1}
                value={inputValues[2]}
                onChange={(e) => handleInputChange(e, 2)}
                className="name-input"
            />
        </div>
    );
}
