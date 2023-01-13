import { colours, shadows } from "../styles/styles";
import { FunctionComponent } from 'react';
import { motion } from "framer-motion";
import { Lockiconw } from "../icons/icons";

type NoteProps = {
    lst_edt_dt: string,
    previewtxt: string,
    previewtxtcol: string,
    bgCOL: string,
    islocked: boolean,
    noteid: string,
    gridview: boolean,
    opennotelarger: (arg: string) => void;
}

const variants = {
    normal: { height: "200px", width: "200px"},
    wide: {  height: "78px", width: "100%",},
}

const Note : FunctionComponent<NoteProps> = ({lst_edt_dt, previewtxt, previewtxtcol, bgCOL, islocked, noteid, gridview, opennotelarger}) => {
    return (
        <motion.div
            className="rounded-[20px] overflow-hidden mt-[10px]" 
            style={{
                boxShadow: shadows.bgShadow, 
                background: bgCOL,
                marginLeft: gridview ? "10px" : "20px",
                marginRight: gridview ? "50px" : "20px",
                marginBottom: gridview ? "50px" : "5px",
            }} 
            animate={gridview ? "normal" : "wide"}
            variants={variants}
            onClick={() => opennotelarger(noteid)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            transition={{
                default: {
                duration: 0.1,
                ease: [0, 0.61, 0.2, 0.89]
                },
                scale: {
                type: "spring",
                damping: 4,
                stiffness: 110,
                restDelta: 0.001
                }
            }}
            >
                <div className="z-[1] rounded-[20px] overflow-hidden" 
                    style={{
                        width: gridview ? "200px" : "100%",
                        height: gridview ? "200px" : "78px",
                    }} >
                    <h5 className="text-[12px] italic ml-[17px] mr-[17px] pt-[12px] font-normal text-left" style={{color: colours.gray900}}>
                        {lst_edt_dt}
                    </h5>
                    <p className="text-[14px] ml-[17px] mr-[17px] mt-[8px] overflow-clip text-ellipsis font-medium text-left"
                        style={{color: previewtxtcol, maxHeight: gridview ? "150px" : "25px"}}>
                            {previewtxt}
                    </p>
                </div>
                <div className="ml[-100px] rounded-[20px] overflow-hidden
                    z-10 flex justify-center items-center backdrop-blur-[12.5px]"
                    style={{
                        visibility: islocked ? "visible" : "hidden", 
                        background: colours.black90025,
                        width: gridview ? "200px" : "100%",
                        height: gridview ? "200px" : "78px",
                        marginTop: gridview ? "-200px" : "-78px",
                        marginRight: gridview ? "-100px" : "100%",
                        }}>
                        <Lockiconw />
                </div>
        </motion.div>
    )
}

export default Note