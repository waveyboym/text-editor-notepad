import { FunctionComponent, useState } from 'react';
import { motion } from "framer-motion";
import { colours } from '../styles/styles';
import { Settingsnav } from '../components';
import Accountsettings from './Accountsettings';
import Appearancesettings from './Appearancesettings';
import Generalsettings from './Generalsettings';

type SettingsProps = {
    apptheme: boolean,
    generalcs: string,
    storagesize: number,
    notes_array: { 
        noteid: string,
        lst_edt_dt: string,
        previewtxt: string,
        previewtxtcol: string,
        bgCOL: string,
        islocked: boolean,
        fullnotetext: string;
    }[],
    changeTheme: () => void;
    changeGeneralCS: (arg: string) => void;
    mouseenter: () => void;
    mouseleave: () => void;
}

export const Settings : FunctionComponent<SettingsProps> = ({apptheme, generalcs, storagesize, notes_array, changeTheme, changeGeneralCS, mouseenter, mouseleave}) => {
    const [current_sub_settings, set_current_sub_settings] = useState<string>("Accountsettings");

    function changeToPage(page: string){set_current_sub_settings(page);}

    return (
        <motion.div
            className="h-full min-h-[456px]"
            style={{width:"calc(100% - 105px)", marginRight: "105px"}}
            initial={{scale: 0.9, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 0.9, opacity: 0}}
        >

            <h2 className="mt-[34px] font-black ml-[10px] text-[24px] text-left" 
            style={{ color: apptheme ? colours.black900 : colours.white900}}>Settings</h2>
            <div className="flex w-full min-h-[346px] mt-[16px] h-full">
                <Settingsnav handlechange={changeToPage} apptheme={apptheme}/>
                <div className="ml-[103px]" style={{width: "calc(100% - 260px)"}}>
                    {
                        (
                        () => {
                            switch(current_sub_settings){
                                case "Generalsettings":
                                    return <Generalsettings 
                                                apptheme={apptheme} 
                                                generalcs={generalcs} 
                                                diskSize={storagesize}
                                                notes_array={notes_array}
                                                mouseenter={mouseenter} 
                                                mouseleave={mouseleave}
                                                />
                                case "Appearancesettings":
                                    return <Appearancesettings 
                                                generalcs={generalcs} 
                                                apptheme={apptheme} 
                                                handlechange_generalcs={changeGeneralCS} 
                                                handlechange_mode={changeTheme}/>
                                default:
                                    return <Accountsettings apptheme={apptheme} generalcs={generalcs}/>
                            }
                        }
                        )()
                    }
                </div>
            </div>
        </motion.div>
    )
}
