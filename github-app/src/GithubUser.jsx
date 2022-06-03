import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function GithubUser() {
    const [isLoading, setIsLoading] = useState(false);
    const [githubUser, setGithubUser] = useState(null);
    const [error, setError] = useState('');
    const {username} = useParams();

    useEffect(() => {
        setIsLoading(true);
        setGithubUser(null);
        setError('');

        fetch(`https://api.github.com/users/${username}`)
            .then(response => response.json())
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
    }, [username]);

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
            </div>
        );
    }

    return (
        <div>
            <h1>Github User</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error. Please refresh and try again</p>}
            {content}
        </div>
    );
}
