const { bucket } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const uploadFile = async (file, folder = '') => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('No file provided'));
        }

        const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
        const filePath = folder ? `${folder}/${fileName}` : fileName;
        const fileUpload = bucket.file(filePath);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        blobStream.on('error', (error) => {
            reject(error);
        });

        blobStream.on('finish', async () => {
            // Make the file public
            try {
                await fileUpload.makePublic();
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
                resolve(publicUrl);
            } catch (error) {
                // Fallback if makePublic fails (e.g. permissions), try getSignedUrl or just return error
                // For now, let's assume we want public access or we can generate a signed URL
                // const [url] = await fileUpload.getSignedUrl({ action: 'read', expires: '03-09-2491' });
                // resolve(url);
                reject(error);
            }
        });

        blobStream.end(file.buffer);
    });
};

module.exports = {
    uploadFile,
};
