import apiClient from './index';

//Upload a file to the server
export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file); // Attach the file to the form data

    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set appropriate content type
      },
    });

    console.log('File upload successful!');
    return response;
  } catch (error: any) {
    console.error('Error uploading file:', error);
    throw new Error(error.response?.data?.message || 'File upload failed');
  }
};
