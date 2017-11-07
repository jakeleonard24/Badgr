insert into badges ( type, userid, creatorid, logo, title, description, content)
values ($1, $2, $2, $3, $4, $5, $6)
returning *;