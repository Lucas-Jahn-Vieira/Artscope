import React from 'react';
import { Button, Paper, Slide } from '@mui/material';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import type { StageItem } from '../App';

interface ConfigBarProps {
    selectedId: string | null;
    StageItems: any[];
    updateItem: (id:string, newAttributes: Partial<StageItem>) => void;
}

export default function ConfigBar({ selectedId, StageItems, updateItem }: ConfigBarProps) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const selectedItem = StageItems.find(item => item.id === selectedId);

    // if there is a selected item and its type is 'image', then isImageSelected will be true, otherwise false
    const isImageSelected = selectedItem && selectedItem.type === 'image';

    const handleUrlChange = () => {
        const newUrl = window.prompt("Enter image URL:");
        if (newUrl && selectedId) {
            updateItem(selectedId, { src: newUrl });
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && selectedId) {
            // Transforma o arquivo do PC num link temporário local
            const localUrl = URL.createObjectURL(file);
            updateItem(selectedId, { src: localUrl });
        }
        // resets the file input so that the same file can be selected again if needed
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
            <Slide
                direction='up'
                in={isImageSelected} // only shows the ConfigBar if there is a selected item
                mountOnEnter = {true} // smoothes in animation of the bar
                unmountOnExit = {true} // smoothes out animation of the bar
            >
                <Paper
                    elevation={6}
                    sx={{
                        position: 'fixed',
                        bottom: "30px", // fluctuates a little higher than the bottom edge
                        left: "40%",
                        padding: "10px 20px",
                        borderRadius: "12px",
                        backgroundColor: "rgb(77, 91, 120)",
                        display: "flex",
                        gap: "15px",
                        zIndex: 1000
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<InsertLinkIcon />} // icon of a link
                        color="primary"
                        onClick={handleUrlChange}
                    >
                        Change URL
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<UploadFileIcon />} // icon of a file upload
                        color="primary"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Upload File
                    </Button>

                    {/* File input, hidden */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </Paper>
            </Slide>
    );
}
