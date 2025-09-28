'use client'

import ReactLenis from "lenis/react";
import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/NavBar";

import projects from "@/lib/data/photos.json"

import gsap from "gsap";
import React, { useRef, useEffect, useState } from "react";

import Image from "next/image";

interface Project {
	name: string,
	description: string,
	images: string[],
}

interface ProjectRowProps {
	project: Project,
	isActive: boolean,
}

interface ProjectDetailsProps {
	project: Project,
	show: boolean,
}

function ProjectRow({ project, isActive }: ProjectRowProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const hiddenOverlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isActive) {
      gsap.fromTo(
        overlayRef.current,
        {
          y: "-100%",
        },
        {
          y: "0%",
          duration: 0.5,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        hiddenOverlayRef.current,
        {
          y: "-100%",
        },
        {
          y: "0%",
          duration: 0.5,
          ease: "power3.out",
        }
      );
    }
  }, [isActive]);

  const onMouseEnter = (e: React.MouseEvent) => {
    if (isActive) return;
    const rect = boxRef.current?.getBoundingClientRect();
    if (!rect) return;
    const y = e.clientY - rect.top;
    const fromTop = y < rect.height / 2;

    gsap.fromTo(
      overlayRef.current,
      {},
      {
        y: fromTop ? "100%" : "-100%",
        duration: 0.5,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      hiddenOverlayRef.current,
      {
        y: fromTop ? "-200%" : "0%",
      },
      {
        y: "-100%",
        duration: 0.5,
        ease: "power3.out",
      }
    );
  };

  const onMouseLeave = (e: React.MouseEvent) => {
    if (isActive) return;
    const rect = boxRef.current?.getBoundingClientRect();
    if (!rect) return;
    const y = e.clientY - rect.top;
    const fromTop = y < rect.height / 2;

    gsap.fromTo(
      overlayRef.current,
      {
        y: fromTop ? "100%" : "-100%",
      },
      {
        y: "0%",
        duration: 0.5,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      hiddenOverlayRef.current,
      {},
      {
        y: fromTop ? "-200%" : "0%",
        duration: 0.5,
        ease: "power3.out",
      }
    );
  };

  return (
    <div
      ref={boxRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="h-[6em] overflow-hidden">
      <div ref={overlayRef} className="w-full h-full px-5 flex items-center justify-between">
        <h2 className="text-black">{project.name}</h2>
      </div>
      <div
        ref={hiddenOverlayRef}
        className="w-full h-full px-5 flex items-center justify-between bg-black">
        <h2 className="text-white">{project.name}</h2>
      </div>
      {/* <div className="h-[1px] w-full bg-black" /> */}
    </div>
  );
}

function ProjectDetails({ project, show }: ProjectDetailsProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  return (
    <div
      ref={boxRef}
      className={`grid transition-all duration-500 overflow-hidden px-5 backdrop-blur-lg 
        ${show ? "grid-rows-[1fr] py-5" : "grid-rows-[0fr]"}`}>
      <div className="overflow-hidden">
        {shouldRender && (
          <>
            {/* <div className="grid grid-rows-[auto] grid-cols-5 gap-10 mb-10">
              <h2 className="col-start-1 text-2xl uppercase font-[700]">Description</h2>
            </div> */}
            {project.images.length > 0 && (
              <div className="flex gap-5 relative h-[50em] overflow-hidden">
                {project.images?.map((image, index) => (
                  <Image
                    key={index}
                    src={`/photos/${image}.jpg`}
                    alt={`${image} image project's`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "auto", height: "100%" }}
                    loading="eager"
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function Photos() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

	return (
    <ReactLenis root>
			<div className="h-screen max-w-screen relative">
				<NavBar />
				<div>
					<div className="h-content p-4 mb-16">
						<div className="h-[25em] w-full flex items-end relative">
							<h1>GALLERY</h1>
						</div>
						<div className="w-full border border-neutral-700">
							<div className="grid grid-row-auto">
								{projects.map((project, index) => (
									<div
										onClick={() => setActiveProject(activeProject == project ? null : project)}
										key={`index-${project.name}`}
										className="cursor-pointer">
										<ProjectRow project={project} isActive={activeProject == project ? true : false} />
										<ProjectDetails project={project} show={activeProject == project ? true : false} />
										{index !== projects.length - 1 && (
											<div className="h-[1px] bg-black" />
										)}
									</div>
								))}
							</div>
						</div>
					</div>
					<Footer />
				</div>
			</div>
    </ReactLenis>
	)
}