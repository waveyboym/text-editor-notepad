import { FunctionComponent } from 'react';

type SettingsProps = {
    apptheme: Boolean,
    notescolours: String[],
    generalcs: String,
    changeTheme: () => void;
    changeGeneralCS: (arg: String) => void;
    changeNotesColour: (arg: String[]) => void;
}

export const Settings : FunctionComponent<SettingsProps> = ({apptheme, notescolours, generalcs, changeTheme, changeGeneralCS, changeNotesColour}) => {
    return (
        <div>Settings</div>
    )
}
