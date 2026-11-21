"use server";

const emails = ["nemo@pelizzapictures.com"];

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

export async function sendContact(_: ContactState, formData: FormData): Promise<ContactState> {
	const fields = {
		name: String(formData.get("name") ?? "")
			.replace(/\s+/g, " ")
			.trim(),
		email: String(formData.get("email") ?? "").trim(),
		message: String(formData.get("message") ?? "").trim(),
	};
	const { name, email, message } = fields;

	if (
		!name ||
		name.length > 200 ||
		email.length > 320 ||
		!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
		!message ||
		message.length > 5000
	) {
		return {
			status: "error",
			error: "MERCI DE REMPLIR TOUS LES CHAMPS AVEC UN EMAIL VALIDE.",
			fields,
		};
	}

	const { RESEND_API_KEY, CONTACT_FROM_EMAIL } = process.env;
	if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL) {
		console.error("Contact form: RESEND_API_KEY or CONTACT_FROM_EMAIL is not set");
		return { status: "error", error: "L'ENVOI A ÉCHOUÉ, RÉESSAYEZ PLUS TARD.", fields };
	}

	const res = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
		body: JSON.stringify({
			from: CONTACT_FROM_EMAIL,
			to: emails,
			reply_to: email,
			subject: `Nouveau message de ${name} — PICTURZZ`,
			text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}\n`,
			html: `<div style="font-family:sans-serif;font-size:15px;line-height:1.5;color:#18181b">
<h2 style="margin:0 0 16px">Nouveau message via le site</h2>
<p style="margin:0"><strong>Nom :</strong> ${escapeHtml(name)}</p>
<p style="margin:0 0 16px"><strong>Email :</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
<p style="margin:0"><strong>Message :</strong></p>
<p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
</div>`,
		}),
	});

	if (!res.ok) {
		console.error("Contact form: Resend error", res.status, await res.text());
		return { status: "error", error: "L'ENVOI A ÉCHOUÉ, RÉESSAYEZ PLUS TARD.", fields };
	}

	return { status: "success" };
}
