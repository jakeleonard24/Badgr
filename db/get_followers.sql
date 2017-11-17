SELECT *
FROM follows
JOIN users on follows.follower_id = users.id
WHERE user_id = $1;