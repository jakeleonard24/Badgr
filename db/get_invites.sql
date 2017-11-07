select * from invites
JOIN users on user_id = users.id
JOIN badges on badge_id = badges.id
WHERE user_id = $1;