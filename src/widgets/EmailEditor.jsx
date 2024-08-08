import { useRef, useState,} from 'react';
import EmailEditor from 'react-email-editor';

const EmailEditorComponent = () => {

  const [inputValue, setInputValue] = useState('Untitled design');

  const emailEditorRef = useRef(null);



  const handleInputChange = (e) => {
    let value = e.target.value;
    value = value.trim().replace(/\s+/g, '-'); 
    setInputValue(value);
    console.log(value);
  };

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { html } = data;
      console.log(html);
    });
  };

  const downloadHtmlFile = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { html } = data;
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = inputValue;
      a.click();
      URL.revokeObjectURL(url);
    });

  };


  return (
    <div>
      <div id='EditorNav' className="flex justify-between px-3 py-3">
       
      <input type="text" id="titleInput" value={inputValue}  onChange={handleInputChange} className="block w-2/12 h-11 p-2 border-none focus:outline-0 focus:border-black" />
       
       <div>
       <button className=' text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={exportHtml}>View HTML</button>
       <button className=' text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={downloadHtmlFile}>Download HTML</button>
       </div>
      </div>
      <div className="relative">
        {/* <div className="flex justify-end mb-4">
        <button onClick={exportHtml} className="px-4 py-2 bg-blue-500 text-white rounded">
          Export HTML
        </button>
      </div> */}
        <EmailEditor
          style={{
            width: "100vw",
            height: "calc(100vh - 72px)"
          }}
          ref={emailEditorRef} />
      </div>
    </div>

  );
};

export default EmailEditorComponent;
