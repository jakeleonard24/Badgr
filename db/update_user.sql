update users
set bio = $1,
set picture = $2,
where id = $3;