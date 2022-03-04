import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import { useNavigate, useHistory } from "react-router-dom";

function LoginForm(props) {
	const [inputs, setInputs] = useState({});
	const [rememberMe, setRememberMe] = useState(false);
	const [isPending, setIsPending] = useState(false);

	const handleChange = (event) => {
		const name = event.target.name;
	    const value = event.target.value;
	    setInputs(values => ({...values, [name]: value}))
	}
	const checkBoxChange = (event) => {
		let name = event.target.name;
		let value = event.target.checked;
		setRememberMe(event.target.checked)
		setInputs(values => ({...values, [name]: value}))

	}
	const handleSubmit = (event) => {
		event.preventDefault();
		if (inputs.username !== undefined && inputs.password !== undefined){
			fetch('http://localhost:8000/users/auth',{
				method:'POST',
				headers:{"Content-Type": "application/json"},
				body: JSON.stringify(inputs)
			}).then((response)=>{
				setIsPending(true);
				response.json().then((res) => {
					if(res[0].session_id !== undefined){
						setIsPending(false);
						window.location.replace('http://localhost:8000/backend')
					}else{
						setIsPending(false);
					}
				});
			}).catch((err)=>{
				console.log(err)
			})
		}
	}
	
	
	return (
			<form role="form" >
			  <div className="mb-3">
			    <input type="email" className="form-control form-control-lg" placeholder="React Email" aria-label="Email" name="username" value={inputs.username || ""}  onChange= {handleChange} />
			  </div>
			  <div className="mb-3">
			    <input type="password" className="form-control form-control-lg" placeholder="Password" aria-label="Password" name="password" value={inputs.password || ""}  onChange= {handleChange} />
			  </div>
			  <div className="form-check form-switch">
			    <input className="form-check-input" type="checkbox" id="rememberMe" name="rememberMe" checked= {rememberMe} value={rememberMe} onChange= {checkBoxChange}/>
			    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
			  </div>
			  <div className="text-center">
			    { !isPending &&  <button type="button" className="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0" onClick={handleSubmit}>Sign in</button> }
			    { isPending &&  <button type="button" className="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0" onClick={handleSubmit}>Checking</button> }
			  </div>
			</form>
		);
}

ReactDOM.render(
  <React.StrictMode>
    <LoginForm />
  </React.StrictMode>,
  document.getElementById('formLogin')
);

export default LoginForm;

// ReactDOM.render(
// 	<LoginForm/>,
// 	document.getElementById('formLogin')
// );