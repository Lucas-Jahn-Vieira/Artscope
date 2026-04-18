//useLeftBar.tsx

import { useState } from 'react';

export default function useLeftBar() {
    const [LBaropen, setOpen] = useState(false);

    const openLBar = () => {setOpen(true)}
    const closeLBar = () => {setOpen(false)}

    const barAddText = () => {
        closeLBar();
    }

    const barAddImg = () => {
        closeLBar();
    }

    const barAddBox = () => {
        closeLBar();
    }

    return {
        LBaropen,
        openLBar,
        closeLBar,
        barAddText,
        barAddImg,
        barAddBox
    }
}