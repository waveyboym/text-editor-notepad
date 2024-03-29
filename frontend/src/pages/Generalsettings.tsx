import Banner from "../components/Banner";
import { FunctionComponent, useEffect, useState } from 'react';
import { colours, shadows } from '../styles/styles';
import { motion } from 'framer-motion';
import { Checkicon, Storageicon, Trashicon, Chevrondownw, Calendaricon, Lockicon, Unlockicon } from "../icons/icons";
import useLocalStorage from "use-local-storage";
import { useMouseStore, useStorageStore, useNotesSizeStore } from '../stateStore';
import { Greet } from "../../wailsjs/go/main/App";

const barlength: number = 351;
const barLL: number = 38;//lowest limit of bar width
const newpasswordstate = {newpassword: "",}

const variants = {
    open: { height: "75px", opacity: 1 },
    closed: { height: "0", opacity: 0 },
}

type Generalsettingsprops = {
    generalcs: string,
    apptheme: boolean,
}

const Generalsettings: FunctionComponent<Generalsettingsprops> = ({apptheme, generalcs}) => {

    const [password, set_password] = useLocalStorage<string>("password", "");
    const [unlocked, set_unlocked] = useState<boolean>(false);
    const [dateformat, set_dateformat] = useLocalStorage<string>("dateformat", "DD/MM/YYYY");
    const [openDateSelect, set_openDateSelect] = useState<boolean>(false);
    const [notes_bar_length, set_notes_bar_length] = useState<number>(0);
    const notes_size = useNotesSizeStore((state) => state.size);
    const [state, setState] = useState(newpasswordstate);

    const mouseleave = useMouseStore((state) => state.mouseleave);
    const mouseenter = useMouseStore((state) => state.mouseenter);
    const diskSize = useStorageStore((state) => state.size);
    const setDiskSize = useStorageStore((state) => state.setsize);

    function handlechange(e: { target: { name: any; value: any; }; }) {setState({ ... state, [e.target.name] : e.target.value});}

    function formatBytes(bytes: number, decimals: number = 0) {
        if (!+bytes) return '0 Bytes'
    
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb']
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    function unlockPassword(){
        //request users desktop password and check if matching
        //return if not else
        if(state.newpassword === "" && password === ""){
            set_unlocked(true);
            return;
        }
        if(state.newpassword === ""){
            (document.getElementById("passwordinput") as HTMLInputElement)!.value = "Please enter a valid password";
            return;
        }

        if(state.newpassword !== password){
            (document.getElementById("passwordinput") as HTMLInputElement)!.value = "Password is incorrect";
            return;
        }
        else{
            set_unlocked(true);
            return;
        }
        
    }

    useEffect(() => {
        const getStorageSize = () => {
            if(diskSize != 0)return;

            Greet("")
            .then((disksize) => setDiskSize(parseInt(disksize)))
            .catch((error) => console.log(error));
        }

        getStorageSize();

        return () => { getStorageSize();}
    }, [])
    
    useEffect(() => {
        const calculateBarW = () => {
            if(notes_size == 0 || diskSize == 0){
                set_notes_bar_length(barLL);
                return;
            }
            const val: number = (notes_size / diskSize) * barlength;

            if(val <= barLL)set_notes_bar_length(barLL);
            else set_notes_bar_length(val);
        }

        calculateBarW();
    
        return () => calculateBarW()
    }, [diskSize])
    
    return (
        <div className="w-full overflow-y-auto h-full min-h-[346px]">
            <Banner generalcs={generalcs} subsection={"Generalsettings"} text={"General settings"}/>
            <h2 className="text-[15px] mt-[75px] font-medium text-left" 
                style={{color: apptheme ? colours.black900 : colours.white900 }}>
                Notes password lock
            </h2>
            <div className="flex h-[24px] items-center mt-[20px] flex-wrap">
                <motion.div className="mr-[35px]" whileTap={{scale: 0.97}} whileHover={{scale: 1.03}} onClick={unlockPassword}>
                    {unlocked ? <Unlockicon apptheme={apptheme} /> : <Lockicon apptheme={apptheme}/>}
                </motion.div>
                <p className="w-[84px] mr-[35px] font-['Inter'] text-[12px] italic" 
                    style={{color: apptheme ? colours.black900 : colours.white900 }}>
                    {unlocked ? password : "**************"}
                </p>
                <input 
                    id="passwordinput"
                    name="newpassword"
                    type="text" 
                    value={unlocked ? password : ""}
                    placeholder={unlocked ? "enter a new password here..." : "Enter your current password"}
                    style={{ color: colours.white900, background: generalcs, boxShadow: shadows.bgShadow,}} 
                    onChange={handlechange}
                    className="font-['Inter'] text-[12px] w-[351px] h-[24px] rounded-[20px] italic
                    border-0 border-none outline-none pt-0 pb-0 pl-[4px] pr-[4px] mr-[34px]"
                    onMouseEnter={mouseenter}
                    onMouseLeave={mouseleave}
                />
                <motion.div className="mr-[10px]" 
                            whileTap={{scale: 0.97}} 
                            whileHover={{scale: 1.03}}
                            onClick={() => {set_password(state.newpassword); set_unlocked(false);}}>
                    <Checkicon apptheme={apptheme}/>
                </motion.div>
                <p className="mr-[35px] font-['Inter'] text-[12px] italic" 
                    style={{color: apptheme ? colours.black900 : colours.white900 }}>
                        set as new password
                </p>
            </div>

            <h2 className="text-[15px] mt-[20px] font-medium text-left" 
                style={{color: apptheme ? colours.black900 : colours.white900 }}>
                Total Notes space usage
            </h2>
            <div className="flex h-[24px] items-center mt-[20px] flex-wrap">
                <div className="mr-[33px]"><Storageicon apptheme={apptheme}/></div>
                <p className="w-[88px] mr-[33px] font-['Inter'] text-[12px] italic" 
                    style={{color: apptheme ? colours.black900 : colours.white900 }}>
                    {(() => { return formatBytes(notes_size) + "/" + formatBytes(diskSize);})()}
                </p>
                <div className="h-[24px] mr-[34px] rounded-[20px]" 
                    style={{width: barlength + "px", boxShadow: shadows.bgShadow, background: colours.white900}}>
                    <motion.div className="h-[24px] rounded-[20px]" 
                                style={{boxShadow: shadows.bgShadow, background: generalcs}}
                                initial={{width: 0}}
                                animate={{width: notes_bar_length.toString() + "px"}}/>
                </div>
                <motion.div className="mr-[10px]" whileTap={{scale: 0.97}} whileHover={{scale: 1.03}}>
                    <Trashicon apptheme={apptheme}/>
                </motion.div>
                <p className="mr-[35px] font-['Inter'] text-[12px] italic" 
                    style={{color: apptheme ? colours.black900 : colours.white900 }}>
                        delete all notes
                </p>
            </div>

            <h2 className="text-[15px] mt-[20px] font-medium text-left" 
                style={{color: apptheme ? colours.black900 : colours.white900 }}>
                Notes date format
            </h2>
            <div className="flex h-[24px] items-center mt-[20px] mb-[200px] flex-wrap">
                <div className="mr-[35px]"><Calendaricon apptheme={apptheme}/></div>
                <p className="w-[84px] mr-[35px] font-['Inter'] text-[12px] italic" 
                    style={{color: apptheme ? colours.black900 : colours.white900 }}>
                    {dateformat}
                </p>
                <div className="h-[24px] mr-[219px] rounded-[20px] w-[166px] flex flex-wrap items-center overflow-visible" 
                    style={{boxShadow: shadows.bgShadow, background: generalcs}}>
                        <p className="mr-[20px] font-['Inter'] text-[12px] italic ml-[25px]" 
                            style={{color: colours.white900 }}>
                                select format
                        </p>
                        <motion.div className="mr-[21px]"
                            onClick={() => set_openDateSelect(!openDateSelect)}
                            animate={{rotate: openDateSelect ? 180 : 0}}
                            whileTap={{scale: 0.97}}
                        >
                            <Chevrondownw />
                        </motion.div>
                        <motion.div className="mt-[15px] rounded-[15px] w-[166px] overflow-hidden z-30"
                            animate={openDateSelect ? "open" : "closed"}
                            variants={variants}
                            transition={{ type: "spring", stiffness: 100, damping: 9 }}
                            style={{background: apptheme ? colours.white900 : colours.black900, boxShadow: shadows.bgShadow}}
                        >
                            <p className="font-['Inter'] text-[12px] mt-[5px] mb-[5px] text-center" 
                                style={{color: apptheme ? colours.black900 : colours.white900 }}
                                onClick={() => {set_openDateSelect(!openDateSelect); set_dateformat("DD/MM/YYYY");}}>
                                DD/MM/YYYY
                            </p>
                            <p className="font-['Inter'] text-[12px] mt-[5px] mb-[5px] text-center" 
                                style={{color: apptheme ? colours.black900 : colours.white900 }}
                                onClick={() => {set_openDateSelect(!openDateSelect); set_dateformat("MM/DD/YYYY");}}>
                                MM/DD/YYYY
                            </p>
                            <p className="font-['Inter'] text-[12px] mt-[5px] mb-[5px] text-center" 
                                style={{color: apptheme ? colours.black900 : colours.white900 }}
                                onClick={() => {set_openDateSelect(!openDateSelect); set_dateformat("YYYY/MM/DD");}}>
                                YYYY/MM/DD
                            </p>
                        </motion.div>
                </div>
                <motion.div className="mr-[10px]" whileTap={{scale: 0.97}} whileHover={{scale: 1.03}}>
                    <Checkicon apptheme={apptheme}/>
                </motion.div>
                <p className="mr-[35px] font-['Inter'] text-[12px] italic" 
                    style={{color: apptheme ? colours.black900 : colours.white900 }}>
                        set as new date format
                </p>
            </div>
        </div>
    )
}

export default Generalsettings