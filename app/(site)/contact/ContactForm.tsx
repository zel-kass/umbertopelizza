"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "./actions";

const fieldClass = "mt-6 pb-[2vh] border-b border-gray-200 outline-hidden";

const fields = [
	{ name: "name", type: "text", placeholder: "VOTRE NOM", label: "Votre nom", maxLength: 200 },
	{
		name: "email",
		type: "email",
		placeholder: "VOTRE EMAIL",
		label: "Votre email",
		maxLength: 320,
	},
	{
		name: "message",
		placeholder: "PARLEZ DE VOTRE PROJET",
		label: "Parlez de votre projet",
		maxLength: 5000,
	},
] as const;

function Field({ field, value }: { field: (typeof fields)[number]; value?: string }) {
	const props = {
		name: field.name,
		placeholder: field.placeholder,
		"aria-label": field.label,
		maxLength: field.maxLength,
		defaultValue: value,
		required: true,
	};
	return "type" in field ? (
		<input {...props} type={field.type} className={fieldClass} />
	) : (
		<textarea {...props} rows={1} className={`${fieldClass} resize-none field-sizing-content`} />
	);
}

function Success() {
	return (
		<div role="status" className="flex flex-col justify-end lg:w-[40vw] mt-6">
			<h3>MERCI, VOTRE MESSAGE EST BIEN ARRIVÉ.</h3>
			<h3>NOUS REVENONS VERS VOUS TRÈS VITE.</h3>
		</div>
	);
}

export default function ContactForm() {
	const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, {
		status: "idle",
	});
	if (state.status === "success") return <Success />;

	return (
		<form action={action} className="flex flex-col gap-y-4 lg:w-[40vw]">
			{fields.map((field) => (
				<Field key={field.name} field={field} value={state.fields?.[field.name]} />
			))}
			<div className="flex flex-col items-end gap-2 mt-6">
				<button
					className="text-xl hover:text-white hover:bg-zinc-900 px-2 cursor-pointer disabled:opacity-50 disabled:cursor-wait"
					type="submit"
					disabled={pending}
				>
					{pending ? "ENVOI..." : "ENVOYER"}
				</button>
				<p role="alert" className="text-sm text-red-600">
					{state.error}
				</p>
			</div>
		</form>
	);
}
