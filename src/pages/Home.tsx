import React, { FunctionComponent } from 'react';

type HomeProps = {
    apptheme: Boolean,
    notescolours: String[],
    generalcs: String
}

export const Home : FunctionComponent<HomeProps> = ({apptheme, notescolours, generalcs}) => {
    return (
        <div>home</div>
    )
}