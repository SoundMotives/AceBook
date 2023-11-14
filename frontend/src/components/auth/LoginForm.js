import React, { useState } from 'react';

const LogInForm = ({ navigate }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ displayName: displayName, email: email, password: password })
    })
      .then(response => {
        if(response.status === 201) {
          // GOOD NEWS.
          let data = response.json();
          window.localStorage.setItem("token", data.token);
          navigate('/posts');
        } else {
          // BAD NEWS.
          navigate('/login');
        }
      })

    // let response = await fetch( '/tokens', {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ displayName: displayName, email: email, password: password })
    // })

    // if(response.status === 201) {
    //   console.log("yay")
    //   navigate('/posts')
    // } else {
    //   console.log("oop")
    //   let data = response.json()
    //   console.
    //   //let data = await response.json()
    //   window.localStorage.setItem("token", data.token)
    //   navigate('/login');
    // }
  }

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


    return (
      <form onSubmit={handleSubmit}>
        <input placeholder='Name' id="displayName" type='text' value ={ displayName } onChange={handleDisplayNameChange} />
        <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
        <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
        <input role='submit-button' id='submit' type="submit" value="Submit" />
      </form>
    );
}

export default LogInForm;
