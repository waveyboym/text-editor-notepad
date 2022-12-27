import React, { FunctionComponent } from 'react';

type NavBarProps = {
    apptheme: Boolean,
    searching: (arg: String) => void;
}

export const Navbar : FunctionComponent<NavBarProps> = ({apptheme, searching}) => {
    return (
        <div>home</div>
    )
}