SELECT badges.id as uniquebadgeid, users.id as uniqueuserid, badges.creatorid, badges.content, badges.title, badges.logo, users.username, users.picture, badges.description, badges.type, badges.likes, badgegroups.user_id, badgegroups.badge_id
FROM badgegroups
JOIN users on badgegroups.user_id = users.id
JOIN badges on badgegroups.badge_id = badges.id
WHERE badge_id = $1;
