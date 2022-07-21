/* eslint-disable array-callback-return */
import { Router, Request, Response } from 'express';
import request from 'request';
import localRepos from '../../data/repos.json';
import { Repo } from '../models/Repo';

export const repos = Router();

const options = {
  url: 'https://api.github.com/users/silverorange/repos',
  headers: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'User-Agent': 'request',
  },
};

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  res.status(200);

  request(options, function (error, response, body) {
    // parse github api response
    const parsedBody = JSON.parse(body);
    // create an aggregated array of all repos from both sources.
    const allMyRepos = [...parsedBody, ...localRepos];
    // define variable with filtered repos as value
    const filteredRepos = createFalse(allMyRepos);
    // res.json(filteredRepos);
    res.send(filteredRepos);
  });
});

// Function used to return an array of objects that have their fork property as false.
function createFalse(arr: Repo[]) {
  return arr.filter(function (repo) {
    if (repo.fork === false) {
      // encode repo
      return JSON.stringify(repo);
    }
  });
}
