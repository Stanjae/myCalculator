import { evaluate } from 'mathjs'
import React, { useMemo, useState } from 'react'

const cler = <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 14">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7 1 4l3-3m0 12h6.5a4.5 4.5 0 1 0 0-9H2"/>
</svg>

const cKeys = ['AC', '(',')', ' / ', 7, 8, 9, ' * ', 4,5,6, '-', 1, 2, 3, ' + ', cler, 0, '.', '=']


  

const Calculator = () => {
    const [solve, setSolve] = useState('');

    const [answer, setAnswer] = useState('0');


    const HandleType =(fig)=>{
        setSolve(prevStore => prevStore + fig)
    }

    const handleCalculate = ()=>{
        try{
            const solved = evaluate(solve)
            setAnswer(solved);
        }catch(err){
            console.log('Error detected',err)
        }
    }

    const OnclickCalculate = ()=>{
        try{
            const solved = evaluate(solve)
            setAnswer(solved);
            setSolve(solved);
        }catch(err){
            console.log('Error detected',err)
        }
        console.log('is clicking')
    }

    const ClearCal = ()=>{
        setSolve('');
        setAnswer('0');
    }

    const BackSpace =()=>{
        setSolve(prevSolve => prevSolve.slice(0, prevSolve.length -1) );
    }

    useMemo(()=>{
        handleCalculate()
    },[solve])


  return (
    <div className=' h-screen'>

        <div className=' rounded-2xl pt-2 flex flex-col my-10 w-96 mx-auto bg-[#22252D]'>
            <div className=' px-3 py-10'>
                <h1 className=' text-white space-y-2 text-xl text-right'>{solve}</h1>
                <input value={answer} 
                className='border-none focus:border-none outline-none focus:outline-none bg-[#22252D] text-[#26F8D2] font-bold p-4 w-full block text-right text-3xl' readOnly/>
            </div>
            <div className=' rounded-t-3xl rounded-r-3xl bg-[#292D36] py-6 px-5 gap-y-4 gap-1 place-items-center grid grid-cols-4'>
            {cKeys.map((item, id) => {
                if(item === '(' || item === ')'){
                    return (<div key={id}  className=' bg-slate-400 col-span-1'>
                    <button onClick={()=>HandleType(item)} 
                    className=' hover:mix-blend-multiply py-5 px-7 text-xl rounded-md text-center text-[#26F8D2] bg-[#272B33]'>{item}</button>
                </div>)
                }else if( item === ' * ' || item === ' / ' || item === ' = ' || item === '-' || item === ' + '){
                    return (<div key={id}  className=' bg-slate-400 col-span-1'>
                    <button onClick={()=>HandleType(item)} className=' hover:mix-blend-multiply py-5 px-7 text-xl rounded-md text-center text-[#F37A7A] bg-[#272B33]'>{item}</button>
                </div>)
                }else if( item === '='){
                    return (<div key={id}  className=' bg-slate-400 col-span-1'>
                    <button onClick={OnclickCalculate} className=' hover:mix-blend-multiply py-5 px-7 text-xl rounded-md text-center text-[#F37A7A] bg-[#272B33]'>{item}</button>
                </div>)
                }else if( item === 'AC'){
                    return (<div key={id}  className=' bg-slate-400 col-span-1'>
                    <button onClick={BackSpace} className=' hover:mix-blend-multiply py-5 px-7 text-xl rounded-md text-center text-[#26F8D2] bg-[#272B33]'>{item}</button>
                </div>)
                }
                else if( item === cler){
                    return (<div key={id}  className=' bg-slate-400 col-span-1'>
                    <button onClick={ClearCal} className=' hover:mix-blend-multiply py-5 px-7 text-xl rounded-md text-center text-[#F37A7A] bg-[#272B33]'>{item}</button>
                </div>) 
                }else{
                    return (<div key={id}  className=' bg-slate-400 col-span-1'>
                    <button onClick={()=>HandleType(item)} className=' hover:mix-blend-multiply py-5 px-7 text-xl rounded-md text-center text-[#ffffff] bg-[#272B33]'>{item}</button>
                </div>)
                }
                
            })}
               
            </div>
        </div>
      
    </div>
  )
}

export default Calculator
