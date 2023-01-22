import { FunctionComponent, useState } from 'react';
import { motion } from "framer-motion";
import { colours, shadows } from '../styles/styles';
import { Chevronleftw, Maximiseiconw, Shareiconw, Textfileicon, Wordfileicon, Imagefileicon, Fileicon } from '../icons/icons';

type NotepreviewProps = {
    note: { 
            noteid: string,
            lst_edt_dt: string,
            previewtxt: string,
            previewtxtcol: string,
            bgCOL: string,
            islocked: boolean,
            fullnotetext: string
                },
    apptheme: boolean,
    generalcs: string,
    changeNote: (notedata: string) => void;
    closeNote: () => void;
    openEditor: (arg: string) => void;
    mouseenter: () => void;
    mouseleave: () => void;
}

const variants = {
    open: { height: "156px", opacity: 1 },
    closed: {  height: "0px", opacity: 0 },
}

const Notepreview : FunctionComponent<NotepreviewProps> = ({note, apptheme, generalcs, closeNote, openEditor, changeNote, mouseenter, mouseleave}) => {

    const [share_note_menu, set_share_note_menu] = useState<boolean>(false);

    function toggleShare_Note_Menu(){set_share_note_menu(!share_note_menu);}

    function handlechange(){}

    function quickshareNote(typeofshare: string){

    }

    return (
        <div className="mt-[10px] mb-[50px] rounded-[20px] overflow-hidden ml-[25px]" 
            style={{width: "calc(100% - 50px)", 
                    height: "calc(100% - 50px)", 
                    boxShadow: shadows.bgShadow, 
                    background: note.bgCOL,
                    }}>
            <div className="w-full h-full">
                <div className="flex h-[24px] items-center justify-between mt-[8px]">
                    <div className="flex h-[24px] items-center ml-[17px]">
                        <motion.div 
                            whileHover={{scale: 1.03}}
                            whileTap={{scale: 0.97}}
                            onClick={closeNote}><Chevronleftw /></motion.div>
                        <p className="ml-[4px] italic text-[12px]" style={{color: colours.gray900}}>{note.lst_edt_dt}</p>
                    </div>
                    <div className="flex h-[24px] items-center mr-[17px]">
                        <motion.div className="mr-[13px]" 
                            whileHover={{scale: 1.03}}
                            whileTap={{scale: 0.97}}
                            onClick={toggleShare_Note_Menu}><Shareiconw /></motion.div>
                        <motion.div 
                            whileHover={{scale: 1.03}}
                            whileTap={{scale: 0.97}}
                            onClick={() => openEditor(note.noteid)}><Maximiseiconw /></motion.div>
                    </div>
                </div>
                <div className="mt-[3px] ml-[17px] mr-[17px] mb-[17px] overflow-hidden text-ellipsis text-left"
                    style={{height: "calc(100% - 52px)", width: "calc(100% - 34px)"}}
                >
                    <div className="box-border border-none outline-none resize-none w-full h-full overflow-y-auto
                        text-[14px] font-medium"
                        style={{color: note.previewtxtcol, background: "transparent"}}
                        onChange={(e) => changeNote(e.currentTarget.textContent === null ? "" : e.currentTarget.textContent)}
                        contentEditable="true"
                    >
                        {note.fullnotetext}
                    </div>
                </div>

                <motion.div className="rounded-[15px] overflow-hidden ml-[30%] mt-[-80%] z-30" 
                    animate={share_note_menu ? "open" : "closed"}
                    variants={variants}
                    transition={{ type: "spring", stiffness: 100, damping: 9 }}
                    style={{background: apptheme ? colours.white900 : colours.black900, boxShadow: shadows.bgShadow}}>

                        <motion.div className="flex ml-[12px] mt-[12px]" onClick={() => quickshareNote("image")} whileTap={{scale: 0.97}}>
                            <Imagefileicon apptheme={apptheme}/>
                            <h5 className="ml-[7px] text-[14px] font-medium" 
                                style={{color: apptheme ? colours.black900 : colours.white900}}>
                                Export as image
                            </h5>
                        </motion.div>

                        <motion.div className="flex ml-[12px] mt-[12px]" onClick={() => quickshareNote("text")} whileTap={{scale: 0.97}}>
                            <Textfileicon apptheme={apptheme}/>
                            <h5  className="ml-[7px] text-[14px] font-medium"
                                style={{color: apptheme ? colours.black900 : colours.white900}}>
                                Import a text file
                            </h5>
                        </motion.div>

                        <motion.div className="flex ml-[12px] mt-[12px]" onClick={() => quickshareNote("pdf")} whileTap={{scale: 0.97}}>
                            <Fileicon apptheme={apptheme}/>
                            <h5 className="ml-[7px] text-[14px] font-medium" 
                                style={{color: apptheme ? colours.black900 : colours.white900}}>
                                Export as a pdf
                            </h5>
                        </motion.div>

                        <motion.div className="flex ml-[12px] mt-[12px]" onClick={() => quickshareNote("word")} whileTap={{scale: 0.97}}>
                            <Wordfileicon apptheme={apptheme}/>
                            <h5  className="ml-[7px] text-[14px] font-medium"
                                style={{color: apptheme ? colours.black900 : colours.white900}}>
                                Import as word doc
                            </h5>
                        </motion.div>

                </motion.div>
            </div>
            <div className="mt-[-100%] w-full h-full backdrop-blur-[12.5px] 
                overflow-hidden z-10 flex justify-center items-center"
                style={{background: colours.black90025, visibility: note.islocked ? "visible" : "hidden",}}
            >
                <input 
                    name="password"
                    type="text" 
                    onChange={handlechange}
                    className="font-['Inter'] text-[20px] w-[80%] h-[40px] border-0 border-none outline-none pt-0 pb-0 pl-[4px] pr-[4px]"
                    style={{ color: colours.gray900, background: "transparent", borderBottom: "1px solid " + generalcs}} 
                    onMouseEnter={mouseenter}
                    onMouseLeave={mouseleave}
                />
            </div>
        </div>
    )
}

export default Notepreview