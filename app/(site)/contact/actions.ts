"use server";

const emails = ["nemo@pelizzapictures.com"];

const INVALID_ERROR = "MERCI DE REMPLIR TOUS LES CHAMPS AVEC UN EMAIL VALIDE.";
const SEND_ERROR = "L'ENVOI A ÉCHOUÉ, RÉESSAYEZ PLUS TARD.";

type Fields = { name: string; email: string; message: string };

export type ContactState = {
	status: "idle" | "success" | "error";
	error?: string;
	fields?: Fields;
};

const escapeHtml = (s: string) =>
	s.replace(
		/[&<>"']/g,
		(c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
	);

function parseFields(formData: FormData): Fields {
	const get = (key: string) => String(formData.get(key) ?? "").trim();
	return { name: get("name").replace(/\s+/g, " "), email: get("email"), message: get("message") };
}

function isValid({ name, email, message }: Fields): boolean {
	return (
		name.length > 0 &&
		name.length <= 200 &&
		email.length <= 320 &&
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
		message.length > 0 &&
		message.length <= 5000
	);
}

function buildEmail({ name, email, message }: Fields) {
	const [n, e, m] = [name, email, message].map(escapeHtml);
	return {
		subject: `Nouveau message de ${name} — PICTURZZ`,
		text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}\n`,
		html: `<div style="font-family:sans-serif;font-size:15px;line-height:1.5;color:#18181b">
<h2 style="margin:0 0 16px">Nouveau message via le site</h2>
<p style="margin:0"><strong>Nom :</strong> ${n}</p>
<p style="margin:0 0 16px"><strong>Email :</strong> <a href="mailto:${e}">${e}</a></p>
<p style="margin:0"><strong>Message :</strong></p>
<p style="margin:0;white-space:pre-wrap">${m}</p>
</div>`,
	};
}

async function sendEmail(fields: Fields): Promise<boolean> {
	const { RESEND_API_KEY, CONTACT_FROM_EMAIL } = process.env;
	if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL) {
		console.error("Contact form: RESEND_API_KEY or CONTACT_FROM_EMAIL is not set");
		return false;
	}
	const res = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
		body: JSON.stringify({
			from: CONTACT_FROM_EMAIL,
			to: emails,
			reply_to: fields.email,
			...buildEmail(fields),
		}),
	});
	if (!res.ok) console.error("Contact form: Resend error", res.status, await res.text());
	return res.ok;
}

export async function sendContact(_: ContactState, formData: FormData): Promise<ContactState> {
	const fields = parseFields(formData);
	if (!isValid(fields)) return { status: "error", error: INVALID_ERROR, fields };
	if (!(await sendEmail(fields))) return { status: "error", error: SEND_ERROR, fields };
	return { status: "success" };
}
