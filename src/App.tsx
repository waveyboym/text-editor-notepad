import useLocalStorage from 'use-local-storage';
import { useState, useEffect } from 'react';
import {Home, Settings, Search} from "./pages";
import { SideNavbar, Navbar } from "./components";
import { colours } from './styles/styles';
import { Cursoricon, Cursortexticon } from './icons/icons';
import { Greet } from "../wailsjs/go/main/App";

const minAppW: string = "1031px";
const minAppH: string = "570px";

function App() {
    const lighttheme: boolean = true;//default is light mode
    const [isLighttheme, setTheme] = useLocalStorage<boolean>('isLighttheme', lighttheme ? true : false); 
    const [mousePos, setMousePos] = useState<{xPos: number, yPos: number}>({xPos: 0, yPos: 0});
    const [isDefault, set_isDefault] = useState<boolean>(true);
    const [diskSize, setdiskSize] = useState<number>(0);
    
    const [general_cs, set_general_cs] = useLocalStorage<string>("general_cs", colours.yellow900);
    const [notes_array, set_notes_array] = useLocalStorage<{ 
                                                            noteid: string,
                                                            lst_edt_dt: string,
                                                            previewtxt: string,
                                                            previewtxtcol: string,
                                                            bgCOL: string,
                                                            islocked: boolean,
                                                            fullnotetext: string;
                                                        }[]>("notes_array", []);
    const [search_query, set_search_query] = useState<string>("");
    const [current_page, set_current_page] = useState<string>("Home");

    function switchThemes(){setTheme(!isLighttheme);}

    function switchGeneralCS(color: string){set_general_cs(color);}

    function changeToPage(page: string){set_current_page(page);}

    function searchThis(search: string){set_search_query(search); /*changeToPage("Search");*/}

    function changeMouseToTextSelect(){set_isDefault(!isDefault);}

    function changeMouseToDefault(){set_isDefault(!isDefault);}

    function saveNoteChanges(noteid: string, notedata: string){
        const notes : { 
            noteid: string,
            lst_edt_dt: string,
            previewtxt: string,
            previewtxtcol: string,
            bgCOL: string,
            islocked: boolean,
            fullnotetext: string;
        }[] = notes_array.map(note =>{
            if(note.noteid === noteid)return {...note, fullnotetext: notedata};
            else return note;
        });
        
        set_notes_array(notes);
    }

    function createNote(){
        
    }

    useEffect(() => {
        const mouseMove = (e: { clientX: any; clientY: any; }) => {setMousePos({xPos: e.clientX, yPos: e.clientY});}

        window.addEventListener("mousemove", mouseMove);
    
        return () => {window.removeEventListener("mousemove", mouseMove);}
    }, [])

    useEffect(() => {
        const getStorageSize = () => {
            if(diskSize != 0)return;

            Greet("")
            .then((disksize) => setdiskSize(parseInt(disksize)))
            .catch((error) => console.log(error));
        }

        getStorageSize();

        return () => { getStorageSize();}
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
                    {isDefault ? <Cursoricon /> : <Cursortexticon />}
            </div>
            <div className="w-full h-[40px] mt-[20px]">
                <Navbar 
                    apptheme={isLighttheme} 
                    searching={searchThis}
                    mouseenter={changeMouseToTextSelect}
                    mouseleave={changeMouseToDefault}/>
            </div>
            <div className="w-full flex mt-[34px]" style={{height: "calc(100% - 94px)"}}>
                <div className="mt-[82px] w-[40px] ml-[50px] h-[179px]">
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
                                case "Settings":
                                    return <Settings 
                                                changeTheme={switchThemes}
                                                changeGeneralCS={switchGeneralCS}
                                                mouseenter={changeMouseToTextSelect}
                                                mouseleave={changeMouseToDefault}
                                                notes_array={notes_array}
                                                apptheme={isLighttheme}
                                                generalcs={general_cs}
                                                storagesize={diskSize} />
                                default:
                                    return <Home 
                                                apptheme={isLighttheme} 
                                                generalcs={general_cs} 
                                                notes_array={notes_array} 
                                                mouseenter={changeMouseToTextSelect}
                                                mouseleave={changeMouseToDefault}
                                                changenote={saveNoteChanges}/>
                            }
                        }
                        )()
                    }
                </div>
            </div>
        </div>
    )
}
{/**140px */}
export default App