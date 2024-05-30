import React, { useState } from 'react';
import { AiOutlineUpload, AiOutlineInfoCircle } from 'react-icons/ai';

const DocumentUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    previewImage: '',
    authoredBy: '',
    // Add other relevant details here (e.g., keywords, tags)
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
    const ext = file.name.split('.').pop().toLowerCase();
    setFileType(ext);
  };

  const isFileTypeValid = () => ['pdf', 'docx', 'ppt'].includes(fileType);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement form submission logic here (e.g., send data to server)
    console.log('Submitted data:', formData, selectedFile);
    setSelectedFile(null);
    setFileName('');
    setFileType('');
    setFormData({ title: '', description: '', previewImage: '', authoredBy: '', /* reset other details */ });
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden transition duration-200 ease-in-out transform hover:scale-103">
      <div className="flex flex-col items-center px-4 py-6 space-y-3">
        <label htmlFor="fileUpload" className="text-lg font-medium text-gray-700">
          Upload a File (PDF, DOCX, PPT)
        </label>
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.docx,.ppt"
          required
        />
        <button
          type="button"
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!selectedFile || !isFileTypeValid()}
          onClick={() => document.getElementById('fileUpload').click()}
        >
          <AiOutlineUpload className="mr-2" /> Upload
        </button>
        {selectedFile && (
          <div className="text-base text-gray-700">
            Selected: {fileName} ( {fileType.toUpperCase()} )
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-3 py-4 px-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="title" className="text-base font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="description" className="text-base font-medium text-gray-700">
            Description
          </label>
          <AiOutlineInfoCircle className="text-blue-500 hover:text-blue-700 cursor-pointer" />
          <textarea
            id="description"
            name="description"
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Sample data */}
        <div className="text-base text-gray-700">
          Sample Data:
          <br />
          Title: Sample Document
          <br />
          Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DocumentUpload;
