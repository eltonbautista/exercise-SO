/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import './App.css';
import RepoDisplay from './components/RepoDisplay';

export function App() {
  const [myRepos, setMyRepos] = useState<undefined | AxiosResponse<any, any>>();

  useEffect(() => {
    const asyncProcess = async () => {
      const myData = axios.get('http://localhost:4000/repos').then((res) => {
        setMyRepos(res);
        return res;
      });
      return myData;
    };
    asyncProcess();
  }, []);

  return (
    <div className="App">
      <h1>My repos:</h1>
      <div className="repository-container"></div>
    </div>
  );
}
