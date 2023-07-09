import useLocalStorage from 'use-local-storage';
import { useState, useEffect } from 'react';
import {Home, Settings, Search, Editor} from "./pages";
import { SideNavbar, Navbar } from "./components";
import { colours } from './styles/styles';
import { Cursoricon, Cursortexticon } from './icons/icons';
import { useMouseStore, useNotesSizeStore } from './stateStore';
import { notesArr } from './content/notes';

const minAppW: string = "1031px";
const minAppH: string = "570px";

function App() {
    const lighttheme: boolean = true;//default is light mode
    const [isLighttheme, setTheme] = useLocalStorage<boolean>('isLighttheme', lighttheme ? true : false);
    const [general_cs, set_general_cs] = useLocalStorage<string>("general_cs", colours.yellow900);//app general colour scheme
    const [notes_array, set_notes_array] = useState<{
        noteid: string,
        last_edited_date: string,
        islocked: boolean,
        note_txt_colour: string,
        note_bg_colour: string,
        fullnotestxt: string,
    }[]>(notesArr);
    const [openedNote, setnoteToOpen] = useState<{
        noteid: string,
        last_edited_date: string,
        islocked: boolean,
        note_txt_colour: string,
        note_bg_colour: string,
        fullnotestxt: string,
    }>({noteid: "", last_edited_date: "", islocked: false, note_txt_colour: "", note_bg_colour: "", fullnotestxt: ""});

    const[tempNoteCount, setCount] = useState<number>(8);


    const [noteTextState, setnoteTextState] = useState<string | undefined>();
    const [noteLockState, setnoteLockState] = useState<boolean | undefined>();
    const [noteTxtColState, setnoteTxtColState] = useState<string | undefined>();
    const [notebgColState, setnotebgColState] = useState<string | undefined>();
    const [noteDateState, setnoteDateState] = useState<string | undefined>();


    const [current_page, set_current_page] = useState<string>("Home");//current page
    const [mousePos, setMousePos] = useState<{xPos: number, yPos: number}>({xPos: 0, yPos: 0});//mouse mover
    const mouseState = useMouseStore((state) => state.isDefault);//is text selector or mouse. If default it is mouse else text selector
    const setNotesSize = useNotesSizeStore((state) => state.setsize);
    const [search_query, set_search_query] = useState<string>("");//notes search query



    function switchThemes(){setTheme(!isLighttheme);}

    function switchGeneralCS(color: string){set_general_cs(color);}

    function changeToPage(page: string){set_current_page(page);}

    function searchThis(search: string){
        set_search_query(search); /*changeToPage("Search");*/
    }

    function handleNoteChanges(type: string, data: string){
        if(type === "fullnotestxt")setnoteTextState(data);
        else if(type === "last_edited_date")setnoteDateState(data);
        else if(type === "islocked")setnoteLockState(data === "lock" ? true : false);
        else if(type === "note_bg_colour")setnotebgColState(data);
        else if(type === "note_txt_colour")setnoteTxtColState(data);
    }

    function handleDeleteNote(){
        set_notes_array((currentNoteArr) => currentNoteArr.filter((currentNote) => currentNote.noteid !== openedNote.noteid));
        changeToPage("Home");
        setnoteToOpen({noteid: "", last_edited_date: "", islocked: false, note_txt_colour: "", note_bg_colour: "", fullnotestxt: "",});
    }

    function openThisNote(noteid: string){setnoteToOpen(
        notes_array.find(e => e.noteid === noteid) 
        || 
        {noteid: "", last_edited_date: "", islocked: false, note_txt_colour: "", note_bg_colour: "", fullnotestxt: "",});
    }

    function saveNoteChanges(noteid: string, notedata: string){
        const notes : { 
            noteid: string,
            last_edited_date: string,
            islocked: boolean,
            note_txt_colour: string,
            note_bg_colour: string,
            fullnotestxt: string,
        }[] = notes_array.map(note =>{
            if(note.noteid === noteid)
                return {
                    noteid: noteid,
                    last_edited_date: noteDateState === undefined ? openedNote.last_edited_date : noteDateState,
                    islocked: noteLockState === undefined ? openedNote.islocked : noteLockState,
                    note_txt_colour: noteTxtColState === undefined ? openedNote.note_txt_colour : noteTxtColState,
                    note_bg_colour: notebgColState === undefined ? openedNote.note_bg_colour : notebgColState,
                    fullnotestxt: noteTextState === undefined ? openedNote.fullnotestxt : noteTextState,
                };
            else return note;
        });
        
        setnoteTextState(undefined);
        setnoteDateState(undefined);
        setnoteLockState(undefined);
        setnoteTxtColState(undefined);
        setnotebgColState(undefined);
        setnoteToOpen({noteid: "", last_edited_date: "", islocked: false, note_txt_colour: "", note_bg_colour: "", fullnotestxt: ""});
        set_notes_array(notes);
    }

    function closeTextEditor(noteid: string, notedata: string){
        saveNoteChanges(noteid, notedata);
        changeToPage("Home");
    }

    function createNote(textdata: string){
        changeToPage("Home");
        const Note_obj: {
            noteid: string,
            last_edited_date: string,
            islocked: boolean,
            note_txt_colour: string,
            note_bg_colour: string,
            fullnotestxt: string,
        } = {
            noteid: "note" + tempNoteCount.toString(),
            last_edited_date: new Date().toDateString(),
            islocked: false,
            note_txt_colour: colours.white900,
            note_bg_colour: colours.black900,
            fullnotestxt: textdata,
          };
        setCount(tempNoteCount + 1);
        set_notes_array(oldArray => [...oldArray, Note_obj]);
    }

    const getSizeInBytes = () => {
        let str = null;
        if (typeof notes_array === 'string') {
            str = notes_array; // If obj is a string, then use it
        }
        else {
            str = JSON.stringify(notes_array);// Else, make obj into a string
        }
        const bytes = new TextEncoder().encode(str).length;// Get the length of the Uint8Array
        return bytes;
    };

    useEffect(() => {
        const mouseMove = (e: { clientX: any; clientY: any; }) => {setMousePos({xPos: e.clientX, yPos: e.clientY});}

        window.addEventListener("mousemove", mouseMove);
    
        return () => {window.removeEventListener("mousemove", mouseMove);}
    }, [])

    useEffect(() => {
        const getNotesArrsize = () => setNotesSize(getSizeInBytes());

        getNotesArrsize();
        
        return () => getNotesArrsize()
    }, [])




    return (
        <div className="App" style={{
                                    width: "100vw", 
                                    height: "100vh", 
                                    minWidth: minAppW, 
                                    minHeight: minAppH, 
                                    overflow: "hidden",
                                    background: isLighttheme ? colours.white900 : colours.black800
                                    }}>
            <div className="w-[28px] h-[28px] fixed top-0 left-0 z-50 pointer-events-none" 
                style={{top: mousePos.yPos, left: mousePos.xPos, cursor: "pointer"}}>
                    {mouseState ? <Cursoricon /> : <Cursortexticon />}
            </div>
            <div className="w-full mt-[20px]" style={{height: current_page === "Editor" ?  "0px" : "40px"}}>
                <Navbar 
                    apptheme={isLighttheme} 
                    searching={searchThis}/>
            </div>
            <div className="w-full flex mt-[34px]" style={{height: "calc(100% - 94px)"}}>
                <div className="mt-[82px] w-[40px] h-[179px]" 
                style={{marginLeft: current_page === "Editor" ?  "-40px" : "50px"}}>
                    <SideNavbar 
                        selected_page={current_page}
                        apptheme={isLighttheme} 
                        generalcs={general_cs}
                        changePg={changeToPage}
                        createNote={createNote}
                    />
                </div>
                <div className="ml-[50px] mt-[0px] h-full min-h-[406px] overflow-hidden " style={{width: "calc(100% - 140px)"}}>
                    {
                        (
                        () => {
                            switch(current_page){
                                case "Search":
                                    return <Search apptheme={isLighttheme} searchq={search_query}/>
                                case "Editor":
                                    return <Editor 
                                                apptheme={isLighttheme} 
                                                generalcs={general_cs} 
                                                openedNote={openedNote}
                                                closenote={closeTextEditor}
                                                handleNoteChanges={handleNoteChanges}/>
                                case "Settings":
                                    return <Settings 
                                                changeTheme={switchThemes}
                                                changeGeneralCS={switchGeneralCS}
                                                apptheme={isLighttheme}
                                                generalcs={general_cs} />
                                default:
                                    return <Home 
                                                apptheme={isLighttheme} 
                                                generalcs={general_cs} 
                                                notes_array={notes_array}
                                                openedNote={openedNote}
                                                openThisNote={openThisNote}
                                                changenote={saveNoteChanges}
                                                changepage={changeToPage}
                                                handleNoteChanges={handleNoteChanges}
                                                />
                            }
                        }
                        )()
                    }
                </div>
            </div>
        </div>
    )
}

export default App