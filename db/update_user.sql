update users
set bio = $1,
    picture = $2
where id = $3;