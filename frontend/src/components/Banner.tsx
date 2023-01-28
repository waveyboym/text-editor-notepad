import { FunctionComponent } from 'react';
import { Palleteicon, Personicon, Settingsicon } from '../icons/icons';
import { colours, shadows } from '../styles/styles';

type bannerprops = {
    generalcs: string,
    subsection: string,
    text: string,
}

const Banner : FunctionComponent<bannerprops> = ({generalcs, subsection, text}) => {
    return (
        <div className="h-[158px] rounded-[20px]" 
            style={{ background: generalcs, boxShadow: shadows.bgShadow, width: "calc(100% - 10px)"}}>
            <h1 className="text-center font-medium text-[36px] pt-[35px]" style={{color: colours.white900}}>{text}</h1>
            <div className="flex justify-center mt-[20px]">
                {subsection === "Accountsettings" ? (<Personicon apptheme={false} />)
                : subsection === "Generalsettings" ? (<Settingsicon apptheme={false} />)
                : (<Palleteicon apptheme={false} />)}
            </div>
        </div>
    )
}

export default Banner