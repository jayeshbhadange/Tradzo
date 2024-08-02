import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';


const SignUp = () => {
  const inputRef = useRef(null);
  const errRef = useRef(null);

  const [input, setInput] = useState("");
  const [validInput, setValidInput] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    inputRef.current.focus();
  },[]);

  useEffect(() => {
    setValidInput(USER_REGEX.test(input));
  },[input]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    const match=pwd===matchPwd;
    setValidMatch(match);
  },[pwd,matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [input,pwd,matchPwd]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(true);
    /*try{
      const response=await axios.post(REGISTER_URL,JSON.stringify({username:input,password:pwd}),{
        headers:{'Content-Type':'application/json', withCredentials:true}
      })
      console.log(response.data);
      setSuccess(true);
    }catch(err){
        if (!err?.response) {
          setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
          setErrMsg('Username Taken');
      } else {
          setErrMsg('Registration Failed')
      }
      errRef.current.focus();   
    }*/
  }
  return (
    <>
      {success ? (<section>
        <h2>Success</h2>
        <p>Thank you for registering!</p>
      </section>)
      :(    
      <section>
        <p ref={errRef} className={errMsg? "errmsg":"offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="input">
            User:
            <FontAwesomeIcon icon={faCheck} className={validInput ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validInput || !input ? "hide" : "invalid"} />
          </label>
          <input
            id="input"
            type="text"
            required
            ref={inputRef}
            autoComplete="off"
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            aria-describedby="uidnote"
            aria-invalid={!validInput}
          />
          <p id="uidnote"
          className={inputFocus&&input&&!validInput? "instructions":"offscreen"}
          >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.<br />
              Must begin with a letter.<br />
              Letters, numbers, underscores, hyphens allowed.
          </p>
          <label htmlFor="password">
            Password:
            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />  
            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
          </label>
          <input
            id="password"
            type="password"
            required
            onChange={(e)=> setPwd(e.target.value)}
            onFocus={()=> setPwdFocus(true)}
            onBlur={()=> setPwdFocus(false)}
            aria-describedby="pwdnote"
            aria-invalid={!validPwd}
          />
          <p id="pwdnote" className={pwdFocus&&!validPwd?"instructions": "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number and a special character.<br />
              Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
          </p>
          <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
          </label>
          <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
          />
          <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
          </p>
          <button type="submit" disabled={!validInput || !validPwd || !validMatch}>
            Submit
          </button>
        </form>
        <p>
            Already registered?<br />
            <span className="line">
                {/*put router link here*/}
                <a href="#">Sign In</a>
            </span>
        </p>
      </section>)
      }
    </>

  )
}

export default SignUp