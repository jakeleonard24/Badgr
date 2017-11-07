DELETE FROM invites
WHERE user_id = $1 AND badge_id = $2;