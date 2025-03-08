import NavBar from "@/app/components/NavBar";

export default function Contact() {
	return (
		<div className="w-full">
			<NavBar />
			<div className="p-12 pt-[15vh]">
				<div className="w-full flex justify-between items-center text-6xl">
					<h2 className="max-w-[50vw]">DISCUTONS DE VOUS, VOTRE ENTREPRISE, VOS PROJETS, ET VOS OBJECTIFS</h2>
				</div>
				<div className="flex flex-col lg:flex-row justify-between mt-[20vh]">
					<div>
						<h3>VOUS AVEZ UN PROJET?</h3>
						<h3>NOUS LUI DONNONS VIE EN IMAGES</h3>
					</div>
					<div className="flex flex-col gap-y-4 lg:w-[40vw]">
						<input className="mt-6 pb-[2vh] border-b outline-none" type="text" placeholder="VOTRE NOM" />
						<input className="mt-6 pb-[2vh] border-b outline-none" type="text" placeholder="VOTRE EMAIL" />
						<input className="mt-6 pb-[2vh] border-b outline-none" type="text" placeholder="PARLEZ DE VOTRE PROJET" />
						<div className="flex justify-between mt-6">
							<input type="text" placeholder="BUDGET"/>
							<input className="hover:text-white hover:bg-zinc-900 px-2 cursor-pointer" type="submit" value="ENVOYER" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}