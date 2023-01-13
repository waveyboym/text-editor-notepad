import { FunctionComponent, useState } from 'react';
import { colours } from '../styles/styles';
import { motion } from "framer-motion";
import { Searchicon } from '../icons/icons';

type NavBarProps = {
    apptheme: boolean,
    searching: (arg: string) => void;
    mouseenter: () => void;
    mouseleave: () => void;
}

const searchtermtextstate = {search: "",}

const Navbar : FunctionComponent<NavBarProps> = ({apptheme, searching, mouseenter, mouseleave}) => {
    const [state, setState] = useState(searchtermtextstate);

    function handlechange(e: { target: { name: any; value: any; }; }) {setState({ ... state, [e.target.name] : e.target.value});}

    return (
        <div className="w-full h-[40px] flex items-center">
            <h1 className="font-['Lobster'] ml-[26px] text-[32px]" 
                style={{ color: apptheme ? colours.black900 : colours.white900}}>
                    Scribble
            </h1>
            <div className="ml-[30%] h-[40px] flex items-center">
                <input 
                    id="searchinput"
                    name="search"
                    type="text" 
                    placeholder="Search for..." 
                    style={{ color: colours.gray900, background: apptheme ? colours.white900 : colours.black800 }} 
                    onChange={handlechange}
                    className="font-['Inter'] text-[20px] w-[400px] h-[40px] rounded-[15px]
                    border-0 border-none outline-none pt-0 pb-0 pl-[4px] pr-[4px]"
                    onMouseEnter={mouseenter}
                    onMouseLeave={mouseleave}
                />
                <motion.div 
                    className="ml-[26px]" 
                    whileHover={{scale: 1.03}} 
                    whileTap={{scale: 0.97}} 
                    onClick={() => searching(state.search)}>
                        <Searchicon apptheme={apptheme}/>
                </motion.div>
            </div>
        </div>
    )
}

export default Navbar;