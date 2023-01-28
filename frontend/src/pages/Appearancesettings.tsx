import Banner from "../components/Banner";
import { FunctionComponent, useEffect } from 'react';
import { colours, shadows } from '../styles/styles';
import { Darkmodeframe, Lightmodeframe, Systemmodeframe } from "../icons/icons";
import { motion } from 'framer-motion';
import Themedetector from "../components/Themedetector";
import useLocalStorage from "use-local-storage";

type Appearancesettingsprops = {
    generalcs: string,
    apptheme: boolean,
    handlechange_generalcs: (arg: string) => void;
    handlechange_mode: () => void;
}
/** userTheme = T = DM       ||| userTheme = T = LM
 *  apptheme = T = LM        ||| apptheme = T = DM
 *             |                           |
 *  change apptheme to dark      change apptheme to light
 */

const Appearancesettings : FunctionComponent<Appearancesettingsprops> = ({generalcs, apptheme, handlechange_generalcs, handlechange_mode}) => {
    const userTheme: boolean = Themedetector();
    const [isSystemMode, setisSystemMode] = useLocalStorage<boolean>("isSystemMode", false);

    function changeisSystemMode(){setisSystemMode(true);}

    function systemModeToggle(){if(userTheme === apptheme){handlechange_mode();}}

    function normalToggle(){
        setisSystemMode(false);
        handlechange_mode();
    }

    useEffect(() => {
        const handleeffect = () => {if(isSystemMode === true)systemModeToggle();}

        handleeffect();

        return () => handleeffect();
    }, [isSystemMode, userTheme]);
    
    return (
        <div className="w-full overflow-y-auto h-full min-h-[346px]">
            <Banner generalcs={generalcs} subsection={"Appearancesettings"} text={"Appearance"}/>
            <h2 className="text-[15px] mt-[75px] font-medium text-left" 
                style={{color: apptheme ? colours.black900 : colours.white900 }}>
                Choose your theme
            </h2>
            <div className="flex mt-[19px] flex-wrap ml-[10px]">
                <div className="mr-[36px]">
                    <motion.div className="rounded-[20px]"
                                whileHover={{scale: 1.03}} 
                                whileTap={{scale: 0.97}} 
                                onClick={changeisSystemMode}
                                style={{border: isSystemMode ? "1px solid " + generalcs : "none"}}>
                            <Systemmodeframe />
                    </motion.div>
                    <p className="text-[12px] mt-[9px] text-center italic" style={{color: colours.gray900}}>System</p>
                </div>
                <div className="mr-[36px]">
                    <motion.div className="rounded-[20px]"
                        whileHover={{scale: 1.03}} 
                        whileTap={{scale: 0.97}} 
                        onClick={normalToggle}
                        style={{border: !isSystemMode && !apptheme ? "1px solid " + generalcs : "none"}}
                    >
                        <Darkmodeframe />
                    </motion.div>
                    <p className="text-[12px] mt-[9px] text-center italic" style={{color: colours.gray900}}>Nighttime</p>
                </div>
                <div className="mr-[36px]">
                    <motion.div className="rounded-[20px]"
                                whileHover={{scale: 1.03}} 
                                whileTap={{scale: 0.97}} 
                                onClick={normalToggle}
                                style={{border: !isSystemMode && apptheme ? "1px solid " + generalcs : "none"}}
                        >
                        <Lightmodeframe />
                    </motion.div>
                    <p className="text-[12px] mt-[9px] text-center italic" style={{color: colours.gray900}}>During the day</p>
                </div>
            </div>

            <h2 className="text-[15px] mt-[20px] font-medium text-left"  
            style={{color: apptheme ? colours.black900 : colours.white900}}>
                Choose your general colour scheme
            </h2>
            <div className="flex flex-wrap mt-[19px] mb-[200px]">
                <motion.div className="w-[24px] h-[24px] rounded-full"
                    style={{
                        border: generalcs === colours.yellow900 ? "1px solid " + colours.blue1100 : "none",
                        boxShadow: shadows.bgShadow,
                        background: colours.yellow900,
                    }}
                    whileHover={{scale: 1.03}}
                    whileTap={{scale: 0.97}}
                    onClick={() => handlechange_generalcs(colours.yellow900)}
                />
                <motion.div className="w-[24px] h-[24px] rounded-full ml-[10px]"
                    style={{
                        border: generalcs === colours.orange900 ? "1px solid " + colours.blue1100 : "none",
                        boxShadow: shadows.bgShadow,
                        background: colours.orange900,
                    }}
                    whileHover={{scale: 1.03}}
                    whileTap={{scale: 0.97}}
                    onClick={() => handlechange_generalcs(colours.orange900)}
                />
                <motion.div className="w-[24px] h-[24px] rounded-full ml-[10px]"
                    style={{
                        border: generalcs === colours.red900 ? "1px solid " + colours.blue1100 : "none",
                        boxShadow: shadows.bgShadow,
                        background: colours.red900,
                    }}
                    whileHover={{scale: 1.03}}
                    whileTap={{scale: 0.97}}
                    onClick={() => handlechange_generalcs(colours.red900)}
                />
                <motion.div className="w-[24px] h-[24px] rounded-full ml-[10px]"
                    style={{
                        border: generalcs === colours.pink900 ? "1px solid " + colours.blue1100 : "none",
                        boxShadow: shadows.bgShadow,
                        background: colours.pink900,
                    }}
                    whileHover={{scale: 1.03}}
                    whileTap={{scale: 0.97}}
                    onClick={() => handlechange_generalcs(colours.pink900)}
                />
                <motion.div className="w-[24px] h-[24px] rounded-full ml-[10px]"
                    style={{
                        border: generalcs === colours.purple900 ? "1px solid " + colours.blue1100 : "none",
                        boxShadow: shadows.bgShadow,
                        background: colours.purple900,
                    }}
                    whileHover={{scale: 1.03}}
                    whileTap={{scale: 0.97}}
                    onClick={() => handlechange_generalcs(colours.purple900)}
                />
                <motion.div className="w-[24px] h-[24px] rounded-full ml-[10px]"
                    style={{
                        border: generalcs === colours.blue900 ? "1px solid " + colours.blue1100 : "none",
                        boxShadow: shadows.bgShadow,
                        background: colours.blue900,
                    }}
                    whileHover={{scale: 1.03}}
                    whileTap={{scale: 0.97}}
                    onClick={() => handlechange_generalcs(colours.blue900)}
                />
                <motion.div className="w-[24px] h-[24px] rounded-full ml-[10px]"
                    style={{
                        border: generalcs === colours.lightblue900 ? "1px solid " + colours.blue1100 : "none",
                        boxShadow: shadows.bgShadow,
                        background: colours.lightblue900,
                    }}
                    whileHover={{scale: 1.03}}
                    whileTap={{scale: 0.97}}
                    onClick={() => handlechange_generalcs(colours.lightblue900)}
                />
                <motion.div className="w-[24px] h-[24px] rounded-full ml-[10px]"
                    style={{
                        border: generalcs === colours.green900 ? "1px solid " + colours.blue1100 : "none",
                        boxShadow: shadows.bgShadow,
                        background: colours.green900,
                    }}
                    whileHover={{scale: 1.03}}
                    whileTap={{scale: 0.97}}
                    onClick={() => handlechange_generalcs(colours.green900)}
                />
                <motion.div className="w-[24px] h-[24px] rounded-full ml-[10px]"
                    style={{
                        border: generalcs === colours.lightgreen900 ? "1px solid " + colours.blue1100 : "none",
                        boxShadow: shadows.bgShadow,
                        background: colours.lightgreen900,
                    }}
                    whileHover={{scale: 1.03}}
                    whileTap={{scale: 0.97}}
                    onClick={() => handlechange_generalcs(colours.lightgreen900)}
                />

            </div>

        </div>
    )
}

export default Appearancesettings