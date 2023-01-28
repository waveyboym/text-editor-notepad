import { FunctionComponent, useState } from 'react';
import { colours } from '../styles/styles';
import { Gridicon, Columnicon } from '../icons/icons';
import { motion } from "framer-motion";
import { Note, Notepreview } from '../components';

type HomeProps = {
    apptheme: boolean,
    generalcs: string,
    notes_array: { 
        noteid: string,
        last_edited_date: string,
        islocked: boolean,
        note_txt_colour: string,
        note_bg_colour: string,
        fullnotestxt: string,
    }[],
    openedNote: { 
        noteid: string,
        last_edited_date: string,
        islocked: boolean,
        note_txt_colour: string,
        note_bg_colour: string,
        fullnotestxt: string,
    },
    openThisNote: (noteid: string) => void;
    changenote: (noteid: string, notedata: string) => void;
    changepage: (arg: string) => void;
    handleNoteChanges: (type: string, data: string) => void;
}

const variantsleft = {
    normal: { width: "100%"},
    small: { width: "47%",},
}

const variantsright = {
    normal: { width: 0},
    wide: { width: "50%",},
}

export const Home : FunctionComponent<HomeProps> = ({
    apptheme, generalcs, openedNote, notes_array
    , changenote, changepage, openThisNote, handleNoteChanges}) => {

    const [gridview, setgridview] = useState<boolean>(true);
    const [largeNoteOpen, setlargeNoteOpen] = useState<boolean>(false);

    function changeView(){setgridview(!gridview);}

    function makeNoteLarger(noteid: string){
        if(largeNoteOpen === true){
            setlargeNoteOpen(false);
            changenote(openedNote.noteid, openedNote.fullnotestxt);
        }
        openThisNote(noteid);
        setlargeNoteOpen(true);
    }

    function makeNoteSmaller(){
        if(largeNoteOpen === true)changenote(openedNote.noteid, openedNote.fullnotestxt);
        openThisNote("");
        setlargeNoteOpen(false);
    }
    
    return (
        <motion.div 
            className="h-full min-h-[456px]" 
            style={{width:"calc(100% - 105px)", marginRight: "105px"}}
            initial={{scale: 0.9, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 0.9, opacity: 0}}
        >
            <div className="mt-[34px] flex items-center h-[30px] justify-between"
                style={{width: largeNoteOpen ? "47%" : "100%"}}>
                <h2 className="font-black ml-[10px] text-[24px]" 
                style={{ color: apptheme ? colours.black900 : colours.white900}}>
                    All Notes
                </h2>
                <div className="h-[30px] w-[61px] flex items-center justify-between">
                    <motion.div onClick={changeView} whileTap={{scale: 0.97}} whileHover={{scale: 1.03}}>
                        <Gridicon generalcs={generalcs} apptheme={apptheme} currentlySLCTD={gridview ? true : false}/>
                    </motion.div>
                    <motion.div onClick={changeView} whileTap={{scale: 0.97}} whileHover={{scale: 1.03}}>
                        <Columnicon generalcs={generalcs} apptheme={apptheme} currentlySLCTD={gridview ? false : true}/>
                    </motion.div>
                </div>
            </div>
            <div className="flex w-full min-h-[346px] mt-[36px] justify-between" 
                style={{height: "calc(100% - 100px)"}}>
                <motion.div className="min-h-[346px] flex flex-wrap overflow-y-auto" 
                    animate={largeNoteOpen ? "small" : "normal"}
                    variants={variantsleft}>
                    {notes_array.map((note) => 
                        <Note 
                            key={note.noteid}
                            lst_edt_dt={note.last_edited_date} 
                            lockStatus={note.islocked}
                            previewtxt={note.fullnotestxt}
                            previewtxtcol={note.note_txt_colour} 
                            bgCOL={note.note_bg_colour} 
                            noteid={note.noteid} 
                            gridview={gridview}
                            opennotelarger={makeNoteLarger}/>)}
                </motion.div>
                <motion.div className="min-h-[346px]" 
                    animate={largeNoteOpen ? "wide" : "normal"}
                    variants={variantsright}
                    style={{visibility: largeNoteOpen ? "visible" : "hidden"}}>
                        {largeNoteOpen && (<Notepreview  
                            note={openedNote} 
                            apptheme={apptheme}
                            generalcs={generalcs}
                            closeNote={makeNoteSmaller}
                            openEditor={changepage}
                            handleNoteChanges={handleNoteChanges}
                            />)}
                        <p className="italic text-[10px] ml-[20px] mt-[-40px] text-left font-normal"
                            style={{color: colours.gray900}}
                        >
                            *autosave is enabled by default so your text will be saved as you type
                        </p>
                </motion.div>
            </div>
        </motion.div>
    )
}