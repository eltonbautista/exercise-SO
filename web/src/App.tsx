/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import './App.css';
import RepoDisplay from './components/RepoDisplay';
import { Repo } from '../../api/src/models/Repo';

export function App() {
  const [myRepos, setMyRepos] = useState<
    undefined | AxiosResponse<any, any> | any
  >();

  const [languageCoordinator, setLanguageCoordinator] = useState<any>([]);

  useEffect(() => {
    const asyncProcess = async () => {
      const myData = axios.get('http://localhost:4000/repos').then((res) => {
        setMyRepos(res.data);
        return res;
      });
      return myData;
    };
    asyncProcess();
  }, []);

  const mapDisplays = (arrayToMap: Array<typeof myRepos>) => {
    if (arrayToMap) {
      return arrayToMap.map((repoObject, i) => {
        return (
          <RepoDisplay
            key={i}
            name={repoObject?.full_name}
            description={repoObject.description}
            language={repoObject.language}
            forksCount={repoObject.forks_count}
          />
        );
      });
    }
  };

  const mappedDisplays = mapDisplays(myRepos);

  function filterListViaLanguage(filterLang: string, arr: typeof myRepos) {
    if (arr !== undefined) {
      const noneFilteredArray: Repo[] = [];

      const myFilteredArray = arr.filter(function (repo: Repo) {
        if (repo.fork === false) {
          // encode repo
          return repo;
        }
        noneFilteredArray.push(repo);
        return undefined;
      });
      setLanguageCoordinator([...myFilteredArray, ...noneFilteredArray]);
    }
  }

  return (
    <div className="App">
      <h1>My repos:</h1>
      <div className="my-repos">
        {mappedDisplays ? mappedDisplays : 'Loading data..'}
      </div>
    </div>
  );
}
