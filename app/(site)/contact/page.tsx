import ContactForm from "./ContactForm";

export default function Contact() {
	return (
		<main className="flex flex-1 flex-col justify-between px-8 relative pt-[10em]">
			<h2 className="lg:max-w-[65vw]">LET&apos;S WORK TOGETHER!</h2>
			<div className="flex flex-col gap-x-4 lg:flex-row justify-between">
				<div>
					<h3>VOUS AVEZ UN PROJET?</h3>
					<h3>NOUS LUI DONNONS VIE EN IMAGES</h3>
				</div>
				<ContactForm />
			</div>
		</main>
	);
}
