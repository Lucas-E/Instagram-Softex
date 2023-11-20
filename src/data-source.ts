import "reflect-metadata";
import { DataSource } from "typeorm";
import 'dotenv/config'
import { User } from "./entity/User";
import { Comment } from "./entity/Comment";
import { Like } from "./entity/Like";
import { Post } from "./entity/Post";
const AppDataSource = new DataSource({
	type: "mariadb",
	host: "127.0.0.1",
	port: 3306,
	username: "root",
	password: "root",
	database: "instagram_softex",
	synchronize: true,
	logging: true,
	entities: [User, Comment, Like, Post],
	subscribers: [],
	migrations: [],
});

export default AppDataSource;
