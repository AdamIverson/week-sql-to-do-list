CREATE TABLE task (
	id SERIAL,
	task varchar(280),
	completed boolean
	);

INSERT INTO "task"
    ("task", "completed")
VALUES
    ('Mow the dang lawn', 'TRUE'),
    ('Wash the dang lawn', 'FALSE'),
    ('Lawn the dog', 'FALSE'),
    ('Create a bit in three parts', 'TRUE'),
    ('Top it off with a meta joke', 'TRUE'),
    ('Is this bit the fault of William Faulkner', 'FALSE'),
    ('HAHAHA I never actually read any Faulkner but I could probably guess him on Jeopardy!', 'TRUE')