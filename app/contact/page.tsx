'use client';

import { useTransitionRouter } from "next-view-transitions";
import NavBar from "@/app/components/nav-bar";
import Link from "next/link";
import slideInOut from "@/lib/utils";

export default function Contact() {
	const router = useTransitionRouter();

	return (
		<main>
			<NavBar />
			<div className="px-6 lg:px-12 mt-[10vh]">
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
						<div className="flex justify-between mt-6">
							<input className="outline-none" type="text" placeholder="BUDGET"/>
							<input className="text-xl hover:text-white hover:bg-zinc-900 px-2 cursor-pointer" type="submit" value="ENVOYER" />
						</div>
					</div>
				</div>
			</div>
			<footer className="mt-[20vh] mb-[5vh] flex flex-col lg:flex-row justify-between px-6 lg:px-12 gap-8">
        <div>
          <ul className="flex flex-col gap-y-3">
            <li>
              <Link href="/">
                <h3 className="cursor-pointer hover:text-primary transition-colors">HOME</h3>
              </Link>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  router.push("/photos", {
                    onTransitionReady: slideInOut,
                  })
                }}
                href="/photos"
                className="block"
              >
                <h3 className="cursor-pointer hover:text-primary transition-colors">PHOTOS</h3>
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  router.push("/photos", {
                    onTransitionReady: slideInOut,
                  })
                }}
                href="/photos"
                className="block"
              >
                <h3 className="cursor-pointer hover:text-primary transition-colors">VIDEOS</h3>
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col gap-y-3">
            <a
              target="_blank"
              href="https://www.instagram.com/umbertoz_/"
              className="hover:text-primary transition-colors"
              rel="noopener noreferrer"
            >
              <h3>INSTAGRAM</h3>
            </a>
            <h3 className="hover:text-primary transition-colors">
              <a href="tel:0644278992">06 44 27 89 92</a>
            </h3>
            <h3 className="hover:text-primary transition-colors">
              <a href="mailto:umbertomariapelizza@gmail.com">umbertomariapelizza@gmail.com</a>
            </h3>
          </div>
          <div className="flex flex-col gap-y-3 mt-4 sm:mt-0">
            <h3>© {new Date().getFullYear()} PELIZZA</h3>
            <h3>ALL RIGHTS RESERVED</h3>
          </div>
        </div>
      </footer>
		</main>
	);
}