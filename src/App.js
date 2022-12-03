import React, { useRef, useState } from 'react';
import axios from 'axios';

const App = ({ resetForm }) => {
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const [message, setMessage] = useState('');

  const handleClick = () => inputRef && inputRef.current && inputRef.current.click();
  const handleFiles = (e) => setFiles(e.target.files ? e.target.files : []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0) {
      const formData = new FormData();
      formData.append('singleImage', files[0]);
      axios.post('http://localhost:5000/single', formData)
        .then(data => setMessage(data.data.message))
        .catch((error) => setMessage('Error'));
      setFiles([]);
      formRef.current && formRef.current.reset();
      setTimeout(() => {
        setMessage('');
      }, 4000);
    }
  }

  return (
    <div className='container'>
      <form className='mt-4' style={{ height: '8rem', border: '.4px dashed black' }} ref={formRef}>
        <div className="mui--text-dark-secondary mui--text-button">{message}</div>
        <div className="upload-box d-flex justify-content-center fw-bold" onClick={handleClick}>
          Click to Upload file (Single Image) <hr />
          {files[0] && files[0].name}
        </div>
        <input type="file" ref={inputRef} onChange={handleFiles} style={{ display: 'none' }} />
      </form>
      <button className="mui-btn mui-btn--primary" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default App;
