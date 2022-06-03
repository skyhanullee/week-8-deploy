import React, { useState } from 'react';
import FollowersList from './FollowersList';

export default function GithubUserSearch() {
    const [isLoading, setIsLoading] = useState(false);
    const [githubUser, setGithubUser] = useState(null);
    const [error, setError] = useState('');

    const searchForUser = (userName) => {
        setIsLoading(true);
        setGithubUser(null);
        setError('');

        fetch(`https://api.github.com/users/${userName}`)
            .then(response => {
                if (response.status === 404) {
                    throw Error('User not found');
                }

                if (response.status !== 200) {
                    throw Error('An error occurred');
                }
                
                return response.json();
            })
            .then(
                data => {
                    setIsLoading(false);
                    setGithubUser(data);
                },
                error => {
                    setIsLoading(false);
                    setError(error.message);
                }
            );
    }

    const onSearch = (event) => {
        event.preventDefault();
        const searchValue = event.target[0].value;
        searchForUser(searchValue);
    }

    let content;

    if (githubUser) {
        content = (
            <div>
                <h2>{githubUser.name}</h2>
                <img
                    style={{ width: '100px' }}
                    src={githubUser.avatar_url}
                    alt={`${githubUser.name}'s avatar`}
                />
                <FollowersList followersUrl={githubUser.followers_url} />
            </div>
        );
    }

    return (
        <div>
            <h1>Github User</h1>
            <form onSubmit={onSearch}>
                <input type="text" />
                <button type="submit">Search</button>
            </form>

            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {content}
        </div>
    );
}
