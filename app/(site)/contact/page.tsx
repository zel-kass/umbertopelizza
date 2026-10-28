export default function Contact() {
	return (
		<main className="flex flex-1 flex-col justify-between px-8 relative pt-[10em]">
			<h2 className="lg:max-w-[65vw]">LET&apos;S WORK TOGETHER!</h2>
			<div className="flex flex-col gap-x-4 lg:flex-row justify-between">
				<div>
					<h3>VOUS AVEZ UN PROJET?</h3>
					<h3>NOUS LUI DONNONS VIE EN IMAGES</h3>
				</div>
				<div className="flex flex-col gap-y-4 lg:w-[40vw]">
					<input
						className="mt-6 pb-[2vh] border-b border-gray-200 outline-hidden"
						type="text"
						placeholder="VOTRE NOM"
					/>
					<input
						className="mt-6 pb-[2vh] border-b border-gray-200 outline-hidden"
						type="text"
						placeholder="VOTRE EMAIL"
					/>
					<input
						className="mt-6 pb-[2vh] border-b border-gray-200 outline-hidden"
						type="text"
						placeholder="PARLEZ DE VOTRE PROJET"
					/>
					<div className="flex justify-end mt-6">
						<input
							className="text-xl hover:text-white hover:bg-zinc-900 px-2 cursor-pointer"
							type="submit"
							value="ENVOYER"
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
