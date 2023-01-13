import { FunctionComponent, useState } from 'react';
import { motion } from "framer-motion";
import { shadows } from '../styles/styles';

type NotepreviewProps = {
    apptheme: boolean,
    generalcs: string,
    note: { 
            noteid: string,
            lst_edt_dt: string,
            previewtxt: string,
            previewtxtcol: string,
            bgCOL: string,
            islocked: boolean,
            fullnotetext: string
                },
}

const Notepreview : FunctionComponent<NotepreviewProps> = ({apptheme, generalcs, note}) => {
    return (
        <div className="mt-[10px] mb-[50px] rounded-[20px] overflow-hidden ml-[25px]" 
            style={{width: "calc(100% - 50px)", 
                    height: "calc(100% - 50px)", 
                    boxShadow: shadows.bgShadow, 
                    background: note.bgCOL,
                    }}>
            {note.noteid}
        </div>
    )
}

export default Notepreview