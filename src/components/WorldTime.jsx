import { useState } from 'react';
import Watches from './Watches';


function WorldTime() {
  const reUtc = /^[-0-9]*\.?[0-9]+$/gm;
  const[watches,setWatch]=useState({watchName: '', utc: ''});
  const[data,setData]=useState({});
  const[result,setResult]=useState('');
  const handleState = (e) => {
    const {name, value} = e.target;
    setWatch((prevForm) => ({...prevForm, [name]: value}));
  }

  const handleDel = (e, delWatch) => {
    setData((prevData) => {
      return Object.fromEntries(Object.entries({...prevData}).filter(([watchName]) => watchName !== delWatch));
    });
    setWatch({watchName: '', utc: ''});
    setResult('Часы удалены');
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(reUtc.test(watches.utc)) {
      setData((prevData) => {
        return Object.fromEntries(Object.entries({...prevData, [watches.watchName]: watches.utc}))
      });
      setResult('Часы добавлены');
      setWatch({watchName: '', utc: ''});
    } else {
      setResult('Ошибка ввода UTC');
      setWatch({watchName: '', utc: ''});
    }
  }
  
  return (
    <div className="">
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <div className="input__box">
            <label className='labelInput' htmlFor="watchName">Название</label>
            <input className='inputText' type="text" value={watches.watchName} id="watchName" name="watchName" onInput={handleState} />
          </div>
          <div className="input__box">
            <label className='labelInput' htmlFor="utc">Временная зона</label>
            <input className='inputText' type="text" value={watches.utc} id="utc" name="utc" onInput={handleState} />
          </div>
          <button className='button' type="submit">Добавить</button>
        </form>
      </div>
      <div className='data'>
        <div className='dataTable'>
          <span className='resultTable'>{result}</span>
          {Object.keys(data).length !== 0? <Watches data={data} handleDel={handleDel} /> : ''}
        </div>
      </div>
    </div>
  )
}

export default WorldTime;


