import { FunctionComponent } from 'react';
import { motion } from "framer-motion";
import { colours, shadows } from '../styles/styles';
import { Textfileicon, Wordfileicon, Imagefileicon, Fileicon, Rawfileicon } from '../icons/icons';

type sharenoteprops = {
    fullnotestext: string,
    sharenote_open: boolean,
    apptheme: boolean,
}

const variants = {
    open: { height: "156px", opacity: 1 },
    closed: {  height: "0px", opacity: 0 },
}

const Sharenote : FunctionComponent<sharenoteprops> = ({ apptheme, fullnotestext, sharenote_open }) => {

    function saveAsText(content: string, htmlText: boolean){
        const link = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        link.href = URL.createObjectURL(file);

        if(htmlText === true) link.download = "note.html";
        else link.download = "note.txt";
        
        link.click();
        URL.revokeObjectURL(link.href);
    }
    
    function quickshareNote(typeofshare: string){
        if(typeofshare === "text"){saveAsText(fullnotestext.replace(/<[^>]+>/g, ''), false);}
        else if(typeofshare === "raw"){saveAsText(fullnotestext, true);}
    }

    return (
        <motion.div className="rounded-[15px] overflow-hidden z-30 w-[185px]" 
            animate={sharenote_open ? "open" : "closed"}
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
                        Export a text file
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
                        Export as word doc
                    </h5>
                </motion.div>

                <motion.div className="flex ml-[12px] mt-[12px]" onClick={() => quickshareNote("raw")} whileTap={{scale: 0.97}}>
                    <Rawfileicon apptheme={apptheme}/>
                    <h5  className="ml-[7px] text-[14px] font-medium"
                        style={{color: apptheme ? colours.black900 : colours.white900}}>
                        Export as raw html
                    </h5>
                </motion.div>

        </motion.div>
    )
}

export default Sharenote