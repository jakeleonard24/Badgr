SELECT *
FROM badgegroups
JOIN users on badgegroups.user_id = users.id
JOIN badges on badgegroups.badge_id = badges.id
WHERE badge_id = $1;
