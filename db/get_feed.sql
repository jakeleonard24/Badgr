SELECT *
FROM follows
JOIN badges on follows.follower_id = badges.userid
WHERE user_id = $1;