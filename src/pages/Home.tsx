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
                    lst_edt_dt: string,
                    previewtxt: string,
                    previewtxtcol: string,
                    bgCOL: string,
                    islocked: boolean,
                    fullnotetext: string;
                }[],
    changenote: (noteid: string, notedata: string) => void;
    mouseenter: () => void;
    mouseleave: () => void;
}

const variantsleft = {
    normal: { width: "100%"},
    small: { width: "47%",},
}

const variantsright = {
    normal: { width: 0},
    wide: { width: "50%",},
}

export const Home : FunctionComponent<HomeProps> = ({apptheme, generalcs, notes_array, changenote, mouseenter, mouseleave}) => {

    const [gridview, setgridview] = useState<boolean>(true);
    const [largeNoteOpen, setlargeNoteOpen] = useState<boolean>(false);
    const [noteToOpen, setnoteToOpen] = useState<{
                                        noteid: string,
                                        lst_edt_dt: string,
                                        previewtxt: string,
                                        previewtxtcol: string,
                                        bgCOL: string,
                                        islocked: boolean,
                                        fullnotetext: string}>({noteid: "",
                                                                lst_edt_dt: "",
                                                                previewtxt: "",
                                                                previewtxtcol: "",
                                                                bgCOL: "",
                                                                islocked: false,
                                                                fullnotetext: ""});

    function changeView(){setgridview(!gridview);}

    function makeNoteLarger(noteid: string){
        if(largeNoteOpen === true)changenote(noteToOpen.noteid, noteToOpen.fullnotetext);

        const noteObj = notes_array.find(e => e.noteid === noteid);
        if(noteObj === undefined)return;
        setnoteToOpen(noteObj);
        setlargeNoteOpen(true);
    }

    function makeNoteSmaller(){
        if(largeNoteOpen === true)changenote(noteToOpen.noteid, noteToOpen.fullnotetext);
        setnoteToOpen({ noteid: "",
                        lst_edt_dt: "",
                        previewtxt: "",
                        previewtxtcol: "",
                        bgCOL: "",
                        islocked: false,
                        fullnotetext: ""});
        setlargeNoteOpen(false);
    }

    function saveNoteChanges(notedata: string){setnoteToOpen({...noteToOpen, fullnotetext: notedata});}

    function openNoteEditor(arg: string){

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
                            lst_edt_dt={note.lst_edt_dt} 
                            previewtxt={note.previewtxt} 
                            previewtxtcol={note.previewtxtcol} 
                            bgCOL={note.bgCOL} 
                            islocked={note.islocked} 
                            noteid={note.noteid} 
                            gridview={gridview}
                            opennotelarger={makeNoteLarger}/>)}
                </motion.div>
                <motion.div className="min-h-[346px]" 
                    animate={largeNoteOpen ? "wide" : "normal"}
                    variants={variantsright}
                    style={{visibility: largeNoteOpen ? "visible" : "hidden"}}>
                        <Notepreview  
                            note={noteToOpen} 
                            apptheme={apptheme}
                            generalcs={generalcs}
                            closeNote={makeNoteSmaller}
                            changeNote={saveNoteChanges}
                            openEditor={openNoteEditor}
                            mouseenter={mouseenter} 
                            mouseleave={mouseleave}
                            />
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