import React, { useState, useEffect } from "react";
import RestClient from "../../REST/RestClient";
import BannerCarousel from "../BannerCarousel";
import "../CSS/UserPreference.css";

const questions = [
    {
        text: "Would you prefer to do your activity inside or outside?",
        type: "boolean",
        options: [
            { label: "Inside", value: false },
            { label: "Outside", value: true },
        ],
    },
    {
        text: "What genre would you prefer?",
        type: "genre",
        options: [
            { label: "Comedy", value: "comedy" },
            { label: "Action", value: "action" },
            { label: "Thriller", value: "thriller" },
            // Add more genres if needed
        ],
    },
    {
        text: "What is your budget?",
        type: "budget",
        options: [
            { label: "0 - 40 RON", value: { min: 0, max: 40 } },
            { label: "40 - 100 RON", value: { min: 40, max: 100 } },
            { label: "100 - 200 RON", value: { min: 100, max: 200 } },
            { label: "100 - 2000 RON", value: { min: 200, max: 1000 } },

        ],
    },
];


export default function UserPreference() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userPreference, setUserPreference] = useState({
        outside: undefined,
        genre: undefined,
        budgetMin: undefined,
        budgetMax: undefined,
    });

    const [isQuestionnaireCompleted, setIsQuestionnaireCompleted] = useState(false);
    useEffect(() => {
        // Check if all the user preferences are set
        const isAllPreferencesSet =
            userPreference.outside !== undefined &&
            userPreference.genre !== undefined &&
            userPreference.budgetMin !== undefined &&
            userPreference.budgetMax !== undefined;

        if (isAllPreferencesSet) {
            setIsQuestionnaireCompleted(true);

            const userIdString = localStorage.getItem("userId");
            const userId = userIdString ? parseInt(userIdString) : null;

            (async () => {
                try {
                    await RestClient.saveUserPreferences(userId, userPreference);
                    console.log("User preferences saved successfully");

                    // Delete the user previous preference from the local storage
                    await RestClient.deleteUserPreferences(userId);
                } catch (error) {
                    console.error("Failed to save user preferences:", error);
                }
            })();
        }
    }, [userPreference]);




    const handleOptionClick = (index: number) => {
        if (isQuestionnaireCompleted) {
            return;
        }

        const value = currentQuestion.options[index].value;

        switch (currentQuestion.type) {
            case "boolean":
                setUserPreference((prevState: any) => ({ ...prevState, outside: value }));
                break;
            case "genre":
                setUserPreference((prevState: any) => ({ ...prevState, genre: value }));
                break;
            case "budget":
                if (typeof value === 'object' && 'min' in value && 'max' in value) {
                    setUserPreference((prevState: any) => ({ ...prevState, budgetMin: value.min, budgetMax: value.max }));
                }
                break;
            default:
                console.error("Invalid question type:", currentQuestion.type);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };





    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="background-div text-white">
            <BannerCarousel />
            <div className="preferences-container">
                <h1>{currentQuestion.text}</h1>

                {!isQuestionnaireCompleted && (
                    <select
                        className="select select-long"
                        value=""
                        onChange={(e) => handleOptionClick(Number(e.target.value))}
                    >
                        <option value="" selected>
                            Select an option
                        </option>
                        {currentQuestion.options.map((option, index) => (
                            <option key={option.label} value={index}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}

                {isQuestionnaireCompleted && (
                    <button
                        className="btn btn-success btn-rounded btn-long"
                        onClick={async () => {

                            setCurrentQuestionIndex(0);
                            setIsQuestionnaireCompleted(false);
                            setUserPreference({
                                outside: undefined,
                                genre: undefined,
                                budgetMin: undefined,
                                budgetMax: undefined,
                            });
                        }}
                    >
                        Answer questions again
                    </button>
                )}

            </div>
        </div>
    );


}
