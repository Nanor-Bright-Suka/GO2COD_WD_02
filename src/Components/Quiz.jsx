import  {  useRef, useState } from 'react'
import {data} from "../assets/data.js"


const Quiz = () => {
    let [index, setIndex] = useState(0)
    let [question,setQuestion] = useState(data[index])
    let [score, setScore] = useState(0)
    let [lock,setLock] = useState(false)
    let [result, setResult] = useState(false)
    // UseRef for Referrencing
    let option1 =  useRef(null)
    let option2 =  useRef(null)
    let option3 =  useRef(null)
    let option4 =  useRef(null)

    let opt_Array = [option1,option2,option3,option4]

    const checkAns = (e, ans) => {
     if(lock === false){ 
        if(question.ans === ans){
            e.target.classList.add("bg-correct", "text-correct")
            setLock(true)
            setScore(prev => prev + 1)
        }else{
            e.target.classList.add("bg-wrong","text-wrong")
            setLock(true)
            opt_Array[question.ans - 1].current.classList.add("bg-correct", "text-correct")
        }}

    }

 const next = () => { 
    if(lock === true){
        if(index === data.length - 1) {
            setResult(true)
            return
        }
        setIndex(++index)
        setQuestion(data[index])
        setLock(false)
        opt_Array.map((option)=> {
            option.current.classList.remove("bg-wrong","text-wrong");
            option.current.classList.remove("bg-correct","text-correct");
            // return null
        })
    }
 }

 //Reset Button 
 const Reset = () => {
    setIndex(0)
    setQuestion(data[index])
    setScore(0)
    setLock(false)
    setResult(false)
 }


  return (
    <div className='w-screen m-auto
    flex flex-col justify-center h-full
     bg-white p-5 rounded-md shrink-0
    gap-3 mt-16 max-[640px]:w-[95%] max-w-[500px]'>
        <h1 className='text-center text-2xl'>Quiz App</h1>

        <hr />
        {result ? 
        (<>
        <h2 className='text-3xl'>You Score {score} out of {data.length}</h2>
        <button className='bg-blue-500 m-auto w-[200px] text-2xl text-yellow-50 rounded' onClick={Reset}>Reset</button>
        </>):
         (
         <>
      <h2 className='text-2xl font-normal'>{index + 1}. {question.question}</h2>
      <hr className='h-1 bg-black'/>
      <ul className='ml-2 cursor-pointer'>
        <li className='border-2 p-3 text-2xl mb-4 rounded-md' onClick={(e)=> checkAns(e,1)} ref={option1}>{question.option1}</li>
        <li className='border-2 p-3 text-2xl mb-4 rounded-md' onClick={(e)=> checkAns(e,2)} ref={option2}>{question.option2}</li>
        <li className='border-2 p-3 text-2xl mb-4 rounded-md' onClick={(e)=> checkAns(e,3)} ref={option3}>{question.option3}</li>
        <li className='border-2 p-3 text-2xl mb-4 rounded-md' onClick={(e)=> checkAns(e,4)} ref={option4}>{question.option4}</li>
      </ul>
      <button className='bg-blue-500 m-auto w-[200px] text-2xl text-yellow-50 rounded' 
      onClick={next}>Next</button>
      <div className='m-auto text-2xl'>{index + 1} of {data.length}</div>
         </>
        )}
    </div>
  )
}

export default Quiz
