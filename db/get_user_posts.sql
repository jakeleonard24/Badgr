select * from badges
join users on badges.userid = users.id
where userid = $1;