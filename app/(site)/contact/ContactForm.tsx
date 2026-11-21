"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "./actions";

const fieldClass = "mt-6 pb-[2vh] border-b border-gray-200 outline-hidden";

export default function ContactForm() {
	const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, {
		status: "idle",
	});

	return (
		<form action={action} className="flex flex-col gap-y-4 lg:w-[40vw]">
			<input
				className={fieldClass}
				type="text"
				name="name"
				placeholder="VOTRE NOM"
				aria-label="Votre nom"
				required
				maxLength={200}
				defaultValue={state.fields?.name}
			/>
			<input
				className={fieldClass}
				type="email"
				name="email"
				placeholder="VOTRE EMAIL"
				aria-label="Votre email"
				required
				maxLength={320}
				defaultValue={state.fields?.email}
			/>
			<textarea
				className={`${fieldClass} resize-none field-sizing-content`}
				name="message"
				rows={1}
				placeholder="PARLEZ DE VOTRE PROJET"
				aria-label="Parlez de votre projet"
				required
				maxLength={5000}
				defaultValue={state.fields?.message}
			/>
			<div className="flex items-center justify-between gap-4 mt-6">
				<p role="status" className={state.status === "error" ? "text-red-600" : undefined}>
					{state.status === "success" ? "MERCI, VOTRE MESSAGE A BIEN ÉTÉ ENVOYÉ !" : state.error}
				</p>
				<button
					className="text-xl hover:text-white hover:bg-zinc-900 px-2 cursor-pointer disabled:opacity-50 disabled:cursor-wait"
					type="submit"
					disabled={pending}
				>
					{pending ? "ENVOI..." : "ENVOYER"}
				</button>
			</div>
		</form>
	);
}
