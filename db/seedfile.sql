SELECT *
FROM follows;

SELECT *
FROM users

CREATE TABLE badgegroups
(
id SERIAL PRIMARY KEY,
user_id INT,       
badge_id INT,
badgecreator_id INT,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (badge_id) REFERENCES badges(id),
FOREIGN KEY (badgecreator_id) REFERENCES badges(creatorid),
content TEXT,
title TEXT,
description TEXT,
comments TEXT
)

SELECT *
FROM badgegroups
JOIN users on badgegroups.user_id = users.id
JOIN badges on badgegroups.badge_id = badges.id
WHERE badge_id = 12;

DROP TABLE follows

CREATE TABLE follows
(
id SERIAL PRIMARY KEY,
user_id INT,
follower_id INT,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (follower_id) REFERENCES users(id)
)

INSERT INTO follows
(user_id, follower_id)
VALUES
(30, 29),
(30, 28),
(30, 1),
(30, 1),
(30, 27),
(30, 2)

SELECT id,user_id, ( SELECT COUNT(*) 
FROM follows
WHERE follows.user_id = users.user_id
AND follows.followerid = '1') AS follower_id FROM users;

SELECT user_id FROM follows GROUP BY user_id HAVING (COUNT()=1)

SELECT *
FROM follows
JOIN users on follows.follower_id = users.id
WHERE follower_id = 28;

SELECT *
FROM follows
JOIN users on follows.follower_id = users.id
WHERE user_id = 28;

INSERT INTO follows
(user_id)
VALUES
($1)

SELECT *
FROM follows
WHERE user_id = 1;

SELECT *
FROM users
WHERE id =  $1;

SELECT *
FROM follows WHERE user_id = 1 AND follower_id = 1;


select * from badges

ALTER TABLE badges
ADD likes integer;

INSERT INTO badges ( likes ) 
VALUES ( 1 );

CREATE TABLE badgegroups
(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id),
badge_id INT REFERENCES badges(id),
content TEXT,
title TEXT,
description TEXT,
comments TEXT
)

