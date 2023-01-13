import { FunctionComponent } from 'react';
import { Personicon, Palleteicon, Settingsicon} from "../icons/icons";
import { motion } from 'framer-motion';
import { colours } from '../styles/styles';

type settingsnavprops = {
    apptheme: boolean,
    handlechange: (arg: string) => void;
}

const Settingsnav : FunctionComponent<settingsnavprops> = ({apptheme, handlechange}) => {
    return (
        <div className="w-[157px] mt-[20px]">
            <motion.div className="flex items-center" 
                whileHover={{scale: 1.03}} whileTap={{scale: 0.97}} onClick={() => handlechange("Accountsettings")}>
                    <Personicon apptheme={apptheme}/>
                    <h2 className="ml-[9px] text-[15px] font-medium" style={{color: apptheme ? colours.black900 : colours.white900}}>
                        Account settings
                    </h2>
            </motion.div>
            <motion.div className="flex items-center mt-[30px]" 
                whileHover={{scale: 1.03}} whileTap={{scale: 0.97}} onClick={() => handlechange("Generalsettings")}>
                    <Settingsicon apptheme={apptheme}/> 
                    <h2 className="ml-[9px] text-[15px] font-medium" style={{color: apptheme ? colours.black900 : colours.white900}}>
                        General settings
                    </h2>
            </motion.div>
            <motion.div className="flex items-center mt-[30px]" 
                whileHover={{scale: 1.03}} whileTap={{scale: 0.97}} onClick={() => handlechange("Appearancesettings")}>
                    <Palleteicon apptheme={apptheme}/> 
                    <h2 className="ml-[9px] text-[15px] font-medium" style={{color: apptheme ? colours.black900 : colours.white900}}>
                        Appearance
                    </h2>
            </motion.div>
        </div>
    )
}

export default Settingsnav