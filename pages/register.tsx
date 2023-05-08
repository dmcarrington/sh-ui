import React, { useContext, useState } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Login.module.css';
import { AuthContext } from '../context/AuthContext';
import Image from 'next/image'
const satoshisHiveLogo = require('../public/satoshis_hive_logo.png')

const Login: NextPage = () => {
  const { handleLoginWithEmail, handleRegisterWithEmail} = useContext(AuthContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const handleSubmit = (e:any) => {
    e.preventDefault()
    console.log(`submit: ${email}, ${password}`)
    handleRegisterWithEmail({email:email, password:password})
  }
  return (
    <section className={styles.container}>
      <Image id={styles.logo} src={satoshisHiveLogo} width={150} height={150}/>
        <aside className={styles.content}>
          <h3 className={styles.copy}>Enter your email and password to register</h3>
          <form onSubmit={handleSubmit}>
            <label className={styles.input_label} htmlFor="emailInput">
              Email
            </label>
            <input
              id="emailInput"
              className={styles.input}
              type="email"
              placeholder="email@example.com"
              onChange = {(e) => setEmail(e.target.value)} value = {email}
            />
            <label className={styles.input_label} htmlFor="pwdInput">
              Password
            </label>
            <input
              id="pwdInput"
              aria-label="pwd"
              className={styles.input}
              type="password"
              onChange = {(e) => setPassword(e.target.value)} value = {password}
            />
            <label className={styles.input_label} htmlFor="confirmPwdInput">
              Confirm Password
            </label>
            <input
              id="confirmPwdInput"
              aria-label="confirmpwd"
              className={confirmPassword === password? styles.input: styles.invalidInput}
              type="password"
              onChange = {(e) => setConfirmPassword(e.target.value)} value = {confirmPassword}
            />
            <button
              // TODO: make disabled until a valid email and password have been entered
              disabled={confirmPassword!=password && password!= ""}
              id="submit"
              type="submit"
              className={`${styles.btn} ${styles.btn_primary}`}
            >
              Signup with Email
            </button>
          </form>
        </aside>
    </section>
  );
};

export default Login;