create table users(
id SERIAL PRIMARY KEY,
email text,
username varchar(30),
picture text,
bio varchar(300)
);
insert into users (email, username, picture, bio)
values
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.'),
('hhaslock0@lycos.com', 'johnnyBoy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAETSURBVBgZfcExS0JRGIDh996OFIQEgSRhTS1Bg0trw937B9UPCAT3hnJ1kYbGhrv0BxoaXSsMhBCsyUEcoiTKUM/3HU8Fce4Q+DyRZz5DcOkdiqIIiiAo7xiCMXs4HI4ZisPhOMcQOJQbOoxxKHm22UUxBBbHM1cRfw58GUtMIAieTIwgxAQWRclMEZSYwCIIGYsixASCYsl4pgiGwDFF+HWUaDopbfCGHRp+nCWSTktFXvFDOKyuNNYp4LhFriPPaXW5UWAV5Y6HNH+/dbHJIjN6NHlJzMnxWqNIDqFHh8/U7hiEJbp0+ar0m2a4MGFEjie6jCrtJs1y57FuI21R6w8g8uwnH/VJJK1ZrT3gn8gz3zcVUYEwGmDcvQAAAABJRU5ErkJggg==', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id rutrum elit. Integer venenatis ligula sit amet erat commodo tristique.');
create table badges(
id serial primary key,
type text,
userid integer REFERENCES users(id),
creatorid integer REFERENCES users(id),
logo text,
title text,
description text,
content text);
select * from users;
alter table users
add auth_id text
select * from badges;
insert into badges(type, userid, creatorid, logo, title, description, content)
values
('create', 1, 1, 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png', 'First Created Badge', 'Create the first badge on badger', 'http://i0.kym-cdn.com/photos/images/newsfeed/000/988/454/aa4.jpg'),
('complete', 2, 1, 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png', 'First Created Badge', 'I completed the first badger badge', 'https://i.ytimg.com/vi/JJ6nXjUoI08/maxresdefault.jpg'),
('create', 5, 5, 'http://brandmark.io/logo-rank/random/beats.png', 'Make Stuff Work', 'Can you, can you make stuff work good???', 'https://i.pinimg.com/736x/5d/e3/18/5de318d6c4476d3e6236b7ddeec39c78--motivation-quotes-motivation-inspiration.jpg'),
('complete', 10, 5, 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png', 'Make Stuff Work', 'I did it i made stuff work gooder', 'http://mikeoconnell.us/images/yoadrian.jpg'),
('create', 1, 1, 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png', 'First Created Badge', 'Create the first badge on badger', 'http://i0.kym-cdn.com/photos/images/newsfeed/000/988/454/aa4.jpg'),
('create', 1, 1, 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png', 'First Created Badge', 'Create the first badge on badger', 'http://i0.kym-cdn.com/photos/images/newsfeed/000/988/454/aa4.jpg'),
('create', 1, 1, 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png', 'First Created Badge', 'Create the first badge on badger', 'http://i0.kym-cdn.com/photos/images/newsfeed/000/988/454/aa4.jpg'),
('create', 1, 1, 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png', 'First Created Badge', 'Create the first badge on badger', 'http://i0.kym-cdn.com/photos/images/newsfeed/000/988/454/aa4.jpg'),
('create', 1, 1, 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png', 'First Created Badge', 'Create the first badge on badger', 'http://i0.kym-cdn.com/photos/images/newsfeed/000/988/454/aa4.jpg'),
('create', 1, 1, 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png', 'First Created Badge', 'Create the first badge on badger', 'http://i0.kym-cdn.com/photos/images/newsfeed/000/988/454/aa4.jpg');
CREATE TABLE comments(
id serial primary key,
comments text,
userid integer REFERENCES users(id),
badgeId integer REFERENCES badges(id)
)
select * from comments


-- SELECT *
-- FROM badgegroups
-- JOIN users on badgegroups.user_id = users.id
-- JOIN badges on badgegroups.badge_id = badges.id
-- WHERE user_id = 30;

-- SELECT * 
-- FROM badges, 
-- JOIN users on badges.userid = users.id
-- WHERE userid = 30;

-- SELECT * 
-- FROM badges, badgegroups
-- JOIN users on badges.userid = users.id
-- JOIN badges on badgegroups.badge_id = badges.id
-- WHERE userid = 30;

-- SELECT *
-- FROM badgegroups, 
-- JOIN users on badgegroups.user_id = users.id
-- JOIN badges on badgegroups.badge_id = badges.id
-- WHERE user_id = 30;

-- SELECT *
-- FROM badgegroups;

-- INSERT INTO badgegroups
-- (user_id, badge_id, content, title, description, comments)
-- VALUES
-- (27, 12, 'http://icons.iconarchive.com/icons/seanau/fresh-web/512/Badge-icon.png', 'Badge Group Endpoint', 'Try to bring badge group endpoint from backend to front end', 'Lol you suck'),
-- (29, 12, 'http://icons.iconarchive.com/icons/seanau/fresh-web/512/Badge-icon.png', 'Badge Group Endpoint', 'Try to bring badge group endpoint from backend to front end', 'Lol you suck')

-- SELECT *
-- FROM follows;

-- SELECT *
-- FROM users

-- SELECT *
-- FROM follows  


-- SELECT *
-- FROM badges  


-- SELECT *
-- FROM comments  
   

-- DROP TABLE follows

-- CREATE TABLE badgegroups
-- (
-- id SERIAL PRIMARY KEY,
-- user_id INT REFERENCES users(id),
-- badge_id INT REFERENCES badges(id),
-- content TEXT,
-- title TEXT,
-- description TEXT,
-- comments TEXT
-- )

-- CREATE TABLE follows
-- (
-- id SERIAL PRIMARY KEY,
-- user_id INT,
-- follower_id INT,
-- FOREIGN KEY (user_id) REFERENCES users(id),
-- FOREIGN KEY (follower_id) REFERENCES users(id)
-- )

-- INSERT INTO follows
-- (user_id, follower_id)
-- VALUES
-- (30, 29),
-- (30, 28),
-- (30, 1),
-- (30, 1),
-- (30, 27),
-- (30, 2)

-- SELECT id,user_id, ( SELECT COUNT(*) 
-- FROM follows
-- WHERE follows.user_id = users.user_id
-- AND follows.followerid = '1') AS follower_id FROM users;

-- SELECT user_id FROM follows GROUP BY user_id HAVING (COUNT()=1)

-- SELECT *
-- FROM follows
-- JOIN users on follows.follower_id = users.id
-- WHERE follower_id = 28;

-- SELECT *
-- FROM follows
-- JOIN users on follows.follower_id = users.id
-- WHERE user_id = 28;

-- INSERT INTO follows
-- (user_id)
-- VALUES
-- ($1)

-- SELECT *
-- FROM follows
-- WHERE user_id = 27;

-- SELECT *
-- FROM users
-- WHERE id =  $1;

-- SELECT *
-- FROM follows WHERE user_id = 1 AND follower_id = 1;

-- insert into badges(type, userid, creatorid, logo, title, description, content)
-- values
-- ('create', 30, 1, 'https://i1.wp.com/photos.thetrek.co/wp-content/uploads/2017/02/custom-gravatar.png?ssl=1', 'Hike Naked', 'Hiked naked for awhile', 'http://www.prophotocommunity.com/wp-content/uploads/2013/07/The-Aesthetic-Value-of-Nature-Photography.jpg'),
-- ('create', 30, 1, 'https://i.pinimg.com/originals/f8/c1/c8/f8c1c83f5eb8d9e0dec15bc7804c03d0.png', 'Not die on a hike', 'I didnt die, lmao', 'https://i.pinimg.com/736x/19/b7/c5/19b7c52cbf39ffd262154cd300a3a3ee.jpg'),
-- ('create', 30, 1, 'http://www.tutorprint.co.uk/img/photography_icon.jpg', 'Try to look fab as fuck', 'Dog is fab', 'http://78.media.tumblr.com/8b603d2ee48e9cc2fa7bad99387afb9c/tumblr_of4fw6Wfaa1vr8l3yo1_500.jpg'),
-- ('create', 30, 1, 'https://www.identificationsystemsgroup.com/images/BadgePassIcons-IDENTITY.png', 'Try to look fab as fuck', 'Dog is fab', 'http://78.media.tumblr.com/8b603d2ee48e9cc2fa7bad99387afb9c/tumblr_of4fw6Wfaa1vr8l3yo1_500.jpg'),
-- ('create', 30, 1, 'https://nexusipe-resource-exchange.s3.amazonaws.com/pictures/commentator_l1_large.png', 'Have a convo', 'Had a convo', 'http://www.cafemaroon.com/wp-content/uploads/2013/08/The-Lumineers.png')


-- SELECT *
-- FROM follows
-- JOIN badges on follows.follower_id = badges.userid
-- WHERE user_id = 27;

-- SELECT *
-- FROM follows
-- JOIN badges on badges.userid = follows.follower_id
-- WHERE user_id = 27;

INSERT INTO logos
(url)
VALUES
('https://i.pinimg.com/originals/11/5f/0a/115f0ac90dfc685ff3564a27cb9e11d1.png'),
('http://icons.iconarchive.com/icons/jozef89/services-flat/256/idea-icon.png'),
('https://cdn.iconscout.com/public/images/icon/free/png-512/badge-flag-leader-mountain-sport-top-winner-33a18455ad02ff6d-512x512.png'),
('https://cdn.iconscout.com/public/images/icon/free/png-512/activity-badge-practice-run-running-shoe-sport-3a2a2b6bf8dce81c-512x512.png'),
('https://cdn.iconscout.com/public/images/icon/free/png-512/achievement-leader-podium-sport-stand-victory-winner-34479d19e41f7785-512x512.png'),
('http://www.mollymchugh.com/media/Tent-Sleep-icon.png'),
('https://www.testive.com/wp-content/uploads/2017/01/goal-1.png'),
('https://cdn.iconscout.com/public/images/icon/free/png-512/finish-route-running-sport-winner-34b1f2902b163ce9-512x512.png'),
('https://cdn0.iconfinder.com/data/icons/sport-achievment-badges/128/sport_badges-02-512.png'),
('https://cdn.iconscout.com/public/images/icon/free/png-512/finish-route-running-sport-winner-34b1f2902b163ce9-512x512.png'),
('https://cdn0.iconfinder.com/data/icons/sport-achievment-badges/128/sport_badges-01-512.png'),
('https://cdn.iconscout.com/public/images/icon/free/png-512/achievement-award-badge-fire-olimpic-sport-triumph-36d370a62238bcb7-512x512.png'),
('https://cdn0.iconfinder.com/data/icons/education-flat-icons-set/128/student-identity-badge-512.png'),
('https://cdn.iconscout.com/public/images/icon/premium/png-512/biodata-cv-job-application-profile-resume-3dc5d646f14f8376-512x512.png'),
('https://cdn0.iconfinder.com/data/icons/creative-business-and-development/512/idea_creative_thinking_brainstorming_creativity_solution_think_brain_ideas_mind_control_human_head_flat_design_icon-512.png'),
('https://cdn1.iconfinder.com/data/icons/financial-colored-icons-vol-2/128/051-512.png'),
('https://cdn0.iconfinder.com/data/icons/sport-achievment-badges/128/sport_badges-09-512.png'),
('https://images.vexels.com/media/users/3/137253/isolated/preview/90dd9f12fdd1eefb8c8976903944c026-facebook-icon-logo-by-vexels.png'),
('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Circle-icons-money.svg/1024px-Circle-icons-money.svg.png'),
('https://cdn4.iconfinder.com/data/icons/banking-and-finance/500/hand-coins-512.png'),
('https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Circle-icons-magnifyingglass.svg/2000px-Circle-icons-magnifyingglass.svg.png'),
('http://icons.iconarchive.com/icons/designbolts/free-multimedia/1024/Cd-icon.png'),
('https://etc.canyonsdistrict.org/skypics/etc/badges/22.png'),
('http://www.giesencoffeeroasters.eu/wp-content/uploads/2016/11/Icoon-elekctro.png'),
('http://www.miankoutu.com/uploadfiles/2015-9-24/2015924122055724.png'),
('http://minkfoodiee.com/foodiee/user/landing_pages/images/tiffin-icon-3.png'),
('https://i2.wp.com/sandiegopaintpros.com/wp-content/uploads/2017/04/task-done-flat.png?fit=256%2C256'),
('https://s17.postimg.org/o1twgwqxr/apps.png'),
('https://www.hippotrip.com/temas/hippotrip_v2/images/icon-location.png'),
('https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Circle-icons-train.svg/600px-Circle-icons-train.svg.png'),
('https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Circle-icons-radio.svg/768px-Circle-icons-radio.svg.png'),
('http://icons.iconarchive.com/icons/designbolts/free-multimedia/1024/Photo-icon.png'),
('https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Circle-icons-polaroidcamera.svg/480px-Circle-icons-polaroidcamera.svg.png'),
('https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Circle-icons-smartphone.svg/480px-Circle-icons-smartphone.svg.png'),
('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Circle-icons-creditcard.svg/768px-Circle-icons-creditcard.svg.png'),
('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Circle-icons-weather.svg/1000px-Circle-icons-weather.svg.png'),
('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Circle-icons-anchor.svg/1000px-Circle-icons-anchor.svg.png')
