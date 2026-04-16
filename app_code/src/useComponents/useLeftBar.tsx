import { useState } from 'react';

export default function useLeftBar() {
    const [LBaropen, setOpen] = useState(false);

    const openLBar = () => {setOpen(true)}
    const closeLBar = () => {setOpen(false)}

    return {
        LBaropen,
        openLBar,
        closeLBar
    }
}