import { motion } from "framer-motion";

const Notefull = () => {
    return (
        <motion.div className="w-full h-full min-h-[456px]" 
            initial={{scale: 0.9, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 0.9, opacity: 0}}
        >
            <div className="w-[141px] h-full flex flex-col items-center">
                
            </div>
            <div>

            </div>
        </motion.div>
    )
}

export default Notefull