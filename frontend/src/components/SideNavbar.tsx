import { FunctionComponent, useState } from 'react';
import { motion } from "framer-motion";
import { Plusicon, Homeicon, Settingsicon, Penicon, Textfileicon } from '../icons/icons';
import { colours, shadows } from '../styles/styles';

type SideNavBarProps = {
    selected_page: string,
    apptheme: boolean,
    generalcs: string,
    changePg: (arg: string) => void;
    createNote: (arg: any) => void;//it's a string
}

const variants = {
    open: { height: "85px", width: "185px", opacity: 1 },
    closed: {  height: "0px", width: "0", opacity: 0 },
}

export const SideNavbar : FunctionComponent<SideNavBarProps> = ({selected_page, apptheme, generalcs, changePg, createNote}) => {

    const [show_createNewNoteDialogue, set_createNewNoteDialogue] = useState<boolean>(false);

    function newNote(){
        set_createNewNoteDialogue(!show_createNewNoteDialogue);
        createNote("");
    }

    function txt_file_upload(e: any){
        e.preventDefault();
        
        set_createNewNoteDialogue(!show_createNewNoteDialogue);
        const reader = new FileReader();
        reader.onload = async (e) => { 
            const text = (e.target?.result);
            createNote(text);
        };
        reader.readAsText(e.target.files[0]);
    }

    return (
        <div className="w-[40px] h-[179px]">
            <motion.div className="w-[40px] h-[40px] rounded-full flex items-center justify-center" 
                style={{background: generalcs}}
                animate={{rotate: show_createNewNoteDialogue ? 45 : 0}}
                whileHover={{scale: 1.03}} whileTap={{scale: 0.97}} 
                onClick={() => set_createNewNoteDialogue(!show_createNewNoteDialogue)}
                >
                <Plusicon />
            </motion.div>
            <motion.div className="w-[24px] h-[24px] mt-[45px] ml-auto mr-auto" onClick={() => changePg("Home")}
                whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}
            >
                <Homeicon generalcs={generalcs} apptheme={apptheme} currentlySLCTD={selected_page === "Home" ? true : false}/>
            </motion.div>
            <motion.div className="w-[24px] h-[24px] mt-[45px] ml-auto mr-auto" onClick={() => changePg("Settings")}
                whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}
            >
                <Settingsicon generalcs={generalcs} apptheme={apptheme} currentlySLCTD={selected_page === "Settings" ? true : false}/>
            </motion.div>

            <motion.div className="rounded-[15px] overflow-hidden ml-[50px] mt-[-175px] fixed z-30" 
                animate={show_createNewNoteDialogue ? "open" : "closed"}
                variants={variants}
                transition={{ type: "spring", stiffness: 100, damping: 9 }}
                style={{background: apptheme ? colours.white900 : colours.black900, boxShadow: shadows.bgShadow}}>

                    <motion.div className="flex ml-[12px] mt-[12px]" onClick={newNote} whileTap={{scale: 0.97}}>
                        <Penicon apptheme={apptheme}/>
                        <h5 className="ml-[7px] text-[14px] font-medium" 
                            style={{color: apptheme ? colours.black900 : colours.white900}}>
                            Create a new note
                        </h5>
                    </motion.div>

                    <motion.div className="flex ml-[12px] mt-[12px]" whileTap={{scale: 0.97}}>
                        <Textfileicon apptheme={apptheme}/>
                        <label  className="ml-[7px] text-[14px] font-medium"
                            style={{color: apptheme ? colours.black900 : colours.white900}}>
                            Import a text file
                            <input type="file" accept="txt" className='hidden' id="fileInput" onChange={txt_file_upload}/>
                        </label>
                    </motion.div>

            </motion.div>
        </div>
    )
}

export default SideNavbar;