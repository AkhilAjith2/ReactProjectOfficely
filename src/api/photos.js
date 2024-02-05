import LoginStore from "./LoginStore";

const url = 'https://officely.azurewebsites.net/offices';
const getUrl = (officeId) => `${url}/${officeId}/photos`;

const uploadByUrl = async function(officeId, fileUrl, isMain)
{
    let uploadUrl = getUrl(officeId);
    if (isMain)
    {
        uploadUrl += '/main';
    }
    uploadUrl += '/url';

    return fetch(uploadUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${LoginStore.getState().jwttoken}`},
        body: JSON.stringify({ fileUrl })
    });
}

const uploadFile = async function(officeId, file, isMain)
{
    const formData = new FormData();
    formData.append('file', file);

    let uploadUrl = getUrl(officeId);
    if (isMain)
    {
        uploadUrl += '/main';
    }

    return fetch(uploadUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${LoginStore.getState().jwttoken}`},
        body: formData
    });
}

const deletePhoto = async function(officeId, fileUrl)
{
    return fetch(getUrl(officeId), {
        method: 'DELETE',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LoginStore.getState().jwttoken}`},
        body: JSON.stringify({ fileUrl })
    });
}

const uploadMainPhoto = (officeId, file) => uploadFile(officeId, file, true);
const uploadAdditionalPhoto = (officeId, file) => uploadFile(officeId, file, false);
const uploadMainPhotoByUrl = (officeId, fileUrl) => uploadByUrl(officeId, fileUrl, true);
const uploadAdditionalPhotoByUrl = (officeId, fileUrl) => uploadByUrl(officeId, fileUrl, false);

export { uploadMainPhoto, uploadAdditionalPhoto, uploadMainPhotoByUrl, uploadAdditionalPhotoByUrl, deletePhoto };