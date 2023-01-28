import Banner from "../components/Banner";
import { FunctionComponent } from 'react';
import { colours, shadows } from '../styles/styles';
import { Apple, Github, Google } from "../icons/icons";
import { motion } from 'framer-motion';

type Accountsettingsprops = {
    generalcs: string,
    apptheme: boolean,
}

const Accountsettings : FunctionComponent<Accountsettingsprops> = ({generalcs, apptheme}) => {
    return (
        <div className="w-full overflow-y-auto h-full min-h-[346px]">
            <Banner generalcs={generalcs} subsection={"Accountsettings"} text={"Account Settings"}/>
            <h2 className="font-medium text-[15px] mt-[75px] text-left"
                style={{color: apptheme ? colours.black900 : colours.white900}}>
                    Sign in options
            </h2>
            <div className="w-full flex mt-[20px]">
                <motion.div className="flex w-[118px] h-[34px] items-center rounded-[20px]" 
                    style={{background: apptheme ? colours.white900 : colours.black900, boxShadow: shadows.bgShadow,}}
                    whileHover={{scale: 1.03}}
                    whileTap={{scale: 0.97}}
                    >

                    <div className="ml-[5px]"><Google /></div>
                    <h3 className="ml-[5px] italic text-[12px]"
                        style={{color: apptheme ? colours.black900 : colours.white900}}>
                            google sign in
                    </h3>

                </motion.div>
                <motion.div className="flex w-[118px] h-[34px] items-center rounded-[20px] ml-[44px]" 
                    style={{background: apptheme ? colours.white900 : colours.black900, boxShadow: shadows.bgShadow,}}
                    whileHover={{scale: 1.03}}
                    whileTap={{scale: 0.97}}
                    >

                    <div className="ml-[5px]"><Apple /></div>
                    <h3 className="ml-[5px] italic text-[12px]"
                        style={{color: apptheme ? colours.black900 : colours.white900}}>
                            icloud sign in
                    </h3>

                </motion.div>
                <motion.div className="flex w-[118px] h-[34px] items-center rounded-[20px] ml-[44px]" 
                    style={{background: apptheme ? colours.white900 : colours.black900, boxShadow: shadows.bgShadow,}}
                    whileHover={{scale: 1.03}}
                    whileTap={{scale: 0.97}}
                    >

                    <div className="ml-[5px]"><Github /></div>
                    <h3 className="ml-[5px] italic text-[12px]"
                        style={{color: apptheme ? colours.black900 : colours.white900}}>
                            github sign in
                    </h3>

                </motion.div>
            </div>

            <p className="mt-[40px] mb-[200px] w-[265px] italic text-[12px] text-left" style={{color: colours.gray900}}>
                *signing in allows your notes to be synced 
                to the cloud so you can access them from any device that you are logged into
            </p>
        </div>
    )
}

export default Accountsettings