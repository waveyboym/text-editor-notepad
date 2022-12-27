import useLocalStorage from 'use-local-storage';
import { useState } from 'react';
import {Home, Settings, Search, Sidenavbar, Navbar} from "./pages";
import './App.scss';

function App() {
    const lighttheme: Boolean = true;//default is light mode
    const [colourtheme, setTheme] = useLocalStorage<Boolean>('colourtheme', lighttheme ? true : false); 
    
    const [general_cs, set_general_cs] = useLocalStorage<String>("general_cs", "#EDAC47");
     //default is yellow/900
    const [notes_colours, set_notes_colours] = useLocalStorage<String[]>("notes_colours", ["#EDAC47", "#222222"]); 
    //default notes colors are yellow/900 and black/900
    const [search_query, set_search_query] = useState<String>("");
    const [current_page, set_current_page] = useState<String>("Home");

    function switchThemes(){setTheme(!colourtheme);}

    function switchGeneralCS(color: String){set_general_cs(color);}

    function switchNotesColours(array: String[]){set_notes_colours(array);}

    function changeToPage(page: String){set_current_page(page);}

    function searchThis(search: String){set_search_query(search);}

    return (
        <div className="App">
            <div className="top-most-navbar"><Navbar apptheme={colourtheme} searching={searchThis}/></div>
            <div className="app-content">
                <div className="side-navbar"><Sidenavbar 
                                                apptheme={colourtheme} 
                                                generalcs={general_cs}
                                                changePg={changeToPage}
                                            />
                </div>
                {
                    (
                    () => {
                        switch(current_page){
                        case "Home":
                            return <Home apptheme={colourtheme} notescolours={notes_colours} generalcs={general_cs}/>
                        case "Search":
                            return <Search apptheme={colourtheme} notescolours={notes_colours} searchq={search_query}/>
                        case "Settings":
                            return <Settings 
                                        changeTheme={switchThemes}
                                        changeGeneralCS={switchGeneralCS}
                                        changeNotesColour={switchNotesColours}

                                        notescolours={notes_colours}
                                        apptheme={colourtheme}
                                        generalcs={general_cs} />
                        default:
                            return <Home apptheme={colourtheme} notescolours={notes_colours} generalcs={general_cs}/>
                        }
                    }
                    )()
                }
            </div>
        </div>
    )
}

export default App