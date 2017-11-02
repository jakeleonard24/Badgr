SELECT *
FROM follows
JOIN users on follows.follower_id = users.id
WHERE follower_id = $1;