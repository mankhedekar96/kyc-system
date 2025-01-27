import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../lib/store';
import { Upload, File, X } from 'lucide-react';
import { uploadFile } from '../api/upload';
import { submitKYC } from '../api/kyc';

interface KycForm {
  document_url: FileList;
}

export default function KycSubmission() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { register, handleSubmit, formState: { errors }, setError, watch } = useForm<KycForm>();

  // Watch for file changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'document_url' && value.document_url?.length) {
        setSelectedFile(value.document_url[0]);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleRemoveFile = () => {
    setSelectedFile(null);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const onSubmit = async (data: KycForm) => {
    try {
      if (!user) throw new Error('Not authenticated');
      setIsUploading(true);

      const file = data.document_url[0];

      // Upload document to 'uploads' directory
      const { data: uploadData } = await uploadFile(file);

      if (!uploadData.publicUrl) {
        throw new Error('Failed to get public URL for uploaded document');
      }

      // Create KYC submission
      await submitKYC({
        userId: user.id,
        documentUrl: uploadData.publicUrl,
      });

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Upload error:', error);
      setError('root', {
        message: error.message || 'Failed to submit KYC document. Please try again.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              KYC Document Submission
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Please upload a valid government-issued ID document (passport, driver's license, or national ID card).</p>
            </div>
            <form className="mt-5 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Identity Document
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {!selectedFile ? (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="document_url"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="document_url"
                              type="file"
                              className="sr-only"
                              accept="image/*,.pdf"
                              {...register('document_url', {
                                required: 'Document is required',
                                validate: {
                                  fileSize: (files) => 
                                    !files[0] || files[0].size <= 10 * 1024 * 1024 || 'File size must be less than 10MB',
                                  fileType: (files) =>
                                    !files[0] || 
                                    ['image/jpeg', 'image/png', 'application/pdf'].includes(files[0].type) ||
                                    'File must be an image (JPEG, PNG) or PDF'
                                }
                              })}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, PDF up to 10MB
                        </p>
                      </>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                          <File className="h-8 w-8 text-gray-400 mr-2" />
                          <div className="text-sm text-left">
                            <p className="font-medium text-gray-900">{selectedFile.name}</p>
                            <p className="text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="ml-4 p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                          >
                            <X className="h-5 w-5 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {errors.document_url && (
                  <p className="mt-1 text-sm text-red-600">{errors.document_url.message}</p>
                )}
              </div>

              {errors.root && (
                <div className="rounded-md bg-red-50 p-4 mt-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Upload Error
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        {errors.root.message}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isUploading || !selectedFile}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isUploading || !selectedFile
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  }`}
                >
                  {isUploading ? 'Uploading...' : 'Submit KYC Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}