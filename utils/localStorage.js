const STORAGE_KEY = 'websim_uploaded_files';

export const saveFileToLocalStorage = (fileData) => {
    try {
        const existingFiles = getFilesFromLocalStorage();
        const updatedFiles = [...existingFiles, fileData];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFiles));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
};

export const getFilesFromLocalStorage = () => {
    try {
        const storedFiles = localStorage.getItem(STORAGE_KEY);
        return storedFiles ? JSON.parse(storedFiles) : [];
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return [];
    }
};

export const removeFileFromLocalStorage = (fileId) => {
    try {
        const existingFiles = getFilesFromLocalStorage();
        const updatedFiles = existingFiles.filter(file => file.id !== fileId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFiles));
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
};

export const clearLocalStorage = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Error clearing localStorage:', error);
        return false;
    }
};

export const syncMissingRecords = async (room, currentUser) => {
    try {
        const localFiles = getFilesFromLocalStorage();
        const userLocalFiles = localFiles.filter(file => file.uploader_username === currentUser.username);
        
        if (userLocalFiles.length === 0) {
            return { synced: 0, errors: 0 };
        }

        // Get current database records
        const dbFiles = await room.collection('uploaded_files').filter({ uploader_username: currentUser.username }).getList();
        const dbFileIds = new Set(dbFiles.map(file => file.id));
        
        // Find missing records
        const missingFiles = userLocalFiles.filter(file => !dbFileIds.has(file.id));
        
        let synced = 0;
        let errors = 0;
        
        // Re-sync missing records
        for (const missingFile of missingFiles) {
            try {
                await room.collection('uploaded_files').upsert({
                    id: missingFile.id,
                    filename: missingFile.filename,
                    file_url: missingFile.file_url,
                    file_size: missingFile.file_size,
                    content_type: missingFile.content_type,
                    uploader_username: missingFile.uploader_username,
                    upload_date: missingFile.upload_date
                });
                synced++;
            } catch (error) {
                console.error('Error syncing file:', missingFile.filename, error);
                errors++;
            }
        }
        
        return { synced, errors, total: missingFiles.length };
    } catch (error) {
        console.error('Error during sync operation:', error);
        return { synced: 0, errors: 1, total: 0 };
    }
};