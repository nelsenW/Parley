import { useRef } from 'react';
import { useState } from 'react';
import csrfFetch from '../../store/csrf';

function NewServerForm(){
const [name, setName] = useState("");
const [iconFile, setIconFile] = useState(null);
const [iconUrl, setIconUrl] = useState(null);
const fileRef = useRef(null);

  const handleInput = e => {
    setName(e.currentTarget.value);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('server[name]', name);
    if (iconFile) {
      formData.append('server[icon]', iconFile);
    }
    const response = await csrfFetch('/api/servers', {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      setName("");
      setIconFile(null);
      setIconUrl(null);
      fileRef.current.value = null;
    }
  }

  const handleFile = e => {
    const file = e.currentTarget.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setIconFile(file);
        setIconUrl(fileReader.result);
      };
    }
  }

  const preview = iconUrl ? <img src={iconUrl} alt="" /> : null;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="server-name">Server name: </label>
      <input type="text"
        id="server-name"
        value={name}
        onChange={handleInput}/>
        <input type="file" ref={fileRef} onChange={handleFile}/>
        {preview}
      <button>Make a new Server!</button>
    </form>
  );
}

export default NewServerForm;