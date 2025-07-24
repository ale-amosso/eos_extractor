import { useState } from 'react';
import axios from "axios";
import './App.css';
import Header from './components/Header';
import UploadCard from './components/Upload_Card';



function App() {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

  const [file, setFile] = useState(null);
  const [mass, setMass] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [result, setResult] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);


  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.zip')) {
      setFile(droppedFile);
    } else {
      alert('Upload only eos.zip files');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !mass) {
      alert("Please provide both file and mass.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mass", mass);

    setUploading(true); // shows the progress bar
    setUploadProgress(0); // reset

    try {
      const response = await axios.post(`${apiUrl}/get_radius`, formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
         withCredentials: false
      });

      const data = response.data;

      setResult(`Estimated radius: ${data.radius} km`);
    } catch (error) {
      setResult("Request failed: " + error.message);
    } finally {
      setUploading(false); // hide the progress bar
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <UploadCard
          file={file}
          dragOver={dragOver}
          setDragOver={setDragOver}
          handleDrop={handleDrop}
          mass={mass}
          setMass={setMass}
          handleSubmit={handleSubmit}
          uploading={uploading}                
          uploadProgress={uploadProgress} 
        />
        {result && <p style={{ marginTop: '1rem' }}>{result}</p>}
      </header>
    </div>
  );
}

export default App;
