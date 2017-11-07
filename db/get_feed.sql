SELECT *
FROM follows
JOIN badges on follows.follower_id = badges.userid
JOIN users on follows.follower_id = users.id
WHERE user_id = $1;