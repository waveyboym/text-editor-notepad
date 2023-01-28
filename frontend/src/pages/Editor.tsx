import { FunctionComponent, useState, useCallback, SetStateAction} from 'react';
import ContentEditable from 'react-contenteditable';
import { colours, shadows } from '../styles/styles';
import { Justifylefticon, Justifyicon, Justifycentericon, Justifyrighticon,
        Boldicon, Underlineicon, Italicicon, Strikethroughicon, Textsizeicon, Honeicon,
        Htwoicon, Hthreeicon, Linkicon, Linkicongrey, Listolicon, Listulicon, Codeslashicon,
        Minimizeicon, Unlockicon, Shareicon, Lockicon, Imagefileicon, Trashicon, Chevronleftw,} from '../icons/icons';
import { motion } from "framer-motion";
//import { Sharenote } from '../components';

type EditorProps = {
    apptheme: boolean,
    generalcs: string,
    openedNote: {
        noteid: string,
        last_edited_date: string,
        islocked: boolean,
        note_txt_colour: string,
        note_bg_colour: string,
        fullnotestxt: string,
    }
    closenote: (noteid: string, notedata: string) => void;
    handleNoteChanges: (type: string, data: string) => void;
}

export const Editor : FunctionComponent<EditorProps> = ({apptheme, generalcs, openedNote, closenote, handleNoteChanges}) => {

    const [crrntlySelectedHicon, set_crrntlySelectedHicon] = useState<string>("Honeicon");
    const [textState, settextState] = useState<string>(openedNote.fullnotestxt);

    const onContentChange = useCallback((evt: { currentTarget: { innerHTML: SetStateAction<string>; }; }) => {
		settextState(evt.currentTarget.innerHTML);
        //handleNoteChanges("fullnotestxt", evt.currentTarget.innerHTML.toString());
	}, [])


    return (
        <div className="w-full h-full">
            <div className="mt-[34px] h-[29px] flex flex-wrap items-center ml-[137px]"
                style={{width: "calc(100% - 100px)",}}
            >
                <h1 className="font-['Inter'] text-[24px] font-black" style={{color: apptheme ? colours.black900 : colours.white900}}>
                    Edit Note
                </h1>

                <div className="w-[196px] justify-evenly flex items-center ml-[10px]">
                    <motion.div onClick={() => {}} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}>
                        <Justifylefticon apptheme={apptheme}/>
                    </motion.div>
                    <motion.div onClick={() => {}} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}>
                        <Justifyicon apptheme={apptheme}/>
                    </motion.div>
                    <motion.div onClick={() => {}} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}>
                        <Justifycentericon apptheme={apptheme}/>
                    </motion.div>
                    <motion.div onClick={() => {}} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}>
                        <Justifyrighticon apptheme={apptheme}/>
                    </motion.div>
                </div>

                <div className="w-[264px] justify-evenly flex items-center ml-[10px]">
                    <motion.div onClick={() => {}} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}>
                        <Boldicon apptheme={apptheme}/>
                    </motion.div>
                    <motion.div onClick={() => {}} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}>
                        <Underlineicon apptheme={apptheme}/>
                    </motion.div>
                    <motion.div onClick={() => {}} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}>
                        <Italicicon apptheme={apptheme}/>
                    </motion.div>
                    <motion.div onClick={() => {}} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}>
                        <Strikethroughicon apptheme={apptheme}/>
                    </motion.div>
                    <motion.div className="flex" onClick={() => {}} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}>
                        <Textsizeicon apptheme={apptheme}/>
                        {crrntlySelectedHicon === "Honeicon" ? <Honeicon apptheme={apptheme} />
                        : crrntlySelectedHicon === "Htwoicon" ? <Htwoicon apptheme={apptheme} />
                        : <Hthreeicon apptheme={apptheme} />}
                    </motion.div>
                </div>

                <div className="w-[108px] justify-evenly flex items-center ml-[10px]">
                    <motion.div onClick={() => {}} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}>
                        <Linkicon apptheme={apptheme}/>
                    </motion.div>
                    <motion.div onClick={() => {}} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}>
                        <Linkicongrey apptheme={apptheme}/>
                    </motion.div>
                </div>

                <div className="w-[152px] justify-evenly flex items-center ml-[10px]">
                    <motion.div onClick={() => {}} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}>
                        <Listolicon apptheme={apptheme}/>
                    </motion.div>
                    <motion.div onClick={() => {}} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}>
                        <Listulicon apptheme={apptheme}/>
                    </motion.div>
                    <motion.div onClick={() => {}} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}>
                        <Codeslashicon apptheme={apptheme}/>
                    </motion.div>
                </div>

                <div className="w-[108px] justify-evenly flex items-center ml-[10px]">
                    <motion.div onClick={() => {}} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}>
                        <Shareicon apptheme={apptheme}/>
                    </motion.div>
                    <motion.div onClick={() => {}} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}>
                        <Minimizeicon apptheme={apptheme}/>
                    </motion.div>
                </div>

            </div>
            <div className="flex mt-[37px] h-full">
                <div className="w-[141px] h-full flex flex-col items-center">
                    <motion.div className="rounded-full mt-[24px] w-[24px] h-[24px]" 
                                onClick={() => {}} 
                                whileHover={{scale: 1.03}}
                                whileTap={{scale: 0.97}}
                                style={{border: "1px solid " + generalcs, boxShadow: shadows.bgShadow, }}/>
                    <motion.div className="mt-[35px]" onClick={() => {}} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}>
                        {openedNote.islocked ? <Lockicon apptheme={apptheme} /> : <Unlockicon apptheme={apptheme} />}
                    </motion.div>
                    <motion.div className="mt-[35px]" onClick={() => {}} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}>
                        <Imagefileicon apptheme={apptheme}/>
                    </motion.div>
                    <motion.div className="mt-[35px]" onClick={() => {}} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}}>
                        <Trashicon apptheme={apptheme}/>
                    </motion.div>
                </div>
                <div className="w-full h-full">
                    <div className="rounded-[20px] overflow-hidden min-h-[300px]" 
                        style={{
                            boxShadow: shadows.bgShadow, 
                            width: "calc(100% - 105px)", 
                            height: "calc(100% - 120px)", 
                            background: openedNote.note_bg_colour}}>
                        <div className="flex h-[24px] items-center ml-[17px] mt-[8px]">
                            <motion.div 
                                whileHover={{scale: 1.03}}
                                whileTap={{scale: 0.97}}
                                onClick={() => {}}><Chevronleftw /></motion.div>
                            <p className="ml-[4px] italic text-[12px]" style={{color: colours.gray900}}>{openedNote.last_edited_date}</p>
                        </div>
                        <div className="ml-[17px] mr-[17px] mt-[3px] mb-[17px] overflow-hidden" 
                            style={{
                                width: "calc(100% - 34px", 
                                height: "calc(100% - 52px)", 
                            }}>
                                <ContentEditable
                                    className="box-border border-none outline-none resize-none text-[12px]
                                    w-full h-full overflow-y-auto break-words overflow-x-clip font-['Inter']"
                                    style={{color: openedNote.note_txt_colour, background: "transparent"}}
                                    onChange={onContentChange}
                                    onBlur={onContentChange}
                                    html={textState} />
                        </div>
                    </div>
                    <p className="italic text-[10px] mt-[5px] text-left font-normal"
                            style={{color: colours.gray900}}
                        >
                        *autosave is enabled by default so your text will be saved as you type
                    </p>
                </div>
            </div>
        </div>
    )
}