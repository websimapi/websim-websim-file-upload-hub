export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const copyToClipboard = (text, event) => {
    navigator.clipboard.writeText(text).then(() => {
        if (event && event.target) {
            const button = event.target;
            const originalText = button.textContent;
            button.textContent = '✅ Copied!';
            button.classList.add('bg-green-600');
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('bg-green-600');
            }, 2000);
        }
    });
};

// Add this function for handling file serving requests
export const handleFileServingRequest = async (room, username, filename) => {
    try {
        const files = await room.query(
            'SELECT file_url, filename, content_type, file_size, upload_date FROM public.uploaded_files WHERE uploader_username = $1 AND filename = $2',
            [username, filename]
        );
        
        if (files.length === 0) {
            return { error: `File "${filename}" not found for user @${username}` };
        }
        
        return { file: files[0] };
    } catch (error) {
        console.error('Error fetching file:', error);
        return { error: `Error loading file: ${error.message}` };
    }
};