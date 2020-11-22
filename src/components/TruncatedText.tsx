import React from 'react';
import {IonText} from "@ionic/react";

interface TruncatedText {
    text: string;
}

const TruncatedText = ({text}: TruncatedText) => {
    const MAX_LENGTH = 500;
    let retrimmed;

    if(text.length > MAX_LENGTH) {
        const trimmed = text.substring(0, MAX_LENGTH);
        // finds the next word break.
        retrimmed = trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(" ")))
    }

    return (
        <IonText>{text.length >= MAX_LENGTH ? `${retrimmed}...`: text}</IonText>
    )
}

export default TruncatedText
