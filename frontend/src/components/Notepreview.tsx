import { FunctionComponent, SetStateAction, useState, useCallback, useEffect } from 'react';
import { motion } from "framer-motion";
import { colours, shadows } from '../styles/styles';
import { Chevronleftw, Lockiconw, Maximiseiconw, Shareiconw } from '../icons/icons';
import Sharenote from './Sharenote';
import useLocalStorage from "use-local-storage";
import { useMouseStore, useNotesStore } from '../stateStore';
import ContentEditable from 'react-contenteditable';

type NotepreviewProps = {
    note: { 
        noteid: string,
        last_edited_date: string,
        islocked: boolean,
        note_txt_colour: string,
        note_bg_colour: string,
        fullnotestxt: string,
    },
    apptheme: boolean,
    generalcs: string,
    closeNote: () => void;
    openEditor: (arg: string) => void;
    handleNoteChanges: (type: string, data: string) => void;
}

const Notepreview : FunctionComponent<NotepreviewProps> = ({note, apptheme, generalcs, closeNote, openEditor, handleNoteChanges}) => {

    const [share_note_menu, set_share_note_menu] = useState<boolean>(false);
    const [textState, settextState] = useState<string>(note.fullnotestxt);
    const [passwordstate, setPasswordState] = useState<string>("");
    const [password] = useLocalStorage<string>("password", "");
    const [psdError, setpsdError] = useState<boolean>(false);
    const mouseleave = useMouseStore((state) => state.mouseleave);
    const mouseenter = useMouseStore((state) => state.mouseenter);
    const unlockNotes = useNotesStore((state) => state.unlock);
    const unlockedglobal = useNotesStore((state) => state.unlockedGlobally);

    function toggleShare_Note_Menu(){set_share_note_menu(!share_note_menu);}

    const onContentChange = useCallback((evt: { currentTarget: { innerHTML: SetStateAction<string>; }; }) => {
		settextState(evt.currentTarget.innerHTML);
        handleNoteChanges("fullnotestxt", evt.currentTarget.innerHTML.toString());
        handleNoteChanges("last_edited_date", new Date().toDateString());
	}, [])
    //toLocaleDateString() -> 1/28/2023
    //toDateString() -> Sat Jan 28 2023

    function handlepswdChange(e: { target: { value: SetStateAction<string>; }; }){setPasswordState(e.target.value);}

    function validatePassword(e: { keyCode: number; }){
        if (e.keyCode === 13) {
            if(passwordstate === password){
                setpsdError(false);
                unlockNotes();
            }
            else setpsdError(true);
        }
    }

    useEffect(() => {
        const changedata = () => settextState(note.fullnotestxt);

        changedata();

        return () => changedata();
    }, [note.noteid])
    
    return (
        <div className="mt-[10px] mb-[50px] rounded-[20px] overflow-hidden ml-[25px]" 
            style={{width: "calc(100% - 50px)", 
                    height: "calc(100% - 50px)", 
                    boxShadow: shadows.bgShadow, 
                    background: note.note_bg_colour,
                    }}>
            <div className="w-full h-full">
                <div className="flex h-[24px] items-center justify-between mt-[8px]">
                    <div className="flex h-[24px] items-center ml-[17px]">
                        <motion.div 
                            whileHover={{scale: 1.03}}
                            whileTap={{scale: 0.97}}
                            onClick={closeNote}><Chevronleftw /></motion.div>
                        <p className="ml-[4px] italic text-[12px]" style={{color: colours.gray900}}>{note.last_edited_date}</p>
                    </div>
                    <div className="flex h-[24px] items-center mr-[17px]">
                        <motion.div className="mr-[13px]" 
                            whileHover={{scale: 1.03}}
                            whileTap={{scale: 0.97}}
                            onClick={toggleShare_Note_Menu}>
                                <Shareiconw />
                        </motion.div>
                        <motion.div 
                            whileHover={{scale: 1.03}}
                            whileTap={{scale: 0.97}}
                            onClick={() => openEditor("Editor")}>
                                <Maximiseiconw />
                        </motion.div>
                    </div>
                </div>
                <div className="mt-[3px] ml-[17px] mr-[17px] mb-[17px] overflow-hidden text-ellipsis text-left"
                    style={{height: "calc(100% - 52px)", width: "calc(100% - 34px)"}}
                >
                    <ContentEditable
                        className="box-border border-none outline-none resize-none text-[12px]
                        w-full h-full overflow-y-auto break-words overflow-x-clip font-['Inter']"
                        style={{color: note.note_txt_colour, background: "transparent"}}
                        onChange={onContentChange}
                        onBlur={onContentChange}
                        html={textState} />
                </div>

                <div className="mt-[-80%] ml-[50%]">
                    <Sharenote apptheme={apptheme} fullnotestext={note.fullnotestxt} sharenote_open={share_note_menu} />
                </div>
            </div>
            <div className="mt-[-91.8%] w-full h-full backdrop-blur-[12.5px] 
                overflow-hidden z-10 flex items-center flex-col"
                style={{
                    background: colours.black90025, 
                    visibility: unlockedglobal ? "hidden" : !unlockedglobal && note.islocked ? "visible" : "hidden",}}
            >
                <motion.div className="mt-[8px] ml-[-90%]"
                            whileHover={{scale: 1.03}}
                            whileTap={{scale: 0.97}}
                            onClick={closeNote}>
                                <Chevronleftw />
                </motion.div>
                <div className="mt-[30%]"><Lockiconw /></div>
                <h2 className="mt-[13px] font-['Inter'] text-[12px] italic" style={{color: colours.gray900}}>
                    This note is locked. Enter your password to unlock it
                </h2>
                <input 
                    name="password"
                    type="text" 
                    onChange={handlepswdChange}
                    onKeyUp={validatePassword}
                    className="font-['Inter'] text-[20px] w-[80%] h-[40px] border-0 border-none outline-none mt-[13px] pt-0 pb-0 pl-[4px] pr-[4px]"
                    style={{ color: colours.gray900, background: "transparent", borderBottom: "1px solid " + generalcs}} 
                    onMouseEnter={mouseenter}
                    onMouseLeave={mouseleave}
                />
                {psdError && (
                <h3 className="mt-[13px] font-['Inter'] text-[12px] italic" style={{color: colours.gray900}}>
                    Incorrect password
                </h3>)}
            </div>
        </div>
    )
}

export default Notepreview