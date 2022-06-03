import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

import './FollowersList.css';

export default function FollowersList({followersUrl}) {
    const [isLoading, setIsLoading] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(true);
        setFollowers([]);
        setError('');

        fetch(`${followersUrl}?per_page=100`)
            .then(response => response.json())
            .then(
                data => {
                    setIsLoading(false);
                    setFollowers(data);
                },
                error => {
                    setIsLoading(false);
                    setError(error.message);
                }
            );
    }, [followersUrl]);
        
    return (
        <div className="followers-list">
            <h2>Followers</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {followers.map((follower, idx) => {
                return (
                    <div className="follower" key={idx}>
                        <h3>{follower.login}</h3>
                        <img
                            src={follower.avatar_url}
                            alt={`${follower.login}'s avatar`}
                        />
                    </div>
                )
            })}
        </div>
    );
}

FollowersList.propTypes = {
    followersUrl: PropTypes.string.isRequired
};
