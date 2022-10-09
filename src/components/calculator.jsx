import { useState } from "react";

export default function Calculator(){

    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
    const operations = ["+", "-", "*", "/", "%", "( )", "C"];
    const [currentNumber, setCurrentNumber] = useState("")
    const [prevNumber, setPrevNumber] = useState("")
    // const [selectedOperation, setCurrentNumber] = useState("")

    const pressed = (value) => {

        console.log(value)
    }

    // function handleChange(e){
    //     console.log(e)
    // }

    return(
        <section className="calculator-wrapper">

            <div className="input-container">
                <div className="cache">
                        <h4 className="cache--text"> 222222 </h4>
                </div>
                <input className="cal-input" type="disabled" name="calculator-number-input" id="calculator-input" />
            </div>

            <section className="calculator">
            
                <div className="buttons">
                    <button onClick={() => pressed('c')}>C</button>
                    <button onClick={() => pressed('()')}>( )</button>
                    <button onClick={() => pressed('%')}>%</button>
                    <button onClick={() => pressed('/')}>&#247;</button>
                            
                    <button onClick={() => pressed('1')}>1</button>
                    <button onClick={() => pressed('2')} >2</button>
                    <button onClick={() => pressed('3')}>3</button>
                    <button onClick={() => pressed('*')}>&#0215;</button>
             
                    <button onClick={() => pressed('4')}>4</button>
                    <button onClick={() => pressed('5')}>5</button>
                    <button onClick={() => pressed('6')}>6</button>
                    <button onClick={() => pressed('+')}>&#43;</button>
                    
                    <button onClick={() => pressed('7')}>7</button>
                    <button onClick={() => pressed('8')}>8</button>
                    <button onClick={() => pressed('9')}>9</button>
                    <button onClick={() => pressed('-')}>&#8722;</button>
     
                    <button onClick={() => pressed('.')}>.</button>
                    <button onClick={() => pressed('0')}>0</button>
                    <button onClick={() => pressed('000')}>000</button>
                    <button onClick={() => pressed('=')}>&#61;</button> 
                </div>    
            </section>
        </section>
        
    )
    
    return <h1> HELLO WORLD</h1>
}