SELECT *
FROM badgegroups
JOIN users on badgegroups.user_id = users.id
JOIN badges on badgegroups.badge_id = badges.id
WHERE user_id = $1;
