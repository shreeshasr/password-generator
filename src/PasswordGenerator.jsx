import React, { useState } from 'react'
import "./PasswordGenerator.css"
function PasswordGenerator() {
    const [length, setLength] = useState(16)
    const [character, setCharacter] = useState(`|@#~$%()=^*+[]{}-_`)
    const [numberRequired, setNumberRequired] = useState(true)
    const [upperLettersRequired, setUpperLettersRequired] = useState(true)
    const [lowerLettersRequired, setLowerLettersRequired] = useState(true)
    const [generatedPassword, setGeneratedPassword] = useState('')
    const [passwordStrength, setPasswordStrength] = useState('')

    const generatePassword = () => {
        let number = "0123456789"
        let upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        let lowerLetters = "abcdefghijklmnopqrstuvwxyz"
    
        let charSet = (numberRequired ? number : "") + (upperLettersRequired ? upperLetters  : "") + (lowerLettersRequired ? lowerLetters : "") + character
        let randomString = '';
        for (let i = 0; i < length; i++) {
            let randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz,randomPoz+1);
        }
        if(randomString === ''){
            setGeneratedPassword("Invalid Input")
        }
        else{
            setGeneratedPassword(randomString)
        }
        if(numberRequired && upperLettersRequired && lowerLettersRequired){
            if(length>=16){
                setPasswordStrength("Very Strong")
            }
            else if(length>=8){
                setPasswordStrength("Strong")
            }
            else if(length>=5){
                setPasswordStrength("Medium")
            }
        }
        else if(((numberRequired && upperLettersRequired) || (numberRequired && lowerLettersRequired) || (upperLettersRequired && lowerLettersRequired))){
            if(length>=16){
                setPasswordStrength("strong")
            }
            else if(length>=8){
                setPasswordStrength("Medium")
            }
            else if(length>=5){ 
                setPasswordStrength("Poor")
            }
        }
        else{
            if(length<8){
                setPasswordStrength("Very Poor")
            }
            else{
                setPasswordStrength("Poor")
            }
            
        }
    }

    const setCheckboxState = (field) => {
        setGeneratedPassword('')
        switch(field){
            case "number" : numberRequired ===false ? setNumberRequired(true) : setNumberRequired(false)
                            break
            case "upper" : upperLettersRequired === false ? setUpperLettersRequired(true) : setUpperLettersRequired(false)
                            break
            case "lower" : lowerLettersRequired === false ? setLowerLettersRequired(true) : setLowerLettersRequired(false)
                            break
            default: break
        }
    }

    const setPasswordToDisplay = () => {
        if(generatedPassword === "Invalid Input"){
            return <div className="generatedPassword">Invalid Input</div>
        }
        else if(generatedPassword === ""){
            return <div></div>
        }
        else{
            return(
                <div className='generateAndCopy'>
                    <div className="generatedPassword">Password Generated : <span className='password'>{generatedPassword}</span></div>
                    <button className="copyPassword" title="copy password" onClick={ () => copyPassword()}><i className="fa fa-copy" aria-hidden="true"></i></button>
                    <div className="passwordStregth">Password Strength : <span className='strength'>{passwordStrength}</span></div>
                </div>
                
                
            )
        }
    }

    const copyPassword = async () => {
        await navigator.clipboard.writeText(generatedPassword)
    }

    return (
        <section className="passwordGenerator">
            <div className="topSide">
                <div className="leftSide">
                    <div className="passwordLength">
                        <label for="length">Length</label>
                        <input type="text" onChange={ (e) => { setLength(e.target.value); setGeneratedPassword("") }} name="length" id="length" value={length}/>
                    </div>
                    <div className="passwordCharacter">
                        <label for="characters">Characters</label>
                        <input type="text" onChange={ (e) => { setCharacter(e.target.value); setGeneratedPassword("") }} name="characters" id="characters" value={character}/>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="passwordUpperLetters">
                        <label for="upperLetters">Upper Letters</label>
                        <input type="checkbox" name="upperLetters" id="upperLetters" onClick={() => setCheckboxState("upper")} checked={upperLettersRequired}/>
                    </div>
                    <div className="passwordNumbers">
                        <label for="numbers">Numbers</label>
                        <input type="checkbox" name="numbers" id="numbers" onClick={() => setCheckboxState("number")} checked={numberRequired}/>
                    </div>

                    <div className="passwordLowerLetters">
                        <label for="lowerLetters">Lower Letters</label>
                        <input type="checkbox" name="lowerLetters" id="lowerLetters" onClick={() => setCheckboxState("lower")} checked={lowerLettersRequired}/>
                    </div>

                </div>
            </div>
        <div className="bottomSide">
            <button className='generateButton' onClick={ () => generatePassword()}>Generate</button>
            {
                setPasswordToDisplay()
            }
        </div>
           
        </section>
    )
}

export default PasswordGenerator
