'use client';

import ReactLenis from "lenis/react";
import NavBar from "@/app/components/nav-bar";
import Footer from "@/app/components/footer";


export default function Contact() {
	return (
    <ReactLenis root>
      <div className="px-8 mt-[10vh]">
        <div className="w-full flex justify-between items-center text-4xl lg:text-6xl">
          <h2 className="lg:max-w-[50vw]">DISCUTONS DE VOUS, VOTRE ENTREPRISE, VOS PROJETS, ET VOS OBJECTIFS</h2>
        </div>
        <div className="flex flex-col gap-x-4 lg:flex-row justify-between mt-[20vh]">
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
      </div>
      <div className="mt-[20vh] mb-[5vh]">
        <Footer />
      </div>
    </ReactLenis>
	);
}