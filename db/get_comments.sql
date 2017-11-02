SELECT * FROM comments
JOIN users on userid = users.id
where badgeid = $1;
