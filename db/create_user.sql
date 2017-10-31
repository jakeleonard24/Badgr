insert into users
(email, username, password, image, auth_id)
values
($1, $2, $3, $4, $5)
RETURNING *;