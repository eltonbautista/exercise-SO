/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';

interface RepoDisplayProps {
  name: string;
  description: string;
  language: string;
  forksCount: number;
}

const RepoDisplay: React.FunctionComponent<RepoDisplayProps> = (
  props: RepoDisplayProps
) => {
  const { name, description, language, forksCount } = props;

  return (
    <div className="repository-container">
      <h3 className="repository name">{name}</h3>
      <p className="repository description">{description}</p>
      <p className="repository language">{language}</p>
      <p className="repository forks-count">{forksCount}</p>
    </div>
  );
};

export default RepoDisplay;
