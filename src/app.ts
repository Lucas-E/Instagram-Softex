import express from "express";
import { createServer } from "http";
import AppDataSource from "./data-source";
export function initApp() {
	try {
		const app = express();
		const server = createServer(app);
		server.listen(process.env.PORT, () => {
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
