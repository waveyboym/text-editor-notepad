import React, { FunctionComponent } from 'react';

type SideNavBarProps = {
    apptheme: Boolean,
    generalcs: String,
    changePg: (arg: String) => void;
}

export const Sidenavbar : FunctionComponent<SideNavBarProps> = ({apptheme, generalcs, changePg}) => {
    return (
        <div>home</div>
    )
}