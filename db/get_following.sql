SELECT follows.follower_id, users.email, users.username, users.picture, users.bio
FROM follows
JOIN users on follows.follower_id = users.id
WHERE user_id = $1;