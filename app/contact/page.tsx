'use client';

import ReactLenis from "lenis/react";
import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/NavBar";

export default function Contact() {
	return (
    <ReactLenis root>
			<NavBar />
      <div className="flex flex-col h-screen justify-between px-8 relative">
				<div className="h-[3.5em] w-full flex items-end relative">
				</div>
				<h2 className="lg:max-w-[50vw]">LET&apos;S WORK TOGETHER !</h2>
        <div className="flex flex-col gap-x-4 lg:flex-row justify-between">
          <div>
            <h3>VOUS AVEZ UN PROJET?</h3>
            <h3>NOUS LUI DONNONS VIE EN IMAGES</h3>
          </div>
          <div className="flex flex-col gap-y-4 lg:w-[40vw]">
            <input className="mt-6 pb-[2vh] border-b outline-none" type="text" placeholder="VOTRE NOM" />
            <input className="mt-6 pb-[2vh] border-b outline-none" type="text" placeholder="VOTRE EMAIL" />
            <input className="mt-6 pb-[2vh] border-b outline-none" type="text" placeholder="PARLEZ DE VOTRE PROJET" />
            <div className="flex justify-end mt-6">
              <input className="text-xl hover:text-white hover:bg-zinc-900 px-2 cursor-pointer" type="submit" value="ENVOYER" />
            </div>
          </div>
        </div>
				<Footer />
      </div>
    </ReactLenis>
	);
}