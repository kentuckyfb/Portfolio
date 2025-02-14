// components/GithubCommits.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const GithubCommits = () => {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const username = 'kentuckyfb '; // Replace with your GitHub username
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
        
        const repos = reposResponse.data;
        let allCommits = [];

        for (let repo of repos) {
          const commitsResponse = await axios.get(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=5`);
          allCommits = [...allCommits, ...commitsResponse.data]; // Collect commits from each repo
        }

        setCommits(allCommits);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  if (loading) return <div>Loading commits...</div>;
  if (error) return <div>Error fetching commits: {error.message}</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Recent Commits from All Repositories</h2>
      <ul className="space-y-4">
        {commits.map((commit) => (
          <li key={commit.sha} className="bg-gray-100 p-4 rounded-md shadow-md">
            <p className="font-semibold">{commit.commit.author.name}</p>
            <p className="text-sm text-gray-500">{new Date(commit.commit.author.date).toLocaleString()}</p>
            <p className="mt-2">{commit.commit.message}</p>
            <a href={commit.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 inline-block">
              View on GitHub
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GithubCommits;
