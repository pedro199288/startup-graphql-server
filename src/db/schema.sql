-- the hypothetical example of a postgresql schema for this application

CREATE TABLE IF NOT EXISTS startups (
	id SERIAL,
	name VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS phases (
	id SERIAL,
	name VARCHAR(255) NOT null,
	executionOrder INT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tasks (
	id SERIAL,
	title VARCHAR(255) NOT NULL,
	phaseId INT REFERENCES startups(id),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS startup_task_completion (
	startupId INT REFERENCES startups(id),
	taskId INT REFERENCES tasks(id),
	completed BOOLEAN NOT NULL,
	PRIMARY KEY (startupId, taskId)
);
