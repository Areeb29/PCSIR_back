const getDriveService = require('./service')
const fs= require('fs')

const FolderID = {
    "Images": "1ZHaMjgP_MJwN3i9ScfQx7KRbmQPt8flV",
    "nonReviewed": "1_Vtyobt_q4gp7epGI6PFBXZWLNe3HO2W",
    "PartialReviewed": "1xTB5y772LrUlWdqMmRLLnIb9O-GHqlou",
    "Finalized": "1KCWrLYt7w3zUPjzf9ajq6bZ2cmvVFA8F",
    "Differ":"1tc-sXWrFZ1Y4mwYKs_eyLH8Gm43QyfkJ",
    "Reviewed":"1N9HE2LjrZg_MSpcBPlvhq_qZveCGP03Z",
}

async function moveFile(fileId, newFolder) {

        // Retrieve the existing parents to remove
        const file = await getDriveService().files.get({
            fileId: fileId,
            fields: 'parents',
        });

        // Move the file to the new folder
        const previousParents = file.data.parents;
        const files = await getDriveService().files.update({
            fileId: fileId,
            addParents: FolderID[newFolder],
            removeParents: previousParents,
            fields: 'id, parents',
        });
        console.log(files.status);
        return files.status;
}

async function getImage(fileId) {

    const file = await getDriveService().files.get(
        {
            fileId: fileId,
            alt: "media"
        },
        { responseType: "stream" },
        );
        return file;   

}
async function listFiles(folderName) {

    try {
        // Retrieve the existing parents to remove
        const files = await getDriveService().files.list({
            q: `'${FolderID[folderName]}' in parents and trashed=false`
        })
        return files.data.files;
    } catch (err) {
        // TODO(developer) - Handle error
        throw err;
    }
}
exports.moveFile = moveFile
exports.listFiles = listFiles
exports.getImage = getImage