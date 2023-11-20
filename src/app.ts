import express from "express";
import { createServer } from "http";
import AppDataSource from "./data-source";
import router from "./routes/user.routes";
export function initApp() {
	try {
		const app = express();
		app.use(express.urlencoded({extended:true}));
		app.use(express.json())
		app.use('/', router)
		const server = createServer(app);
		server.listen(8080, () => {
			console.log("Servidor Iniciado");
		});
		AppDataSource.initialize()
			.then(() => {
				console.log("Base de dados conectada");
			})
			.catch((error) => console.log(error));
	} catch (error) {
		console.log(error);
	}
}

initApp();
