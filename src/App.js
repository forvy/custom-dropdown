import React from 'react';
import icon from './assets/favicon.ico';
import Dropdown from './components/Dropdown';

const options = ['Option 1', 'Option 2', 'Long Option 3', 'Long Long Option 4'];
const objectOptions = [{id: 1, label:'Option 1'}, {id: 2, label:'Option 2'}, {id: 3, label:'Long Option 3'}, {id: 4, label:'Long Long Option 4'}]

function App() {
  const optionsString = options.map(option=> `'${option}'`).join(', ')
  const objectOptionsString = objectOptions.map(option => `{ id: ${option.id}, label: '${option.label}' }`).join(', ');
  const customFunction = (option) => <span className='flex gap-2'><img src={icon} width={20} alt='' />Render - {option}</span>;
  
  return (
    <div className='p-3'>
      <h1>Example with Array Data:</h1>
      <pre>[{optionsString}]</pre>
      <h2 className="my-4">Multiple Searchable Dropdown Example</h2>
      <div className="m-4">
      <Dropdown options={options} searchable multiSelect/>
      </div>

      <h2 className="my-4">Single Searchable Dropdown Example</h2>
      <div className="m-4">
      <Dropdown options={options} searchable/>
      </div>

      <h1>Example with Object Data:</h1>
      <pre>[{objectOptionsString}]</pre>
      <h2 className="my-4">Multiple Dropdown With custom Render Option Example</h2>
      <div className="m-4">
      <Dropdown options={objectOptions} multiSelect renderOption={customFunction}/>
      </div>

      <h2 className="my-4">Single Dropdown Example</h2>
      <div className="m-4">
      <Dropdown options={objectOptions} label={'Custom Label'}/>
      </div>
    </div>
    
  );
}

export default App;
