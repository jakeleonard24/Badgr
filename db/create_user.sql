insert into users
(email, username, picture, auth_id)
values
($1, $2, $3, $4)
RETURNING *;