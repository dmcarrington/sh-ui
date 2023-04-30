import React, { useContext, useState } from 'react';
import { LightningIcon } from '../assets/icons';
import type { NextPage } from 'next';
import styles from '../styles/Login.module.css';
import { AuthContext } from '../context/AuthContext';
import QR from '../components/QR';

const Login: NextPage = () => {
  const { handleLoginWithLN, lnData, handleLoginWithEmail, accountData} = useContext(AuthContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (e:any) => {
    e.preventDefault()
    console.log(`submit: ${email}, ${password}`)
    handleLoginWithEmail({email:email, password:password})
  }
  return (
    <section className={styles.container}>
      {lnData.encoded ? (
        <QR />
      ) : (
        <aside className={styles.content}>
          <h3 className={styles.copy}>Login to view your dashboard</h3>
          <button
            onClick={handleLoginWithLN}
            className={`${styles.btn} ${styles.btn_primary}`}
          >
            <LightningIcon fill="#fff" className={styles.ln_icon} /> Login via
            Lightning
          </button>
          <p>or</p>
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
            <button
              // TODO: make disabled until a valid email and password have been entered
              disabled={false}
              id="submit"
              type="submit"
              className={`${styles.btn} ${styles.btn_primary}`}
            >
              Login via Email
            </button>
          </form>
        </aside>
      )}
    </section>
  );
};

export default Login;