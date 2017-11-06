select * 
from users
where username like $1 || '%';