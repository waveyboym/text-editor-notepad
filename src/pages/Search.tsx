import { FunctionComponent } from 'react';
import { motion } from "framer-motion";

type SearchProps = {
    apptheme: Boolean,
    searchq: String
}

export const Search : FunctionComponent<SearchProps> = ({apptheme, searchq}) => {
    return (
        <motion.div
            className=""
            initial={{scale: 0.9, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 0.9, opacity: 0}}
        >
            Search
        </motion.div>
    )
}